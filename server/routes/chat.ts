import { Router, type Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

// Gemini API key'i environment variable'dan al
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!GEMINI_API_KEY) {
  console.warn("⚠️  GEMINI_API_KEY environment variable'ı ayarlanmamış!");
}

// Gemini AI instance'ı oluştur
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

// Tüm route ve service verileri - tüm bölgeler için
const routes = [
  { id: 1, name: "Xinaliq to Galakhudat", region: "Gusar", difficulty: "Easy", distance_km: 8.4, elevation_m: 297, duration_hours: 2.5, description: "High-altitude trek between ancient mountain villages above the clouds." },
  { id: 2, name: "Candy Cane Mountains", region: "Khizi", difficulty: "Easy", distance_km: 4.0, elevation_m: 220, duration_hours: 1.5, description: "Surreal landscape of red and white striped clay hills." },
  { id: 3, name: "Yeddi Gozel Waterfall", region: "Gabala", difficulty: "Medium", distance_km: 6.8, elevation_m: 380, duration_hours: 3, description: "Forest trail leading to the famous 'Seven Beauties' waterfalls." },
  { id: 4, name: "Muju–Lahic Trail", region: "Ismayilli", difficulty: "Hard", distance_km: 10.6, elevation_m: 957, duration_hours: 5.5, description: "A culturally rich trail connecting Muju and Lahic villages." },
  { id: 5, name: "Shahdag Trail (Laza → Shahdag)", region: "Gusar", difficulty: "Hard", distance_km: 11.2, elevation_m: 1250, duration_hours: 6, description: "A challenging high-mountain trek from Laza village to Shahdag peak." },
  { id: 6, name: "Tufandag Mountain Trail", region: "Gusar", difficulty: "Medium", distance_km: 7.5, elevation_m: 680, duration_hours: 3.5, description: "A scenic route around the slopes of Tufandag." },
  { id: 7, name: "Lake Goygol Loop", region: "Goygol", difficulty: "Easy", distance_km: 5.2, elevation_m: 150, duration_hours: 2, description: "Peaceful walk around the azure lake surrounded by lush forest." },
  { id: 8, name: "Gizil Gaya Route", region: "Guba", difficulty: "Hard", distance_km: 12.4, elevation_m: 980, duration_hours: 6.5, description: "A demanding climb to the legendary 'Golden Rock'." },
  { id: 9, name: "Chirag Gala Trail", region: "Shabran", difficulty: "Medium", distance_km: 8.8, elevation_m: 510, duration_hours: 3.5, description: "A historical route from Laza waterfalls to the ancient fortress of Chirag Gala." },
  { id: 10, name: "Babadağ Mountain Hike", region: "Gabala", difficulty: "Hard", distance_km: 13.0, elevation_m: 1320, duration_hours: 7, description: "A sacred and iconic summit hike in Azerbaijan." },
  { id: 11, name: "Surkhaykhan Mountain", region: "Oguz", difficulty: "Medium", distance_km: 7.8, elevation_m: 640, duration_hours: 4, description: "A scenic peak overlooking Oguz valleys." },
  { id: 12, name: "Durja Mountain Trail", region: "Gabala", difficulty: "Medium", distance_km: 6.5, elevation_m: 540, duration_hours: 3, description: "A pleasant mountain hike with forested approaches." },
  { id: 13, name: "Kish Mountain Path", region: "Sheki", difficulty: "Easy", distance_km: 5.2, elevation_m: 260, duration_hours: 2, description: "A gentle route from Sheki to the historical Kish village." },
  { id: 14, name: "Mamrukh Mountain Trail", region: "Zaqatala", difficulty: "Medium", distance_km: 9.5, elevation_m: 620, duration_hours: 4.5, description: "A popular mountain path starting from Mamrukh village." },
  { id: 15, name: "Pirgulu Mountain Trail", region: "Shamakhi", difficulty: "Medium", distance_km: 7.0, elevation_m: 430, duration_hours: 3, description: "A forested trail inside Pirgulu National Park." },
  { id: 16, name: "Diri Baba → Red Bridge Trail", region: "Shamakhi", difficulty: "Easy", distance_km: 4.8, elevation_m: 160, duration_hours: 1.5, description: "A gentle hiking route starting from the Diri Baba Mausoleum." },
  { id: 17, name: "Niyaldag Mountain Hike", region: "Ismayilli", difficulty: "Medium", distance_km: 10.2, elevation_m: 710, duration_hours: 4.5, description: "A scenic ridge hike across the Niyaldag range." },
  { id: 18, name: "Kapaz Mountain Hike", region: "Goygol", difficulty: "Hard", distance_km: 14.0, elevation_m: 1250, duration_hours: 7, description: "A demanding climb to the iconic Kapaz peak." },
  { id: 19, name: "Murovdag Foothills", region: "Dashkasan", difficulty: "Medium", distance_km: 9.8, elevation_m: 540, duration_hours: 4.5, description: "A foothill hike along the Murovdag mountain chain." },
  { id: 20, name: "Gadabay Forest & Mountain Trails", region: "Gadabay", difficulty: "Easy", distance_km: 5.0, elevation_m: 250, duration_hours: 2, description: "Gentle forest trails around the famous Narzan springs." },
  { id: 21, name: "Ganja → Maralgol Trail", region: "Goygol", difficulty: "Medium", distance_km: 7.6, elevation_m: 410, duration_hours: 3, description: "A scenic route around Maralgol Lake." },
  { id: 26, name: "Ilandag Foothills", region: "Nakhchivan", difficulty: "Medium", distance_km: 6.8, elevation_m: 530, duration_hours: 3, description: "A hike around the base of the iconic snake-shaped mountain." },
  { id: 28, name: "Batabat Plateau → Lake Loop", region: "Nakhchivan", difficulty: "Easy", distance_km: 4.0, elevation_m: 160, duration_hours: 1.5, description: "A calm lakeside route in the famous Batabat plateau." },
  { id: 29, name: "Gapijig Mountain Foothills", region: "Nakhchivan", difficulty: "Medium", distance_km: 7.3, elevation_m: 540, duration_hours: 3, description: "A peaceful route along the foothills of Gapijig Mountain." },
  { id: 30, name: "Ilisu Waterfall Trail", region: "Gakh", difficulty: "Medium", distance_km: 5.8, elevation_m: 360, duration_hours: 3, description: "A forest trail leading to the Ilisu waterfall." },
];

