import { tips } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Droplets, Shirt, Trash2, CloudSun, Phone } from "lucide-react";

export default function SafetyPage() {
  const { t } = useLanguage();
  const iconMap: any = {
    Droplets,
    Shirt,
    Trash2,
    CloudSun
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">{t("safety.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("safety.subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((tip) => {
            const Icon = iconMap[tip.icon] || Shield;
            return (
              <Card key={tip.id} className="border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 bg-secondary rounded-lg text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
          
          <Card className="border-l-4 border-l-destructive col-span-1 md:col-span-2 bg-red-50/50 border-t-0 border-r-0 border-b-0">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-red-100 rounded-lg text-destructive">
                <Phone className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{t("safety.emergency")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("safety.emergency_desc")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-3 rounded border border-red-100 text-center">
                  <span className="block text-xs text-muted-foreground uppercase font-bold">{t("safety.general")}</span>
                  <span className="text-2xl font-bold text-destructive">112</span>
                </div>
                <div className="bg-background p-3 rounded border border-red-100 text-center">
                  <span className="block text-xs text-muted-foreground uppercase font-bold">{t("safety.ambulance")}</span>
                  <span className="text-2xl font-bold text-destructive">103</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
