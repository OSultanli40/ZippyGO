import { useState, useEffect } from "react";
import { Link } from "wouter";
import { routes } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, User, Users, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/lib/userContext";
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

export default function CommunityPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated, refreshUser } = useUser();
  const [hikes, setHikes] = useState<CommunityHike[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const joinedHikes = user?.communityHikes?.map(ch => ch.hikeId) || [];
  
  // Form state
  const [newHike, setNewHike] = useState({
    title: "",
    routeId: "",
    date: "",
    time: "",
    description: "",
    maxParticipants: "10"
  });

  // Community hike'ları yükle
  useEffect(() => {
    loadHikes();
  }, []);

  const loadHikes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/community-hikes", {
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API response error:", response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Expected JSON but got:", contentType, text.substring(0, 100));
        throw new Error("API'den JSON yerine başka bir format geldi");
      }

      const data = await response.json();
      setHikes(data.hikes || []);
    } catch (error: any) {
      console.error("Hike'lar yüklenirken hata:", error);
      toast({
        title: "Hata",
        description: error.message || "Hike'lar yüklenirken bir hata oluştu",
        variant: "destructive",
      });
      // Hata durumunda boş liste göster
      setHikes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (hikeId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Gerekli",
        description: "Bu işlem için giriş yapmanız gerekiyor",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/community-hikes/${hikeId}/join`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hike'a katılırken bir hata oluştu");
      }

      // Hike listesini güncelle
      await loadHikes();
      // Kullanıcı bilgilerini güncelle
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

  const handleCreateHike = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Gerekli",
        description: "Hike oluşturmak için giriş yapmanız gerekiyor",
        variant: "destructive",
      });
      return;
    }

    if (!newHike.title || !newHike.routeId || !newHike.date) {
      toast({
        title: "Eksik Alanlar",
        description: "Lütfen tüm gerekli alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch("/api/community-hikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: newHike.title,
          routeId: parseInt(newHike.routeId),
          date: newHike.date,
          time: newHike.time || "09:00 AM",
          description: newHike.description || "Join me for a hike!",
          maxParticipants: parseInt(newHike.maxParticipants) || 10
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hike oluşturulurken bir hata oluştu");
      }

      // Hike listesini güncelle
      await loadHikes();
      // Kullanıcı bilgilerini güncelle
      await refreshUser();

      setIsCreateOpen(false);
      toast({
        title: "Hike Oluşturuldu! 🏔️",
        description: "Grup hike'ınız yayınlandı",
      });
      
      setNewHike({
        title: "",
        routeId: "",
        date: "",
        time: "",
        description: "",
        maxParticipants: "10"
      });
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Hike oluşturulurken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">{t("community.title")}</h1>
          <p className="text-muted-foreground">{t("community.subtitle")}</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" disabled={!isAuthenticated}>
              <Users className="h-4 w-4" /> {t("community.create")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Yeni Grup Hike Oluştur</DialogTitle>
              <DialogDescription>
                Bir hike planlayın ve başkalarını davet edin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Hike Başlığı *</Label>
                <Input 
                  id="title" 
                  placeholder="örn: Hafta Sonu Gün Doğumu Hike'ı" 
                  value={newHike.title}
                  onChange={(e) => setNewHike({...newHike, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="route">Rota Seç *</Label>
                <Select 
                  onValueChange={(val) => setNewHike({...newHike, routeId: val})}
                  value={newHike.routeId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bir rota seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map(route => (
                      <SelectItem key={route.id} value={route.id.toString()}>
                        {route.name} ({route.difficulty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Tarih *</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={newHike.date}
                    onChange={(e) => setNewHike({...newHike, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Saat</Label>
                  <Input 
                    id="time" 
                    type="time"
                    value={newHike.time}
                    onChange={(e) => setNewHike({...newHike, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="participants">Maksimum Katılımcı</Label>
                <Input 
                  id="participants" 
                  type="number" 
                  min="2" 
                  max="50"
                  value={newHike.maxParticipants}
                  onChange={(e) => setNewHike({...newHike, maxParticipants: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Açıklama</Label>
                <Input 
                  id="description" 
                  placeholder="Hız, buluşma noktası vb. detaylar"
                  value={newHike.description}
                  onChange={(e) => setNewHike({...newHike, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateHike}>Hike Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {hikes.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Henüz hike oluşturulmamış. İlk hike'ı siz oluşturun!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hikes.map((hike) => {
            const route = routes.find(r => r.id === hike.routeId);
            const isJoined = joinedHikes.includes(hike.id);
            const isFull = hike.participants >= hike.maxParticipants;
            
            return (
                <Card key={hike.id} className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <Link href={`/community-hike/${hike.id}`} className="block">
                    <div className="h-32 overflow-hidden relative bg-muted shrink-0 cursor-pointer">
                      <img 
                        src={route?.image} 
                        alt={hike.title} 
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <h3 className="text-white font-bold text-lg truncate">{hike.title}</h3>
                      </div>
                    </div>
                  </Link>
                  <CardContent className="pt-4 space-y-3 flex-grow">
                    <Link href={`/community-hike/${hike.id}`} className="block space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="truncate">{route?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(hike.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{hike.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{t("community.hosted_by")} <span className="font-medium text-foreground">{hike.host}</span></span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 bg-secondary/30 p-2 rounded-md">
                        {hike.description}
                      </p>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <div className="flex items-center gap-1">
                            <span>{hike.participants} {t("community.participants")}</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="font-bold mb-2">Katılımcılar:</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {hike.participantsList.slice(0, 5).map((participant, i) => (
                                    <div key={i} className="flex items-center gap-1">
                                      <UIAvatar className="h-6 w-6">
                                        <AvatarImage src={participant.userAvatar} />
                                        <AvatarFallback>{participant.userName[0]}</AvatarFallback>
                                      </UIAvatar>
                                      <span className="text-xs">{participant.userName}</span>
                                    </div>
                                  ))}
                                  {hike.participantsList.length > 5 && (
                                    <span className="text-xs text-muted-foreground">
                                      +{hike.participantsList.length - 5} daha
                                    </span>
                                  )}
                                </div>
                                {hike.participantsList.length === 0 && (
                                  <p className="text-xs text-muted-foreground">Henüz katılımcı yok</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span>{hike.maxParticipants} max</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all" 
                            style={{ width: `${(hike.participants / hike.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button 
                      className="w-full" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleJoin(hike.id);
                      }}
                      disabled={isFull || isJoined || !isAuthenticated}
                      variant={isJoined ? "secondary" : "default"}
                    >
                      {!isAuthenticated ? "Giriş Yap" : isJoined ? t("community.joined") : isFull ? t("community.full") : t("community.join")}
                    </Button>
                  </CardFooter>
                </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
