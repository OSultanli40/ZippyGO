import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { initialUser, User } from './data';
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface UserContextType {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  completeHike: (routeId: number, distance: number, elevation: number, difficulty: "Easy" | "Medium" | "Hard") => Promise<void>;
  joinChallenge: () => void;
  isInChallenge: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Kullanıcı bilgilerini yükle
  const refreshUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // localStorage'a da kaydet
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri yüklenirken hata:", error);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  // İlk yüklemede kullanıcı bilgilerini al
  useEffect(() => {
    refreshUser();
  }, []);

  const completeHike = async (routeId: number, distance: number, elevation: number, difficulty: "Easy" | "Medium" | "Hard") => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Bu işlem için giriş yapmanız gerekiyor",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    if (user.completedHikes.includes(routeId)) return;

    try {
      const response = await fetch("/api/user/complete-hike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ routeId, distance, elevation, difficulty }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hike tamamlanırken bir hata oluştu");
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.earnedBadge) {
        toast({
          title: "Yeni Rozet Kazandınız! 🏆",
          description: `"${data.earnedBadge}" rozetini kazandınız!`,
          duration: 5000,
        });
      } else {
        toast({
          title: "Hike Tamamlandı! 🎉",
          description: "Hike başarıyla tamamlandı",
        });
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Hike tamamlanırken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const joinChallenge = async () => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Bu işlem için giriş yapmanız gerekiyor",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    try {
      const response = await fetch("/api/user/join-challenge", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Challenge'a katılırken bir hata oluştu");
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Challenge'a Katıldınız! 🏔️",
        description: "5 Peak Challenge'a başarıyla katıldınız. İyi şanslar!",
      });
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Challenge'a katılırken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout hatası:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      setLocation("/");
      toast({
        title: "Çıkış Yapıldı",
        description: "Başarıyla çıkış yaptınız",
      });
    }
  };

  // Eğer kullanıcı yoksa, localStorage'dan kontrol et (sayfa yenilendiğinde)
  useEffect(() => {
    if (!user && !loading) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem("user");
        }
      }
    }
  }, [user, loading]);

  // Kullanıcı yoksa initialUser kullan (giriş yapmamış kullanıcılar için)
  const displayUser = user || initialUser;
  const isAuthenticated = !!user;
  const userIsInChallenge = user?.isInChallenge || false;

  return (
    <UserContext.Provider value={{ 
      user: displayUser, 
      loading,
      isAuthenticated,
      completeHike, 
      joinChallenge, 
      isInChallenge: userIsInChallenge,
      logout,
      refreshUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
