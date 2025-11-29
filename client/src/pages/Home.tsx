import { Link } from "wouter";
import { routes, services } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { useUser } from "@/lib/userContext";
import RouteCard from "@/components/RouteCard";
import heroImage from "@assets/generated_images/hero_image_of_a_majestic_mountain_landscape.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Trophy, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { t } = useLanguage();
  const { user, joinChallenge, isInChallenge } = useUser();
  
  // Select featured routes (e.g., first 2)
  const featuredRoutes = routes.slice(0, 2);
  const recentRoutes = routes.slice(2, 5);
  const featuredServices = services.slice(0, 3); // Show top 3 services

  const leaderboard = [
    { rank: 1, name: "Elvin M.", points: 4750 },
    { rank: 2, name: "Sarah A.", points: 4500 },
    { rank: 3, name: "Murad K.", points: 4250 },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={heroImage} 
          alt="Hiking in Azerbaijan" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <div className="inline-block mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wider uppercase">
              Discover Azerbaijan
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 whitespace-pre-line">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/routes">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-primary hover:bg-primary/90 border-0">
                {t("home.hero.explore")}
              </Button>
            </Link>
            <Link href="/map">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg bg-white/10 hover:bg-white/20 border-white text-white hover:text-white backdrop-blur-sm">
                {t("home.hero.map")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Routes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">{t("home.featured.title")}</h2>
              <p className="text-muted-foreground">{t("home.featured.subtitle")}</p>
            </div>
            <Link href="/routes">
              <Button variant="ghost" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredRoutes.map(route => (
              <RouteCard key={route.id} route={route} featured />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRoutes.map(route => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center">
            <Link href="/routes">
              <Button variant="outline" className="w-full">View All Routes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Teaser Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">{t("home.services.title")}</h2>
              <p className="text-muted-foreground">{t("home.services.subtitle")}</p>
            </div>
            <Link href="/services">
              <Button variant="ghost" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow border-border">
                <div className="flex items-center p-4 gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{service.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {service.rating}
                      <span className="px-1.5 py-0.5 bg-secondary rounded-full text-xs font-medium">{service.type}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="pb-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                  <Link href="/services">
                    <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden text-primary-foreground">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold mb-4">
                  <Trophy className="h-4 w-4 text-yellow-300" /> Weekly Challenge
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The 5 Peak Challenge</h2>
                <p className="text-primary-foreground/80 text-lg mb-6 max-w-xl">
                  Climb 5 peaks above 2000m this month to earn the exclusive "Highlander" badge and a spot on the leaderboard.
                </p>
                <Button 
                  variant={isInChallenge ? "outline" : "secondary"} 
                  size="lg" 
                  className="rounded-full font-bold"
                  onClick={joinChallenge}
                  disabled={isInChallenge}
                >
                  {isInChallenge ? "Joined ✓" : "Join Challenge"}
                </Button>
              </div>
              
              <div className="w-full md:w-auto flex-shrink-0">
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 max-w-sm mx-auto w-full md:w-80">
                  <h3 className="font-bold mb-4 border-b border-white/10 pb-2">Leaderboard</h3>
                  <div className="space-y-3">
                    {leaderboard.map((entry) => (
                      <div key={entry.rank} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${entry.rank === 1 ? 'bg-yellow-400 text-black' : 'bg-white/20'}`}>
                          {entry.rank}
                        </div>
                        <div className="flex-1 font-medium">
                          {entry.name}
                        </div>
                        <div className="text-sm font-bold opacity-80">{entry.points} pts</div>
                      </div>
                    ))}
                    
                    {isInChallenge && (
                      <div className="flex items-center gap-3 pt-3 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm border border-white/50">
                          42
                        </div>
                        <div className="flex-1 font-bold text-yellow-300">
                          {user.name} (You)
                        </div>
                        <div className="text-sm font-bold opacity-80">0 pts</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
