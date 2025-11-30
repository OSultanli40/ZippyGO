import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { routes } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { useUser } from "@/lib/userContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Clock, TrendingUp, Ruler, Calendar, Users, User, Map as MapIcon } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";

interface CommunityHike {
  id: string;
  title: string;
  routeId: number;
  date: string;
  time: string;
  host: string;
  hostId: string;
  hostAvatar?: string;
  participants: number;
  participantNames: string[];
  participantsList: Array<{
    userId: string;
    userName: string;
    userAvatar?: string;
    joinedAt: string;
  }>;
  maxParticipants: number;
  description: string;
  createdAt: string;
}

export default function CommunityHikeDetailPage() {
  const [match, params] = useRoute("/community-hike/:id");
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated, refreshUser } = useUser();
  const [hike, setHike] = useState<CommunityHike | null>(null);
  const [loading, setLoading] = useState(true);
  const hikeId = params?.id;

  useEffect(() => {
    if (hikeId) {
      loadHike();
    }
    // Scroll to top when hike changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hikeId]);

  const loadHike = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/community-hikes", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to load hike");
      }

      const data = await response.json();
      const foundHike = data.hikes?.find((h: CommunityHike) => h.id === hikeId);
      
      if (!foundHike) {
        throw new Error("Hike not found");
      }
      
      setHike(foundHike);
    } catch (error: any) {
      console.error("Error loading hike:", error);
      toast({
        title: "Hata",
        description: error.message || "Hike yüklenirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Gerekli",
        description: "Bu işlem için giriş yapmanız gerekiyor",
        variant: "destructive",
      });
      return;
    }

    if (!hikeId) return;

    try {
      const response = await fetch(`/api/community-hikes/${hikeId}/join`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hike'a katılırken bir hata oluştu");
      }

      await loadHike();
      await refreshUser();

      toast({
        title: "Katıldınız! 🥾",
        description: data.message || "Community hike'a başarıyla katıldınız",
      });
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Hike'a katılırken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const handleGetDirections = () => {
    if (!hike || !route) return;
    const [lat, lng] = route.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  if (!hike) {
    return (
      <div className="container py-20 text-center">
        <div>Hike bulunamadı</div>
        <Link href="/community">
          <Button className="mt-4">Community sayfasına dön</Button>
        </Link>
      </div>
    );
  }

  const route = routes.find(r => r.id === hike.routeId);
  if (!route) {
    return (
      <div className="container py-20 text-center">
        <div>Route bulunamadı</div>
        <Link href="/community">
          <Button className="mt-4">Community sayfasına dön</Button>
        </Link>
      </div>
    );
  }

  const isJoined = user?.communityHikes?.some(ch => ch.hikeId === hike.id) || false;
  const isFull = hike.participants >= hike.maxParticipants;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <img 
          src={route.image} 
          alt={hike.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Link href="/community">
                <Button variant="ghost" size="sm" className="mb-3">
                  ← {t("community.title")}
                </Button>
              </Link>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="text-base px-3 py-1">{route.region}</Badge>
                <Badge variant="outline" className="text-base px-3 py-1 bg-background/50 backdrop-blur">
                  {route.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {new Date(hike.date).toLocaleDateString('tr-TR')} • {hike.time}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 shadow-black/10 drop-shadow-md">
                {hike.title}
              </h1>
              <p className="text-lg text-foreground/80">
                {route.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <Ruler className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{t("route.distance")}</span>
                <span className="text-xl font-bold">{route.distance_km} km</span>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <TrendingUp className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{t("route.elevation")}</span>
                <span className="text-xl font-bold">{route.elevation_m} m</span>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{t("route.duration")}</span>
                <span className="text-xl font-bold">{route.duration_hours} h</span>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <Users className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{t("community.participants")}</span>
                <span className="text-xl font-bold">{hike.participants}/{hike.maxParticipants}</span>
              </Card>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">{t("route.about")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {route.fullDescription || route.description}
              </p>
              {hike.description && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Hike Açıklaması</h3>
                  <p className="text-muted-foreground">{hike.description}</p>
                </div>
              )}
            </section>

            {/* Map */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">{t("route.map")}</h2>
              <div className="h-[400px] rounded-2xl overflow-hidden border border-border shadow-sm">
                <MapComponent 
                  routes={[route]} 
                  center={route.coordinates} 
                  zoom={13} 
                  interactive={false}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> {t("route.location")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("route.located_in")} <strong>{route.region}</strong> {t("route.region")}
              </p>
              <Button variant="outline" className="w-full" onClick={handleGetDirections}>
                <MapIcon className="mr-2 h-4 w-4" /> {t("route.get_directions")}
              </Button>
            </Card>

            <Card className="p-6 bg-card border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> Katılımcılar
                </h3>
                <Badge variant="secondary">
                  {hike.participants} / {hike.maxParticipants}
                </Badge>
              </div>
              
              <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                {/* Host */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/5 border border-primary/20">
                  <Avatar>
                    <AvatarImage src={hike.hostAvatar} />
                    <AvatarFallback>{hike.host[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{hike.host}</p>
                    <p className="text-xs text-muted-foreground">Təşkilatçı</p>
                  </div>
                </div>
                
                {/* Participants */}
                {hike.participantsList.map((participant) => (
                  <div key={participant.userId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Avatar>
                      <AvatarImage src={participant.userAvatar} />
                      <AvatarFallback>{participant.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{participant.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(participant.joinedAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                ))}
                
                {hike.participantsList.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Henüz katılımcı yok
                  </p>
                )}
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2 mb-4">
                <div 
                  className="bg-primary rounded-full h-2 transition-all" 
                  style={{ width: `${(hike.participants / hike.maxParticipants) * 100}%` }}
                ></div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleJoin}
                disabled={isFull || isJoined || !isAuthenticated}
                variant={isJoined ? "secondary" : "default"}
              >
                {!isAuthenticated 
                  ? "Giriş Yap" 
                  : isJoined 
                    ? "Katıldınız ✓" 
                    : isFull 
                      ? "Dolu" 
                      : "Hike'a Katıl"}
              </Button>
            </Card>

            <Card className="p-6 bg-card border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Tarih & Saat
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(hike.date).toLocaleDateString('tr-TR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{hike.time}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

