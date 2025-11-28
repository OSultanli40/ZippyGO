import { useState } from "react";
import { routes } from "@/lib/data";
import RouteCard from "@/components/RouteCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(30);

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
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Explore Routes</h1>
          <p className="text-muted-foreground">Find your next adventure among Azerbaijan's most beautiful trails.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm mb-8 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search routes or regions..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Difficulty</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Region</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Routes</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Max Distance: {maxDistance} km</Label>
                  <Slider 
                    defaultValue={[30]} 
                    max={50} 
                    step={1} 
                    value={[maxDistance]}
                    onValueChange={(vals) => setMaxDistance(vals[0])}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
          <h3 className="text-xl font-bold mb-2">No routes found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find what you're looking for.</p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setDifficultyFilter("all");
              setRegionFilter("all");
              setMaxDistance(30);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
