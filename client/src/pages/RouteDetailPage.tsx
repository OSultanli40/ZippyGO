import { useRoute, Link } from "wouter";
import { useEffect, useState } from "react";
import { routes } from "@/lib/data";
import { useUser } from "@/lib/userContext";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrendingUp, Ruler, CheckCircle, CloudSun, Plus, Calendar, User } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityHike {
  id: string;
  title: string;
  routeId: number;
  date: string;
  time: string;
  host: string;
  hostAvatar: string;
  participants: number;
  maxParticipants: number;
  description: string;
  participantsList: Array<{
    userId: string;
    userName: string;
    userAvatar: string;
  }>;
}

export default function RouteDetailPage() {
  const [match, params] = useRoute("/route/:id");
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, completeHike, isAuthenticated } = useUser();
  const [communityHikes, setCommunityHikes] = useState<CommunityHike[]>([]);
  const [loadingHikes, setLoadingHikes] = useState(true);
  const id = params ? parseInt(params.id) : 0;
  const route = routes.find(r => r.id === id);
  
  const isCompleted = user?.completedHikes?.includes(id) || false;
  const joinedHikes = user?.communityHikes?.map(ch => ch.hikeId) || [];

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Load community hikes for this route
  useEffect(() => {
    if (id) {
      loadCommunityHikes();
    }
  }, [id]);

  const loadCommunityHikes = async () => {
    try {
      setLoadingHikes(true);
      const response = await fetch(`/api/community-hikes/route/${id}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCommunityHikes(data.hikes || []);
      }
    } catch (error) {
      console.error("Error loading community hikes:", error);
    } finally {
      setLoadingHikes(false);
    }
  };

  if (!route) return <div className="container py-20 text-center">{t("route.not_found")}</div>;

  const handleMarkCompleted = async () => {
    if (isCompleted) return;
    
    await completeHike(id, route.distance_km, route.elevation_m, route.difficulty);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <img 
          src={route.image} 
          alt={route.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="text-base px-3 py-1">{route.region}</Badge>
                <Badge variant="outline" className="text-base px-3 py-1 bg-background/50 backdrop-blur">{route.difficulty}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 shadow-black/10 drop-shadow-md">
                {route.name}
              </h1>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleMarkCompleted}
                className={`h-12 px-6 rounded-full font-semibold ${isCompleted ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> {t("route.completed")}
                  </>
                ) : (
                  t("route.mark_completed")
                )}
              </Button>
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
                <CloudSun className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">{t("route.weather")}</span>
                <span className="text-xl font-bold">18°C</span>
              </Card>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">{t("route.about")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {route.fullDescription || route.description}
              </p>
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
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const [lat, lng] = route.coordinates;
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                  window.open(url, "_blank");
                }}
              >
                {t("route.get_directions")}
              </Button>
            </Card>

            <Card className="p-6 bg-card border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> {t("route.join_group")}
              </h3>
              
              {loadingHikes ? (
                <div className="text-center py-4 text-muted-foreground">Yükleniyor...</div>
              ) : communityHikes.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    {communityHikes.length} {communityHikes.length === 1 ? "grup planlanıyor" : "gruplar planlanıyor"}
                  </p>
                  <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                    {communityHikes.slice(0, 3).map((hike) => {
                      const isJoined = joinedHikes.includes(hike.id);
                      const isFull = hike.participants >= hike.maxParticipants;
                      const spotsLeft = hike.maxParticipants - hike.participants;
                      
                      return (
                        <Link key={hike.id} href={`/community-hike/${hike.id}`}>
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={hike.hostAvatar} />
                              <AvatarFallback>{hike.host[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{hike.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(hike.date).toLocaleDateString('tr-TR', { weekday: 'short', month: 'short', day: 'numeric' })} • {hike.time} • {spotsLeft} {spotsLeft === 1 ? "yer kaldı" : "yer kaldı"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  {communityHikes.length > 3 && (
                    <Link href="/community">
                      <Button variant="outline" className="w-full mb-2">
                        Tümünü Gör ({communityHikes.length})
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bu rota için henüz grup yok. İlk grubu siz oluşturun!
                  </p>
                  <Link href="/community">
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Grup Oluştur
                    </Button>
                  </Link>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
