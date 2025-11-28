import { Route } from "@/lib/data";
import { Link } from "wouter";
import { Clock, Ruler, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface RouteCardProps {
  route: Route;
  featured?: boolean;
}

export default function RouteCard({ route, featured = false }: RouteCardProps) {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800 hover:bg-green-100",
    Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    Hard: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Link href={`/route/${route.id}`}>
      <a className="group block h-full">
        <div className={cn(
          "relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col",
          featured ? "md:flex-row md:h-[400px]" : ""
        )}>
          {/* Image */}
          <div className={cn(
            "relative overflow-hidden bg-muted",
            featured ? "h-64 md:h-full md:w-1/2" : "h-48 w-full"
          )}>
            <img 
              src={route.image} 
              alt={route.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <Badge className={cn("font-semibold border-0", difficultyColor[route.difficulty])}>
                {route.difficulty}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className={cn(
            "p-5 flex flex-col flex-grow justify-between",
            featured ? "md:w-1/2 md:p-8 md:justify-center" : ""
          )}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  {route.region}
                </span>
              </div>
              <h3 className={cn(
                "font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors",
                featured ? "text-3xl md:text-4xl" : "text-xl"
              )}>
                {route.name}
              </h3>
              <p className="text-muted-foreground line-clamp-2 mb-4">
                {route.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Ruler className="h-4 w-4 text-primary" />
                  <span>{route.distance_km} km</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{route.elevation_m}m</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{route.duration_hours}h</span>
                </div>
              </div>
              
              {featured && (
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:translate-x-1 transition-transform mt-4">
                  View Details <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