const services = [
  { type: "Guide", name: "Elvin Mammadov", description: "Certified mountain guide with 10 years experience in the Greater Caucasus.", price_per_day: 50, rating: 4.9 },
  { type: "Guide", name: "Sarah Aliyeva", description: "Expert in high-altitude trekking and wilderness survival skills.", price_per_day: 60, rating: 5.0 },
  { type: "Guide", name: "Tyrane Slick", description: "Experienced alpine guide specializing in challenging mountain routes.", price_per_day: 55, rating: 4.8 },
  { type: "Guide", name: "Vladimir Alexandrovich", description: "Professional mountaineer with international expedition experience.", price_per_day: 65, rating: 4.9 },
  { type: "Guide", name: "Jack Black", description: "Friendly and knowledgeable guide perfect for groups and beginners.", price_per_day: 45, rating: 4.7 },
  { type: "Guide", name: "Zahid Qubadov", description: "Local guide with deep knowledge of Azerbaijan's hidden trails.", price_per_day: 52, rating: 4.9 },
  { type: "Guide", name: "Leyla Rafullayeva", description: "Expert guide specializing in cultural and nature photography hikes.", price_per_day: 58, rating: 5.0 },
  { type: "Guide", name: "Tofiq Haciyev", description: "Seasoned mountain guide with expertise in wildlife and bird watching.", price_per_day: 48, rating: 4.8 },
  { type: "Guide", name: "Sabir Ahmadov", description: "Professional guide with strong focus on safety and group management.", price_per_day: 50, rating: 4.9 },
  { type: "Babysitter", name: "Leyla Karimova", description: "Nature-loving babysitter who organizes outdoor games for kids while you hike.", price_per_day: 35, rating: 4.8 },
  { type: "Babysitter", name: "Qerenfil Huseynova", description: "Experienced childcare provider with a warm and nurturing approach.", price_per_day: 32, rating: 4.9 },
  { type: "Babysitter", name: "Tenzile Agakshiyeva", description: "Energetic babysitter who keeps kids active and engaged outdoors.", price_per_day: 30, rating: 4.7 },
  { type: "Babysitter", name: "Sara Axundova", description: "Professional babysitter with first aid certification and child psychology background.", price_per_day: 38, rating: 5.0 },
  { type: "Babysitter", name: "Medine Ceferova", description: "Gentle and caring babysitter perfect for younger children and toddlers.", price_per_day: 33, rating: 4.8 },
  { type: "Babysitter", name: "Mary Anne", description: "Bilingual babysitter with international childcare experience.", price_per_day: 40, rating: 4.9 },
  { type: "Babysitter", name: "Elnare Haciyeva", description: "Creative babysitter who organizes arts and crafts activities for children.", price_per_day: 36, rating: 4.8 },
  { type: "Babysitter", name: "Amy Jane", description: "Friendly and reliable babysitter with flexible scheduling.", price_per_day: 34, rating: 4.7 },
  { type: "Equipment", name: "Pro Hiker Backpack (50L)", description: "Lightweight, waterproof backpack suitable for multi-day treks.", price_per_day: 15, rating: 4.7 },
  { type: "Equipment", name: "Alpine Trekking Boots", description: "Sturdy boots with excellent ankle support for rugged terrain.", price_per_day: 12, rating: 4.6 },
  { type: "Equipment", name: "2-Person Tent", description: "Easy to set up, weather-resistant tent for camping trips.", price_per_day: 25, rating: 4.8 },
  { type: "Equipment", name: "Sleeping Bag", description: "Warm and comfortable sleeping bag for overnight camping adventures.", price_per_day: 10, rating: 4.7 },
  { type: "Equipment", name: "Lightweight Daypack (20L)", description: "Affordable daypack perfect for short hikes and day trips.", price_per_day: 8, rating: 4.5 },
  { type: "Equipment", name: "Heavy Duty Teton Rucksack", description: "Durable and spacious rucksack for extended hiking expeditions.", price_per_day: 18, rating: 4.9 },
  { type: "Equipment", name: "Hiking Visor", description: "UV-protective visor to keep sun out of your eyes on bright trails.", price_per_day: 5, rating: 4.6 },
  { type: "Equipment", name: "Premium Hiking Gloves", description: "High-quality gloves with superior grip and weather protection.", price_per_day: 7, rating: 4.8 },
  { type: "Equipment", name: "Budget Hiking Gloves", description: "Affordable gloves perfect for casual hiking and warm weather.", price_per_day: 4, rating: 4.4 },
  { type: "Equipment", name: "Hiking Headlamp", description: "Bright LED headlamp for early morning starts and night hikes.", price_per_day: 6, rating: 4.7 },
  { type: "Equipment", name: "Salomon Quest Hiking Boots", description: "Premium hiking boots with advanced traction and ankle support.", price_per_day: 15, rating: 4.9 },
  { type: "Equipment", name: "Complete Hiking Rope Kit", description: "Professional rope kit with all necessary safety equipment.", price_per_day: 20, rating: 4.8 },
  { type: "Equipment", name: "Hiking Ropes Set", description: "Reliable rope set for basic climbing and safety purposes.", price_per_day: 12, rating: 4.6 },
  { type: "Equipment", name: "Bendable Hiking Pole", description: "Adjustable and collapsible hiking pole for extra support on trails.", price_per_day: 5, rating: 4.5 },
  { type: "Equipment", name: "Budget Hiking Pickaxe", description: "Affordable pickaxe for basic ice and snow conditions.", price_per_day: 10, rating: 4.3 },
  { type: "Equipment", name: "Premium Mountaineering Ice Axe", description: "Professional-grade ice axe for advanced mountaineering.", price_per_day: 18, rating: 4.9 },
  { type: "Equipment", name: "Complete Quality Hiking Kit", description: "All-in-one premium hiking equipment package.", price_per_day: 45, rating: 5.0 },
];

