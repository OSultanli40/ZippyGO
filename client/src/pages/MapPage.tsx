import { routes } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import MapComponent from "@/components/MapComponent";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map as MapIcon, List } from "lucide-react";

export default function MapPage() {
  const { t } = useLanguage();
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const selectedRoute = routes.find(r => r.id === selectedRouteId);

  return (
    <div className="h-[calc(100vh-64px)] relative flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-80 lg:w-96 h-full overflow-y-auto border-r border-border bg-background p-4 shrink-0">
        <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
          <MapIcon className="h-6 w-6 text-primary" /> {t("map.explorer")}
        </h2>
        <div className="space-y-3">
          {routes.map(route => (
            <div 
              key={route.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedRouteId === route.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
              onClick={() => setSelectedRouteId(route.id)}
            >
              <h3 className="font-bold text-sm">{route.name}</h3>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">{route.difficulty}</Badge>
                <span className="text-xs text-muted-foreground flex items-center">{route.distance_km} km</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-grow relative h-full">
        <MapComponent 
          routes={routes} 
          center={selectedRoute ? selectedRoute.coordinates : [40.8, 48.0]}
          zoom={selectedRoute ? 11 : 8}
          height="100%"
        />
        
        {/* Mobile Overlay List Button (could be expanded) */}
        <div className="md:hidden absolute bottom-4 left-4 right-4 z-[1000]">
          <div className="bg-background/90 backdrop-blur p-4 rounded-xl border border-border shadow-lg">
            <h3 className="font-bold mb-2 text-sm uppercase text-muted-foreground">{t("map.tap_marker")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
