import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { services } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { useUser } from "@/lib/userContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, CheckCircle, Calendar, Wallet, Clock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Service descriptions translations
const serviceDescriptions: Record<string, { description: string; fullDescription: string }> = {
  az: {
    "elvinmammadov": {
      description: "Böyük Qafqazda 10 illik təcrübəsi olan sertifikatlı dağ bələdçisi.",
      fullDescription: "Elvin UIAA sertifikatlı bələdçidir və Şahdağ və Bazardüzü bölgələri haqqında geniş bilikə malikdir. O, həm yay yürüşü, həm də qış dağçılığı üzrə ixtisaslaşmışdır. O, həmçinin ilk yardım təlimi keçmişdir və İngilis, Rus və Azərbaycan dillərini sərbəst danışır."
    },
    "sarahaliyeva": {
      description: "Yüksək dağlıq yürüşü və vəhşi təbiət sağ qalma bacarıqları üzrə mütəxəssis.",
      fullDescription: "Sarah Azərbaycanın ən yaxşı yüksək dağlıq bələdçilərindən biridir. O, Qafqaz üzrə ekspedisiyalar aparmışdır və davamlı yürüş praktikalarına diqqət yetirir. Onun turları çox vaxt naviqasiya və sağ qalma bacarıqları üzrə seminarları əhatə edir."
    },
    "tyraneslick": {
      description: "Çətin dağ yolları üzrə ixtisaslaşmış təcrübəli alpin bələdçi.",
      fullDescription: "Tyrane Azərbaycanın zirvələrinə illərlə dağ təcrübəsi gətirir. Çətin şəraitdə sakit davranışı və əla marşrut planlaşdırması ilə tanınır. O, alpin təhlükəsizliyi və hava şəraiti qiymətləndirməsi ilə yaxşı tanışdır."
    },
    "vladimiralexsandrovich": {
      description: "Beynəlxalq ekspedisiya təcrübəsi olan peşəkar dağçı.",
      fullDescription: "Vladimir Qafqaz, Alp və Himalay üzrə ekspedisiyalar aparmışdır. Onun texniki dırmaşma və dağ xilasetməsi üzrə mütəxəssisliyi onu qabaqcıl yürüşlər üçün ideal edir. Rus, İngilis və Azərbaycan dillərini sərbəst danışır."
    },
    "jackblack": {
      description: "Qruplar və başlanğıc səviyyəli yürüşçülər üçün mükəmməl dostlu və bilikli bələdçi.",
      fullDescription: "Jack yürüşü hər kəs üçün əlçatan edir. Onun səbirli tədris üslubu və yerli flora və fauna haqqında geniş bilikləri unudulmaz təcrübələr yaradır. Ailələr və ilk dəfə yürüş edənlər üçün əladır."
    },
    "zahidqubadov": {
      description: "Azərbaycanın gizli yolları haqqında dərin bilikə malik yerli bələdçi.",
      fullDescription: "Dağlarda doğulub böyümüş Zahid hər gizli yol və mənzərəli baxış nöqtəsini bilir. Onun Azərbaycan təbiətinə olan ehtirası yoluxucudur və o, yerli tarix və mədəniyyət haqqında hekayələr bölüşməyi sevir."
    },
    "leylarafullayeva": {
      description: "Mədəni və təbiət fotoqrafiyası yürüşləri üzrə ixtisaslaşmış mütəxəssis bələdçi.",
      fullDescription: "Leyla fotoqrafiyaya olan sevgisini mütəxəssis marşrut bilikləri ilə birləşdirir. Azərbaycanın gözəlliyini tutmaq və yerli ənənələr haqqında öyrənmək istəyən səyyahlar üçün mükəmməldir. O, ən yaxşı vaxt və mövqeləri bilir."
    },
    "tofiqhaciyev": {
      description: "Vəhşi həyat və quş müşahidəsi üzrə mütəxəssisliyi olan təcrübəli dağ bələdçisi.",
      fullDescription: "Tofiq təbiətçidir. Onun yürüşləri çox vaxt təhsil təcrübələrinə çevrilir, çünki o, Azərbaycanın müxtəlif vəhşi həyatı, quş növləri və ekosistemləri haqqında biliklər bölüşür. Təbiət həvəskarları üçün mükəmməldir."
    },
    "sabirahmadov": {
      description: "Təhlükəsizlik və qrup idarəetməsinə güclü diqqət yetirən peşəkar bələdçi.",
      fullDescription: "Sabir təhlükəsizlik protokollarına və əla qrup koordinasiyasına diqqəti ilə tanınır. Onun aydın ünsiyyəti və təşkilat bacarıqları onu böyük qruplar və korporativ yürüş səfərləri üçün ideal edir."
    },
    "leylakarimova": {
      description: "Siz yürüş edərkən uşaqlar üçün açıq hava oyunları təşkil edən təbiətsevər dayə.",
      fullDescription: "Leyla uşaq baxımını açıq hava təhsili ilə birləşdirir. Siz daha çətin yolları məşğul edərkən, uşaqlarınız bazada təhlükəsiz olacaq, yerli flora və fauna haqqında öyrənəcək, təbiət mövzulu oyunlar oynayacaq və təmiz havadan zövq alacaq."
    },
    "qerenfilhuseynova": {
      description: "İsti və qayğıkeş yanaşması ilə təcrübəli uşaq baxıcısı.",
      fullDescription: "Qerenfil bütün yaşlı uşaqlara qayğı göstərməkdə illərlə təcrübəyə malikdir. Onun sakit və səbirli təbiəti uşaqları təhlükəsiz və rahat hiss etdirir. O, yaradıcı fəaliyyətlər təşkil edir və valideynlər yolları kəşf edərkən uşaqların əylənməsini təmin edir."
    },
    "tenzileagakshiyeva": {
      description: "Uşaqları açıq havada aktiv və məşğul saxlayan enerjili dayə.",
      fullDescription: "Tenzilə uşaq baxımına həvəs və yaradıcılıq gətirir. O, açıq hava fəaliyyətləri, təbiət ovu və təhsil oyunları təşkil etməyi sevir. Daimi məşğuliyyətə ehtiyacı olan aktiv uşaqları olan ailələr üçün mükəmməldir."
    },
    "saraaxundova": {
      description: "İlk yardım sertifikatı və uşaq psixologiyası təcrübəsi olan peşəkar dayə.",
      fullDescription: "Sara peşəkar uşaq baxımı təlimini uşaqlara olan həqiqi sevgi ilə birləşdirir. İlk yardım və CPR üzrə sertifikatlaşdırılmışdır, o, ən yüksək təhlükəsizlik standartlarını təmin edir. Onun uşaq psixologiyası təcrübəsi hər uşağın unikal ehtiyaclarını başa düşməyə və cavab verməyə kömək edir."
    },
    "medineceferova": {
      description: "Kiçik uşaqlar və körpələr üçün mükəmməl nazik və qayğıkeş dayə.",
      fullDescription: "Medinə körpə və kiçik uşaqlara qayğı göstərməkdə ixtisaslaşmışdır. Onun nazik yanaşması və detallara diqqəti ən kiçik uşaqların belə yaxşı qayğı göstərilməsini təmin edir. O, valideynlər yürüş macərasından zövq alarkən təhlükəsiz, qayğıkeş mühit yaradır."
    },
    "maryanne": {
      description: "Beynəlxalq uşaq baxımı təcrübəsi olan iki dilli dayə.",
      fullDescription: "Mary Anne Azərbaycana beynəlxalq uşaq baxımı təcrübəsi gətirir. İngilis və Azərbaycan dillərini sərbəst danışır, beynəlxalq ailələr üçün mükəmməldir. Onun strukturlaşdırılmış yanaşması təhsil fəaliyyətləri, hekayə danışma və yaşa uyğun oyunları əhatə edir."
    },
    "elnarehaciyeva": {
      description: "Uşaqlar üçün incəsənət və sənət fəaliyyətləri təşkil edən yaradıcı dayə.",
      fullDescription: "Elnarə uşaq baxımını yaradıcı ifadə ilə birləşdirir. O, təbiət ilhamlı incəsənət və sənət, hekayə danışma sessiyaları və təhsil oyunları təşkil edir. Onun bədii yanaşması uşaqların əylənərkən və xatirələr yaradarkən təbiət haqqında öyrənməsinə kömək edir."
    },
    "amyjane": {
      description: "Çevik planlaşdırma ilə dostlu və etibarlı dayə.",
      fullDescription: "Amy Jane etibarlılığı və çevikliyi ilə tanınır. O, müxtəlif ailə ehtiyaclarına və cədvəllərinə uyğunlaşır. Onun dostlu şəxsiyyəti uşaqları rahat hiss etdirir və müxtəlif yaşlı uşaqlar qrupunu idarə etməkdə əladır."
    },
    "backpack50l": {
      description: "Çox günlük yürüşlər üçün uyğun yüngül, su keçirməz bel çantası.",
      fullDescription: "Bu 50L bel çantası rahatlıq və davamlılıq üçün dizayn edilmişdir. Xüsusiyyətlərə tam tənzimlənən asma sistemi, inteqrasiya edilmiş yağış örtüyü və təşkilatlı yükləmə üçün çoxsaylı bölmələr daxildir. 2-3 günlük yürüş səfərləri üçün mükəmməldir."
    },
    "trekkingboots": {
      description: "Sərt ərazi üçün əla ayaq biləyi dəstəyi ilə möhkəm botlar.",
      fullDescription: "Daşlı və sürüşkən səthlərdə üstün tutuş üçün Vibram altlıqlı yüksək keyfiyyətli dəri botlar. Su keçirməz Gore-Tex astarı bütün şəraitdə ayaqlarınızın quru qalmasını təmin edir. 36-46 ölçülərdə mövcuddur."
    },
    "tent2person": {
      description: "Düşərgə səfərləri üçün asan quraşdırılan, hava şəraitinə davamlı çadır.",
      fullDescription: "Külək və yağışdan əla qorunma təmin edən yüngül 3 mövsüm çadırı. Rəng kodlu dirəklərlə tez və asan quraşdırılır. Avadanlıq saxlamaq üçün iki vestibül ilə geniş daxili məkan."
    },
    "sleepingbag": {
      description: "Gecə düşərgə macəraları üçün isti və rahat yataq çantası.",
      fullDescription: "Soyuq hava şəraiti üçün dizayn edilmiş bu yataq çantası sərin dağ gecələrində sizi isti saxlayır. Kompakt və yüngül dizayn daşımağı asanlaşdırır. Düşərgə səfərləri və çox günlük yürüşlər üçün mükəmməldir."
    },
    "backpack20l": {
      description: "Qısa yürüşlər və günlük səfərlər üçün mükəmməl məqbul qiymətli gündəlik çanta.",
      fullDescription: "Günlük yürüşlər və qısa macəralar üçün ideal. Bu 20 litrlik bel çantası kompakt, lakin su, qəlyanaltı və əlavə qatlar kimi əsas şeylər üçün kifayət qədər genişdir. Rahat çiyin kəmərləri və nəfəs alan arxa panel."
    },
    "salomonboots": {
      description: "Qabaqcıl tutuş və ayaq biləyi dəstəyi ilə premium yürüş botları.",
      fullDescription: "Salomon-dan ən yaxşı yürüş botları. Bütün ərazilərdə üstün tutuş üçün Contagrip altlıq texnologiyası, qabaqcıl yumşaltma və əla ayaq biləyi dəstəyi xüsusiyyətləri. Çətin dağ yolları üçün mükəmməldir."
    },
    "fullqualitykit": {
      description: "Hər şeyi özündə birləşdirən premium yürüş avadanlıqları paketi.",
      fullDescription: "Bütün əsas avadanlıqları ehtiva edən hərtərəfli yürüş dəsti: bel çantası, çadır, yataq çantası, botlar, baş lampası və təhlükəsizlik avadanlıqları. Çox günlük macəra üçün lazım olan hər şey bir rahat paketdə. İlk dəfə yürüş edənlər və ya yüngül səyahət edənlər üçün mükəmməldir."
    }
  }
};