console.log(`✅ Chat context yüklendi: ${routes.length} tur, ${services.length} servis`);

// Context hazırla - turlar ve servisler hakkında bilgi
function getSystemContext() {
  const routesInfo = routes
    .map(
      (route) =>
        `- ${route.name} (${route.region}): ${route.difficulty} zorluk, ${route.distance_km}km, ${route.elevation_m}m yükseklik, ${route.duration_hours} saat. ${route.description}`
    )
    .join("\n");

  const guides = services
    .filter((s) => s.type === "Guide")
    .map(
      (guide) =>
        `- ${guide.name}: ${guide.description}, ${guide.price_per_day} AZN/gün, ${guide.rating} yıldız`
    )
    .join("\n");

  const equipment = services
    .filter((s) => s.type === "Equipment")
    .map(
      (eq) =>
        `- ${eq.name}: ${eq.description}, ${eq.price_per_day} AZN/gün, ${eq.rating} yıldız`
    )
    .join("\n");

  return `Sen ZippyGO adlı bir dağ yürüyüşü ve doğa turizmi platformunun yardımcı asistanısın. Kullanıcılara turlar, rehberler ve ekipmanlar hakkında bilgi veriyorsun.

MEVCUT TURLAR:
${routesInfo}

MEVCUT REHBERLER:
${guides}

MEVCUT EKİPMANLAR:
${equipment}

ÖNEMLİ DİL KURALLARI:
1. Kullanıcının mesajının dilini algıla ve AYNI DİLDE yanıt ver
2. Eğer kullanıcı Azerbaycanca (Azərbaycan, Qusar, Ismayilli, Gabala gibi kelimeler veya Azerbaycan alfabesi) yazıyorsa, Azerbaycanca yanıt ver
3. Eğer kullanıcı İngilizce yazıyorsa, İngilizce yanıt ver
4. Eğer kullanıcı Türkçe yazıyorsa, Türkçe yanıt ver
5. Kullanıcının kullandığı dil tonunu ve stilini takip et

GÖREVLERİN:
1. Kullanıcıların deneyim seviyelerine ve ihtiyaçlarına göre uygun turlar öner
2. Ekipman ihtiyaçlarını değerlendir ve gerekli ekipmanları öner
3. Uygun rehberler öner
4. Kullanıcının dilinde yanıt ver (Azerbaycanca, İngilizce veya Türkçe)
5. Samimi ve yardımcı bir ton kullan
6. Kullanıcı deneyimsizse veya ekipmanı yoksa, kolay turlar öner ve kiralama seçeneklerini belirt

ÖRNEK YANITLAR:

1. Kullanıcı "Qusar'a gitmek istiyorum ama deneyimim yok ve ekipmanım yok" derse:
"Qusar (Gusar) bölgesinde size uygun 3 tur var. Deneyim seviyeniz ve ekipman durumunuz göz önüne alındığında, 'Xinaliq to Galakhudat' turunu öneriyorum. Bu tur Easy (Kolay) seviyede, 8.4km uzunluğunda ve yaklaşık 2.5 saat sürüyor. 

Ekipman konusunda endişelenmeyin! Bu tür için sadece bir sırt çantası ve iyi bir çift bot yeterli. Size şu ekipmanları kiralama olarak önerebilirim:
- Lightweight Daypack (20L): 8 AZN/gün - Günlük yürüyüşler için ideal
- Salomon Quest Hiking Boots: 15 AZN/gün - Mükemmel tutuş ve ayak bileği desteği

Ayrıca, ilk kez gidiyorsanız bir rehber ile gitmenizi öneririm. Jack Black gibi deneyimli ve başlangıç seviyesindeki yürüyüşçüler için mükemmel bir rehber var (45 AZN/gün).

Başka bir sorunuz var mı?"

2. Kullanıcı "Ismayilli bölgesi hakkında bilgi ver" veya "Ismayilli'de neler var" derse:
"Ismayilli bölgesinde 2 harika tur bulunuyor:

1. **Muju–Lahic Trail** (Hard - Zor): Bu kültürel açıdan zengin bir rota, Muju ve Lahic köylerini birleştiriyor. 10.6km uzunluğunda, 957m yükseklik farkı var ve yaklaşık 5.5 saat sürüyor. Muju köyü bir zamanlar Dağ Yahudileri tarafından meskun edilmişti. Lahic ise Tat halkının tarihi bir zanaat kasabası. Rota dağ yamaçları, geleneksel köyler ve manzaralı peyzajlar arasından geçiyor.

2. **Niyaldag Mountain Hike** (Medium - Orta): Niyaldag sırtı boyunca manzaralı bir yürüyüş. 10.2km uzunluğunda, 710m yükseklik farkı var ve yaklaşık 4.5 saat sürüyor. Geniş açık çayırlar ve dağ manzaraları sunuyor, Muju–Lahic bölgesini birleştiriyor.

Ismayilli bölgesi kültürel zenginliği ve doğal güzellikleriyle ünlüdür. Hangi tur size daha uygun görünüyor?"`;
}

