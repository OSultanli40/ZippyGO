import { Link } from "wouter";
import { routes, initialUser } from "@/lib/data";
import badgeStarter from "@assets/generated_images/bronze_hiking_boot_badge_icon.png";
import badgeTrailblazer from "@assets/generated_images/silver_compass_badge_icon.png";
import badgePro from "@assets/generated_images/gold_mountain_peak_badge_icon.png";
import { useUser } from "@/lib/userContext";
import { useLanguage } from "@/lib/language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Award, CheckCircle, AlertTriangle, LogIn, Wallet, Plus, CheckCircle2, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import RouteCard from "@/components/RouteCard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isAuthenticated, refreshUser } = useUser();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [addAmount, setAddAmount] = useState("");
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  
  // Badge image mapping
  const badgeImageMap: Record<string, string> = {
    "starter": badgeStarter,
    "trailblazer": badgeTrailblazer,
    "mountain-pro": badgePro
  };
  
  // Badge görsellerini düzelt
  const getBadgeImage = (badgeId: string, imagePath?: string): string => {
    // Eğer badge image map'te varsa, import edilmiş image'ı kullan
    if (badgeImageMap[badgeId]) {
      return badgeImageMap[badgeId];
    }
    // Yoksa backend'den gelen path'i kullan
    return imagePath || badgeStarter;
  };
  
  // Guest user data
  const guestUser = {
    name: t("profile.guest_account_name"),
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Guest",
    completedHikes: [],
    totalKm: 0,
    totalElevation: 0,
    badges: [
      {
        id: "starter",
        name: "Starter",
        description: "Completed your first hike",
        image: badgeStarter,
        earned: false
      },
      {
        id: "trailblazer",
        name: "Trailblazer",
        description: "Completed 3 hikes",
        image: badgeTrailblazer,
        earned: false
      },
      {
        id: "mountain-pro",
        name: "Mountain Pro",
        description: "Completed 5+ hikes",
        image: badgePro,
        earned: false
      }
    ]
  };
  
  // Authenticated user için badge görsellerini düzelt
  const displayUser = isAuthenticated ? {
    ...user,
    badges: user.badges.map(badge => ({
      ...badge,
      image: getBadgeImage(badge.id, badge.image)
    }))
  } : guestUser;
  
  const completedRoutes = routes.filter(r => displayUser.completedHikes.includes(r.id));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Guest Warning Alert */}
      {!isAuthenticated && (
        <Alert className="mb-6 border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="font-bold text-yellow-900 dark:text-yellow-100">
            {t("profile.guest_mode")}
          </AlertTitle>
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            {t("profile.guest_warning")}
          </AlertDescription>
          <div className="mt-4">
            <Link href="/login">
              <Button className="gap-2">
                <LogIn className="h-4 w-4" />
                {t("profile.login_button")}
              </Button>
            </Link>
          </div>
        </Alert>
      )}

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative">
          <div className={`h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-xl ${!isAuthenticated ? 'opacity-60' : ''}`}>
            <img src={displayUser.avatar} alt={displayUser.name} className="h-full w-full object-cover" />
          </div>
          {isAuthenticated && (
            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
              <Award className="h-5 w-5" />
            </div>
          )}
          {!isAuthenticated && (
            <div className="absolute bottom-0 right-0 bg-muted text-muted-foreground p-2 rounded-full border-4 border-background">
              <Award className="h-5 w-5" />
            </div>
          )}
        </div>
        
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-display font-bold mb-2">{displayUser.name}</h1>
          <p className="text-muted-foreground mb-4">
            {isAuthenticated ? t("profile.nature_enthusiast") : t("profile.guest_account")}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <div className="text-center">
              <span className="block text-2xl font-bold text-foreground">{displayUser.completedHikes.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("profile.hikes")}</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-foreground">{displayUser.totalKm}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("profile.kilometers")}</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-foreground">{displayUser.totalElevation}m</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("profile.elevation")}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full max-w-[600px] grid-cols-3 mb-8">
          <TabsTrigger value="badges">{t("profile.badges")}</TabsTrigger>
          <TabsTrigger value="history">{t("profile.history")}</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="animate-in fade-in-50">
          {!isAuthenticated ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">{t("profile.login_to_earn_badges")}</p>
              <Link href="/login">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("profile.login_button")}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayUser.badges.map((badge) => (
                <Card key={badge.id} className={`border-2 ${badge.earned ? 'border-primary/20 bg-primary/5' : 'border-border opacity-60'}`}>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 h-24 w-24">
                      <img src={badge.image} alt={badge.name} className={`h-full w-full object-contain ${!badge.earned && 'grayscale'}`} />
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                    {badge.earned ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {t("profile.earned")} {badge.dateEarned}
                      </span>
                    ) : (
                      <div className="space-y-2">
                        <Progress value={33} className="h-2" />
                        <p className="text-xs text-muted-foreground">1/3 {t("profile.progress")}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="animate-in fade-in-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedRoutes.map(route => (
              <div key={route.id} className="relative">
                <div className="absolute top-2 right-2 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-sm font-bold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> {t("profile.completed")}
                </div>
                <RouteCard route={route} />
              </div>
            ))}
            {completedRoutes.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                {t("profile.no_hikes")}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="wallet" className="animate-in fade-in-50">
          {!isAuthenticated ? (
            <div className="text-center py-12">
              <Wallet className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">Giriş yaparak cüzdanınızı kullanabilirsiniz</p>
              <Link href="/login">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("profile.login_button")}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Balance Card */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bakiye</p>
                      <p className="text-3xl font-bold text-foreground">
                        {(user?.balance || 0).toFixed(2)} AZN
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Add Money */}
                <div className="flex gap-2 mt-4">
                  <Input
                    type="number"
                    placeholder="Miktar (AZN)"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="flex-1"
                    min="1"
                    step="0.01"
                  />
                  <Button
                    onClick={async () => {
                      const amount = parseFloat(addAmount);
                      if (!amount || amount <= 0) {
                        toast({
                          title: "Hata",
                          description: "Geçerli bir miktar giriniz",
                          variant: "destructive",
                        });
                        return;
                      }
                      setIsAddingMoney(true);
                      try {
                        const response = await fetch("/api/user/wallet/add", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({ amount }),
                        });
                        const data = await response.json();
                        if (response.ok) {
                          toast({
                            title: "Başarılı",
                            description: `${amount} AZN bakiyenize eklendi`,
                          });
                          setAddAmount("");
                          // Güncellenmiş user bilgisini direkt kullan
                          if (data.user) {
                            // userContext'teki setUser'ı kullanmak için refreshUser çağır
                            refreshUser();
                          } else {
                            // Eğer user dönmüyorsa sadece refreshUser çağır
                            refreshUser();
                          }
                        } else {
                          throw new Error(data.message || "Bakiye eklenemedi");
                        }
                      } catch (error: any) {
                        toast({
                          title: "Hata",
                          description: error.message,
                          variant: "destructive",
                        });
                      } finally {
                        setIsAddingMoney(false);
                      }
                    }}
                    disabled={isAddingMoney || !addAmount}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Para Ekle
                  </Button>
                </div>
              </Card>

              {/* Pending Payments */}
              {user?.pendingPayments && user.pendingPayments.filter(p => p.status === "pending" || p.status === "processing").length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Bekleyen Ödemeler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {user.pendingPayments
                      .filter(p => p.status === "pending" || p.status === "processing")
                      .map((payment) => (
                        <div key={payment.serviceId} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{payment.serviceName}</p>
                              <Badge variant="outline" className="text-xs">
                                {payment.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {payment.amount.toFixed(2)} AZN - {new Date(payment.bookedAt).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Para şu anda bloklanmış durumda. Rehber ile iletişime geçtikten sonra ödemeyi işleme alabilirsiniz.
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={async () => {
                                try {
                                  const response = await fetch("/api/user/wallet/process-payment", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    credentials: "include",
                                    body: JSON.stringify({ paymentId: payment.serviceId }),
                                  });
                                  const data = await response.json();
                                  if (response.ok) {
                                    toast({
                                      title: "Başarılı",
                                      description: "Ödeme işlendi",
                                    });
                                    refreshUser();
                                  } else {
                                    throw new Error(data.message || "Ödeme işlenemedi");
                                  }
                                } catch (error: any) {
                                  toast({
                                    title: "Hata",
                                    description: error.message,
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Ödemeyi İşle
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                try {
                                  const response = await fetch("/api/user/wallet/cancel-payment", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    credentials: "include",
                                    body: JSON.stringify({ paymentId: payment.serviceId }),
                                  });
                                  const data = await response.json();
                                  if (response.ok) {
                                    toast({
                                      title: "Başarılı",
                                      description: "Ödeme iptal edildi",
                                    });
                                    refreshUser();
                                  } else {
                                    throw new Error(data.message || "Ödeme iptal edilemedi");
                                  }
                                } catch (error: any) {
                                  toast({
                                    title: "Hata",
                                    description: error.message,
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
