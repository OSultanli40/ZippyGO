import { createContext, useContext, useState, ReactNode } from 'react';
import { initialUser, User } from './data';
import { useToast } from "@/hooks/use-toast";

interface UserContextType {
  user: User;
  completeHike: (routeId: number, distance: number, elevation: number) => void;
  joinChallenge: () => void;
  isInChallenge: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [isInChallenge, setIsInChallenge] = useState(false);
  const { toast } = useToast();

  const completeHike = (routeId: number, distance: number, elevation: number) => {
    if (user.completedHikes.includes(routeId)) return;

    setUser(prev => {
      const newCompletedHikes = [...prev.completedHikes, routeId];
      const newTotalKm = parseFloat((prev.totalKm + distance).toFixed(1));
      const newTotalElevation = prev.totalElevation + elevation;
      const hikeCount = newCompletedHikes.length;

      let newBadges = [...prev.badges];
      let earnedBadge = null;

      if (hikeCount === 1) {
        const badgeIndex = newBadges.findIndex(b => b.id === 'starter');
        if (badgeIndex !== -1 && !newBadges[badgeIndex].earned) {
          newBadges[badgeIndex] = { ...newBadges[badgeIndex], earned: true, dateEarned: new Date().toISOString().split('T')[0] };
          earnedBadge = newBadges[badgeIndex].name;
        }
      } else if (hikeCount === 3) {
        const badgeIndex = newBadges.findIndex(b => b.id === 'trailblazer');
        if (badgeIndex !== -1 && !newBadges[badgeIndex].earned) {
          newBadges[badgeIndex] = { ...newBadges[badgeIndex], earned: true, dateEarned: new Date().toISOString().split('T')[0] };
          earnedBadge = newBadges[badgeIndex].name;
        }
      } else if (hikeCount >= 5) {
        const badgeIndex = newBadges.findIndex(b => b.id === 'mountain-pro');
        if (badgeIndex !== -1 && !newBadges[badgeIndex].earned) {
          newBadges[badgeIndex] = { ...newBadges[badgeIndex], earned: true, dateEarned: new Date().toISOString().split('T')[0] };
          earnedBadge = newBadges[badgeIndex].name;
        }
      }

      if (earnedBadge) {
        toast({
          title: "New Badge Unlocked! 🏆",
          description: `You've earned the "${earnedBadge}" badge!`,
          duration: 5000,
        });
      }

      return {
        ...prev,
        completedHikes: newCompletedHikes,
        totalKm: newTotalKm,
        totalElevation: newTotalElevation,
        badges: newBadges
      };
    });
  };

  const joinChallenge = () => {
    setIsInChallenge(true);
    toast({
      title: "Challenge Joined! 🏔️",
      description: "You've joined the 5 Peak Challenge. Good luck!",
    });
  };

  return (
    <UserContext.Provider value={{ user, completeHike, joinChallenge, isInChallenge }}>
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