// Chat endpoint'i
router.post("/", async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        message: "Mesaj gereklidir",
      });
    }

    if (!genAI) {
      return res.status(500).json({
        message: "AI servisi şu anda kullanılamıyor. Lütfen GEMINI_API_KEY environment variable'ını ayarlayın.",
      });
    }

    // Gemini API model adı - environment variable'dan al veya varsayılan kullan
    // Model adını "models/" prefix'i olmadan kullan
    let modelName = GEMINI_MODEL;
    if (modelName.startsWith("models/")) {
      modelName = modelName.replace("models/", "");
    }
    
    const model = genAI.getGenerativeModel({ model: modelName });

    // System context'i hazırla
    const systemContext = getSystemContext();

    // Konuşma geçmişini formatla
    const historyText = conversationHistory
      .map((msg: { role: string; content: string }) => {
        if (msg.role === "user") {
          return `Kullanıcı: ${msg.content}`;
        } else {
          return `Asistan: ${msg.content}`;
        }
      })
      .join("\n\n");

    // Kullanıcının dilini algıla (basit kontrol)
    const isAzerbaijani = /[əğüöşçı]/i.test(message) || 
                          /\b(azərbaycan|qusar|ismayilli|gabala|goygol|sheki|zaqatala|shamakhi|nakhchivan|gakh|gadabay|dashkasan|oguz|khizi|guba|shabran)\b/i.test(message);
    const isEnglish = /^[a-zA-Z\s.,!?'-]+$/.test(message) && message.length > 0 && !isAzerbaijani;
    
    // Dil talimatı ekle
    const languageInstruction = isAzerbaijani 
      ? "Kullanıcı Azerbaycanca yazıyor. Lütfen Azerbaycanca yanıt ver."
      : isEnglish
      ? "The user is writing in English. Please respond in English."
      : "Kullanıcı Türkçe yazıyor. Lütfen Türkçe yanıt ver.";

    // Tam prompt'u oluştur
    const fullPrompt = `${systemContext}

${languageInstruction}

${historyText ? `ÖNCEKİ KONUŞMA:\n${historyText}\n\n` : ""}Kullanıcı: ${message}

Asistan:`;

    // Gemini API'ye istek gönder
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      message: text,
    });
  } catch (error: any) {
    console.error("Chat hatası:", error);
    res.status(500).json({
      message: "Chat yanıtı oluşturulurken bir hata oluştu",
      error: error.message,
    });
  }
});

// Debug endpoint - farklı model adlarını test et
router.get("/test-models", async (req: Request, res: Response) => {
  if (!genAI) {
    return res.status(500).json({
      message: "AI servisi şu anda kullanılamıyor. Lütfen GEMINI_API_KEY environment variable'ını ayarlayın.",
    });
  }

  // Farklı model adlarını test et
  const testModels = [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-2.0-flash-exp",
  ];
  
  const results: any[] = [];

  for (const modelName of testModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Test");
      const response = await result.response;
      results.push({
        model: modelName,
        status: "success",
        response: response.text().substring(0, 50) + "...",
      });
    } catch (error: any) {
      results.push({
        model: modelName,
        status: "error",
        error: error.message,
      });
    }
  }

  res.json({
    currentModel: GEMINI_MODEL,
    testResults: results,
  });
});

export default router;

