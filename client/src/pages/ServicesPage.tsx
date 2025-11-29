import { useState } from "react";
import { services } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShieldCheck, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function ServicesPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("Guide");

  const filteredServices = services.filter(service => 
    activeTab === "All" || service.type === activeTab
  );

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
