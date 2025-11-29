import { useState } from "react";
import { groupHikes, routes, initialUser } from "@/lib/data";
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

export default function CommunityPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [hikes, setHikes] = useState(groupHikes);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [joinedHikes, setJoinedHikes] = useState<number[]>([]);
  
  // Form state
  const [newHike, setNewHike] = useState({
    title: "",
    routeId: "",
    date: "",
    time: "",
    description: "",
    maxParticipants: "10"
  });

  const handleJoin = (hikeId: number) => {
    if (joinedHikes.includes(hikeId)) {
      toast({
        title: "Already Joined",
        description: "You are already a participant in this hike.",
        variant: "destructive"
      });
      return;
    }

    setHikes(prev => prev.map(hike => {
      if (hike.id === hikeId && hike.participants < hike.maxParticipants) {
        toast({
          title: "Joined Hike! 🥾",
          description: `You've successfully joined "${hike.title}".`,
          duration: 3000,
        });
        setJoinedHikes([...joinedHikes, hikeId]);
        return { 
          ...hike, 
          participants: hike.participants + 1,
          participantNames: [...(hike.participantNames || []), initialUser.name] 
        };
      }
      return hike;
    }));
  };

  const handleCreateHike = () => {
    if (!newHike.title || !newHike.routeId || !newHike.date) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const createdHike = {
      id: Date.now(),
      title: newHike.title,
      routeId: parseInt(newHike.routeId),
      date: newHike.date,
      time: newHike.time || "09:00 AM",
      host: initialUser.name,
      participants: 1,
      participantNames: [initialUser.name],
      maxParticipants: parseInt(newHike.maxParticipants),
      description: newHike.description || "Join me for a hike!"
    };

    setHikes([createdHike, ...hikes]);
    setJoinedHikes([...joinedHikes, createdHike.id]);
    setIsCreateOpen(false);
    toast({
      title: "Hike Created! 🏔️",
      description: "Your group hike has been published.",
    });
    setNewHike({
      title: "",
      routeId: "",
      date: "",
      time: "",
      description: "",
      maxParticipants: "10"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">{t("community.title")}</h1>
          <p className="text-muted-foreground">{t("community.subtitle")}</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Users className="h-4 w-4" /> {t("community.create")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create a Group Hike</DialogTitle>
              <DialogDescription>
                Plan a hike and invite others to join you.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Hike Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Weekend Sunrise Hike" 
                  value={newHike.title}
                  onChange={(e) => setNewHike({...newHike, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="route">Select Route</Label>
                <Select 
                  onValueChange={(val) => setNewHike({...newHike, routeId: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trail" />
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
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={newHike.date}
                    onChange={(e) => setNewHike({...newHike, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    type="time"
                    value={newHike.time}
                    onChange={(e) => setNewHike({...newHike, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="participants">Max Participants</Label>
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
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Details about pace, meeting point, etc."
                  value={newHike.description}
                  onChange={(e) => setNewHike({...newHike, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateHike}>Create Hike</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hikes.map((hike) => {
          const route = routes.find(r => r.id === hike.routeId);
          const isJoined = joinedHikes.includes(hike.id);
          const isFull = hike.participants >= hike.maxParticipants;
          
          return (
            <Card key={hike.id} className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="h-32 overflow-hidden relative bg-muted shrink-0">
                <img 
                  src={route?.image} 
                  alt={hike.title} 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg truncate">{hike.title}</h3>
                </div>
              </div>
              <CardContent className="pt-4 space-y-3 flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="truncate">{route?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{hike.date}</span>
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
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-bold mb-1">Participants:</p>
                          <ul className="list-disc pl-4 text-xs">
                            {hike.participantNames?.map((name, i) => (
                              <li key={i}>{name}</li>
                            ))}
                          </ul>
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
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleJoin(hike.id)}
                  disabled={isFull || isJoined}
                  variant={isJoined ? "secondary" : "default"}
                >
                  {isJoined ? t("community.joined") : isFull ? t("community.full") : t("community.join")}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
