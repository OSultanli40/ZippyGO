import { useRoute } from "wouter";
import { routes } from "@/lib/data";
import { useUser } from "@/lib/userContext"; // Import useUser
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrendingUp, Ruler, CheckCircle, Share2, Heart, CloudSun } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function RouteDetailPage() {
  const [match, params] = useRoute("/route/:id");
  const { toast } = useToast();
  const { user, completeHike } = useUser(); // Use global user context
  const id = params ? parseInt(params.id) : 0;
  const route = routes.find(r => r.id === id);
  
  const isCompleted = user.completedHikes.includes(id);

  if (!route) return <div className="container py-20 text-center">Route not found</div>;

  const handleMarkCompleted = () => {
    if (isCompleted) return;
    
    completeHike(id, route.distance_km, route.elevation_m);
    
    toast({
      title: "Hike Completed! 🎉",
      description: `You've marked ${route.name} as completed.`,
      duration: 3000,
    });
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
              <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                onClick={handleMarkCompleted}
                className={`h-12 px-6 rounded-full font-semibold ${isCompleted ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> Completed
                  </>
                ) : (
                  "Mark as Completed"
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
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Distance</span>
                <span className="text-xl font-bold">{route.distance_km} km</span>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <TrendingUp className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Elevation</span>
                <span className="text-xl font-bold">{route.elevation_m} m</span>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Duration</span>
                <span className="text-xl font-bold">{route.duration_hours} h</span>
              </Card>
              <Card className="p-4 flex flex-col items-center justify-center text-center bg-secondary/30 border-none">
                <CloudSun className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Weather</span>
                <span className="text-xl font-bold">18°C</span>
              </Card>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">About the Trail</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {route.fullDescription || route.description}
              </p>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Trail Map</h2>
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
                <MapPin className="h-5 w-5 text-primary" /> Location
              </h3>
              <p className="text-muted-foreground mb-4">
                Located in the <strong>{route.region}</strong> region. 
              </p>
              <Button variant="outline" className="w-full">Get Directions</Button>
            </Card>

            <Card className="p-6 bg-card border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Join a Group</h3>
              <p className="text-sm text-muted-foreground mb-4">
                3 groups are planning to hike this trail this weekend.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">JD</div>
                  <div>
                    <p className="text-sm font-medium">Saturday Morning Hike</p>
                    <p className="text-xs text-muted-foreground">Sat, 8:00 AM • 4 spots left</p>
                  </div>
                </div>
              </div>
              <Button className="w-full">Join Group</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