export default function ServiceDetailPage() {
  const [match, params] = useRoute("/service/:id");
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { user, refreshUser } = useUser();
  const [isBooking, setIsBooking] = useState(false);
  const id = params?.id;
  const service = services.find(s => s.id === id);
  
  // Check if there's a pending payment for this service
  const pendingPayment = user?.pendingPayments?.find(
    p => p.serviceId === id && (p.status === "pending" || p.status === "processing")
  );
  
  // Get translated description if available
  const getDescription = () => {
    if (language === "az" && id && serviceDescriptions.az[id]) {
      return serviceDescriptions.az[id].description;
    }
    return service?.description || "";
  };
  
  const getFullDescription = () => {
    if (language === "az" && id && serviceDescriptions.az[id]) {
      return serviceDescriptions.az[id].fullDescription;
    }
    return service?.fullDescription || service?.description || "";
  };

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!service) return <div className="container py-20 text-center">{t("service.not_found")}</div>;

  const handleBook = async () => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Bu işlem için giriş yapmanız gerekiyor",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch("/api/user/wallet/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          amount: service.price_per_day,
          type: service.type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Rezervasyon Yapıldı",
          description: `${service.price_per_day} AZN bakiyenizden bloklandı. Rehber ile iletişime geçtikten sonra ödemeyi işleme alabilirsiniz.`,
          duration: 5000,
        });
        refreshUser();
      } else {
        throw new Error(data.message || "Rezervasyon yapılamadı");
      }
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <img 
          src={service.image} 
          alt={service.name} 
          className={`w-full h-full object-cover ${service.type === "Babysitter" ? "object-top" : ""}`}
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
              <h2 className="text-2xl font-display font-bold mb-4">{t("service.description")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {getFullDescription()}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">{t("service.details")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card className="p-4 border-none bg-secondary/30 flex items-center gap-3">
                   <ShieldCheck className="h-6 w-6 text-primary" />
                   <div>
                     <p className="font-bold">{t("service.verified_professional")}</p>
                     <p className="text-sm text-muted-foreground">{t("service.verified_desc")}</p>
                   </div>
                 </Card>
                 <Card className="p-4 border-none bg-secondary/30 flex items-center gap-3">
                   <Calendar className="h-6 w-6 text-primary" />
                   <div>
                     <p className="font-bold">{t("service.flexible_cancellation")}</p>
                     <p className="text-sm text-muted-foreground">{t("service.cancellation_desc")}</p>
                   </div>
                 </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Image */}
            <Card className="overflow-hidden border-border shadow-sm">
              <img 
                src={service.image} 
                alt={service.name} 
                className={`w-full h-64 object-cover ${
                  id === "qerenfilhuseynova" 
                    ? "object-bottom" 
                    : service.type === "Babysitter" || service.type === "Guide" 
                      ? "object-top" 
                      : "object-center"
                }`}
              />
            </Card>
            
            <Card className="p-6 bg-card border-border shadow-sm sticky top-24">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-primary">{service.price_per_day}</span>
                  <span className="text-muted-foreground"> AZN {t("services.per_day")}</span>
                </div>
                {service.available ? (
                   <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t("services.available")}</Badge>
                ) : (
                   <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t("services.booked")}</Badge>
                )}
              </div>

              {/* Pending Payment Alert */}
              {pendingPayment && (
                <Alert className="mb-4 border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="font-bold text-yellow-900 dark:text-yellow-100">
                    Ödeme Beklemede
                  </AlertTitle>
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-sm">
                    {pendingPayment.amount.toFixed(2)} AZN bakiyenizden bloklanmış durumda. Rehber ile iletişime geçtikten sonra ödemeyi işleme alabilirsiniz.
                  </AlertDescription>
                </Alert>
              )}

              {/* Balance Check */}
              {user && !pendingPayment && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Bakiyeniz:</span>
                    <span className="font-bold">{(user.balance || 0).toFixed(2)} AZN</span>
                  </div>
                  {(user.balance || 0) < service.price_per_day && (
                    <p className="text-xs text-red-600 mt-2">
                      Yetersiz bakiye. Lütfen cüzdanınıza para ekleyin.
                    </p>
                  )}
                </div>
              )}

              <Button 
                className="w-full h-12 text-lg" 
                onClick={handleBook} 
                disabled={!service.available || isBooking || (user && !pendingPayment && (user.balance || 0) < service.price_per_day)}
              >
                {pendingPayment ? (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    Ödeme Beklemede
                  </>
                ) : isBooking ? (
                  "İşleniyor..."
                ) : (
                  t("services.book")
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                {pendingPayment 
                  ? "Para şu anda bloklanmış durumda. Rehber ile iletişime geçtikten sonra ödemeyi işleme alabilirsiniz."
                  : t("service.not_charged")
                }
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
