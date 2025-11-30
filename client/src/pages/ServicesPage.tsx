import { useState } from "react";
import { services } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShieldCheck, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServicesPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("Guide");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter states
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [minRating, setMinRating] = useState<number>(0);

  const filteredServices = services.filter(service => {
    const matchesTab = activeTab === "All" || service.type === activeTab;
    const matchesPrice = service.price_per_day >= priceRange[0] && service.price_per_day <= priceRange[1];
    const matchesRating = service.rating >= minRating;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesPrice && matchesRating && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">{t("services.title")}</h1>
          <p className="text-muted-foreground">{t("services.subtitle")}</p>
        </div>
      </div>

      <Tabs defaultValue="Guide" className="w-full mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-[600px] grid-cols-3">
          <TabsTrigger value="Guide">{t("services.tab.guides")}</TabsTrigger>
          <TabsTrigger value="Babysitter">{t("services.tab.babysitters")}</TabsTrigger>
          <TabsTrigger value="Equipment">{t("services.tab.equipment")}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters & Search */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm mb-8 flex flex-col xl:flex-row gap-6">
        <div className="relative flex-grow xl:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t("services.search")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 flex-grow items-start md:items-center">
          <div className="flex-grow w-full md:w-auto flex flex-col gap-2 min-w-[200px]">
            <div className="flex justify-between text-xs text-muted-foreground">
              <Label className="text-xs font-normal">{t("services.price_range")}</Label>
              <span className="font-medium text-primary">{priceRange[0]}-{priceRange[1]} AZN</span>
            </div>
            <Slider 
              defaultValue={[0, 200]} 
              max={200} 
              step={5} 
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>

          <Select value={minRating.toString()} onValueChange={(val) => setMinRating(parseFloat(val))}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder={t("services.min_rating")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">{t("services.any")}</SelectItem>
              <SelectItem value="3">3+ ⭐</SelectItem>
              <SelectItem value="4">4+ ⭐</SelectItem>
              <SelectItem value="4.5">4.5+ ⭐</SelectItem>
              <SelectItem value="5">5 ⭐</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
              setPriceRange([0, 200]);
              setMinRating(0);
            }}
            className="text-xs h-8 self-end md:self-center"
          >
            {t("routes.reset")}
          </Button>
        </div>
      </div>

      {/* Results */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Link key={service.id} href={`/service/${service.id}`}>
              <a className="block h-full">
                <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-48 overflow-hidden relative bg-muted">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className={`w-full h-full object-cover transition-transform hover:scale-105 duration-500 ${service.type === "Babysitter" ? "object-top" : ""}`}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="flex items-center gap-1 font-bold bg-white/90 backdrop-blur text-foreground">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {service.rating}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">{service.type}</Badge>
                      {service.available ? (
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{t("services.available")}</span>
                      ) : (
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">{t("services.booked")}</span>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <ShieldCheck className="h-4 w-4 text-primary" /> {t("services.verified")}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-secondary/10 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">{service.price_per_day} AZN</span>
                      <span className="text-sm text-muted-foreground"> {t("services.per_day")}</span>
                    </div>
                    <Button disabled={!service.available}>
                      {t("services.book")}
                    </Button>
                  </CardFooter>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-secondary/30 rounded-2xl border border-dashed border-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t("services.empty")}</h3>
          <p className="text-muted-foreground mb-6">{t("services.empty_desc")}</p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setPriceRange([0, 200]);
              setMinRating(0);
            }}
          >
            {t("routes.clear_filters")}
          </Button>
        </div>
      )}
    </div>
  );
}
