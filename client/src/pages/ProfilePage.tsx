import { routes } from "@/lib/data";
import { useUser } from "@/lib/userContext"; // Import useUser
import { useLanguage } from "@/lib/language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CheckCircle } from "lucide-react";
import RouteCard from "@/components/RouteCard";

export default function ProfilePage() {
  const { user } = useUser(); // Use global user context
  const { t } = useLanguage();
  const completedRoutes = routes.filter(r => user.completedHikes.includes(r.id));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="relative">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full border-4 border-background">
            <Award className="h-5 w-5" />
          </div>
        </div>
        
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-display font-bold mb-2">{user.name}</h1>
          <p className="text-muted-foreground mb-4">Nature enthusiast & Weekend explorer</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <div className="text-center">
              <span className="block text-2xl font-bold text-foreground">{user.completedHikes.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("profile.hikes")}</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-foreground">{user.totalKm}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("profile.kilometers")}</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-foreground">{user.totalElevation}m</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{t("profile.elevation")}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="badges">{t("profile.badges")}</TabsTrigger>
          <TabsTrigger value="history">{t("profile.history")}</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="animate-in fade-in-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {user.badges.map((badge) => (
              <Card key={badge.id} className={`border-2 ${badge.earned ? 'border-primary/20 bg-primary/5' : 'border-border opacity-60'}`}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 h-24 w-24">
                    <img src={badge.image} alt={badge.name} className={`h-full w-full object-contain ${!badge.earned && 'grayscale'}`} />
                  </div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                  {badge.earned ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t("profile.earned")} {badge.dateEarned}
                    </span>
                  ) : (
                    <div className="space-y-2">
                      <Progress value={33} className="h-2" />
                      <p className="text-xs text-muted-foreground">1/3 {t("profile.progress")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="animate-in fade-in-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedRoutes.map(route => (
              <div key={route.id} className="relative">
                <div className="absolute top-2 right-2 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-sm font-bold flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Completed
                </div>
                <RouteCard route={route} />
              </div>
            ))}
            {completedRoutes.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No completed hikes yet. Go explore!
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
