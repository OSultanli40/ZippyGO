import { useState } from "react";
import { routes } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import RouteCard from "@/components/RouteCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function RoutesPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(50);

  const regions = Array.from(new Set(routes.map(r => r.region)));

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          route.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || route.difficulty === difficultyFilter;
    const matchesRegion = regionFilter === "all" || route.region === regionFilter;
    const matchesDistance = route.distance_km <= maxDistance;

    return matchesSearch && matchesDifficulty && matchesRegion && matchesDistance;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">{t("routes.title")}</h1>
          <p className="text-muted-foreground">{t("routes.subtitle")}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm mb-8 flex flex-col xl:flex-row gap-6">
        <div className="relative flex-grow xl:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t("routes.search")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 flex-grow items-start md:items-center">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder={t("routes.filter.difficulty")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("routes.any_difficulty")}</SelectItem>
              <SelectItem value="Easy">{t("routes.difficulty.easy")}</SelectItem>
              <SelectItem value="Medium">{t("routes.difficulty.medium")}</SelectItem>
              <SelectItem value="Hard">{t("routes.difficulty.hard")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder={t("routes.filter.region")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("routes.any_region")}</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-grow w-full md:w-auto flex flex-col gap-2 min-w-[200px]">
            <div className="flex justify-between text-xs text-muted-foreground">
              <Label className="text-xs font-normal">{t("routes.filter.distance")}</Label>
              <span className="font-medium text-primary">{maxDistance} km</span>
            </div>
            <Slider 
              defaultValue={[50]} 
              max={50} 
              step={1} 
              value={[maxDistance]}
              onValueChange={(vals) => setMaxDistance(vals[0])}
            />
          </div>

          <Button 
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
              setDifficultyFilter("all");
              setRegionFilter("all");
              setMaxDistance(50);
            }}
            className="text-xs h-8 self-end md:self-center"
          >
            {t("routes.reset")}
          </Button>
        </div>
      </div>

      {/* Results */}
      {filteredRoutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-secondary/30 rounded-2xl border border-dashed border-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t("routes.empty")}</h3>
          <p className="text-muted-foreground mb-6">{t("routes.empty_desc")}</p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setDifficultyFilter("all");
              setRegionFilter("all");
              setMaxDistance(50);
            }}
          >
            {t("routes.clear_filters")}
          </Button>
        </div>
      )}
    </div>
  );
}
