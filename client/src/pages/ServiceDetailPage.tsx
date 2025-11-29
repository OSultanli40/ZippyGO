import { useRoute } from "wouter";
import { services } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, CheckCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function ServiceDetailPage() {
  const [match, params] = useRoute("/service/:id");
  const { t } = useLanguage();
  const { toast } = useToast();
  const id = params?.id;
  const service = services.find(s => s.id === id);

  if (!service) return <div className="container py-20 text-center">Service not found</div>;

  const handleBook = () => {
    toast({
      title: "Booking Request Sent!",
      description: `We've sent a request for ${service.name}. You will receive a confirmation soon.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-4 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="text-base px-3 py-1">{service.type}</Badge>
            <Badge variant="secondary" className="flex items-center gap-1 font-bold bg-white/90 backdrop-blur text-foreground">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /> {service.rating}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 shadow-black/10 drop-shadow-md">
            {service.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Description</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.fullDescription || service.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card className="p-4 border-none bg-secondary/30 flex items-center gap-3">
                   <ShieldCheck className="h-6 w-6 text-primary" />
                   <div>
                     <p className="font-bold">Verified Professional</p>
                     <p className="text-sm text-muted-foreground">Identity and certification checked</p>
                   </div>
                 </Card>
                 <Card className="p-4 border-none bg-secondary/30 flex items-center gap-3">
                   <Calendar className="h-6 w-6 text-primary" />
                   <div>
                     <p className="font-bold">Flexible Cancellation</p>
                     <p className="text-sm text-muted-foreground">Free cancellation up to 24h before</p>
                   </div>
                 </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border shadow-sm sticky top-24">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-primary">${service.price_per_day}</span>
                  <span className="text-muted-foreground"> {t("services.per_day")}</span>
                </div>
                {service.available ? (
                   <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t("services.available")}</Badge>
                ) : (
                   <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t("services.booked")}</Badge>
                )}
              </div>

              <Button className="w-full h-12 text-lg" onClick={handleBook} disabled={!service.available}>
                {t("services.book")}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                You won't be charged yet
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
