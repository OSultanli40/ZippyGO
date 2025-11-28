import { Link } from "wouter";
import { routes } from "@/lib/data";
import RouteCard from "@/components/RouteCard";
import heroImage from "@assets/generated_images/hero_image_of_a_majestic_mountain_landscape.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Trophy } from "lucide-react";

export default function Home() {
  // Select featured routes (e.g., first 2)
  const featuredRoutes = routes.slice(0, 2);
  const recentRoutes = routes.slice(2, 5);

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
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Find Your Path <br/> In The Mountains
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Explore the best hiking trails, track your adventures, and connect with a community of nature lovers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/routes">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-primary hover:bg-primary/90 border-0">
                Explore Routes
              </Button>
            </Link>
            <Link href="/map">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg bg-white/10 hover:bg-white/20 border-white text-white hover:text-white backdrop-blur-sm">
                View Map
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">Featured Trails</h2>
              <p className="text-muted-foreground">Hand-picked routes for your next weekend adventure.</p>
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
                <Button variant="secondary" size="lg" className="rounded-full font-bold">
                  Join Challenge
                </Button>
              </div>
              
              <div className="w-full md:w-auto flex-shrink-0">
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 max-w-sm mx-auto">
                  <h3 className="font-bold mb-4 border-b border-white/10 pb-2">Leaderboard</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                          {i}
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-white/20 rounded mb-1"></div>
                          <div className="h-2 w-12 bg-white/10 rounded"></div>
                        </div>
                        <div className="text-sm font-bold opacity-80">{5000 - (i * 250)} pts</div>
                      </div>
                    ))}
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
