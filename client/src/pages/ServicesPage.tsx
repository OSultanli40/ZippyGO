import { useState } from "react";
import { services } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShieldCheck, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export default function ServicesPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("Guide");
  
  // Filter states
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [minRating, setMinRating] = useState<number>(0);

  const filteredServices = services.filter(service => {
    const matchesTab = activeTab === "All" || service.type === activeTab;
    const matchesPrice = service.price_per_day >= priceRange[0] && service.price_per_day <= priceRange[1];
    const matchesRating = service.rating >= minRating;
    
    return matchesTab && matchesPrice && matchesRating;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">{t("services.title")}</h1>
          <p className="text-muted-foreground">{t("services.subtitle")}</p>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Price Range ($/day)</h4>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0, 100]}
                    max={200}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Minimum Rating</h4>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5, 5].map((rating) => (
                    <Button 
                      key={rating}
                      variant={minRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMinRating(rating)}
                      className="flex-1"
                    >
                      {rating === 0 ? "Any" : `${rating}+`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="Guide" className="w-full mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-[600px] grid-cols-3">
          <TabsTrigger value="Guide">{t("services.tab.guides")}</TabsTrigger>
          <TabsTrigger value="Babysitter">{t("services.tab.babysitters")}</TabsTrigger>
          <TabsTrigger value="Equipment">{t("services.tab.equipment")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Link key={service.id} href={`/service/${service.id}`}>
            <a className="block h-full">
              <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="h-48 overflow-hidden relative bg-muted">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
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
                    <span className="text-lg font-bold text-primary">${service.price_per_day}</span>
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
    </div>
  );
}
