import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'az';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.routes": "Routes",
    "nav.map": "Map",
    "nav.profile": "Profile",
    "nav.safety": "Safety",
    "nav.services": "Services",
    "nav.community": "Community",
    
    "home.hero.title": "Find Your Path \n In The Mountains",
    "home.hero.subtitle": "Explore the best hiking trails, track your adventures, and connect with a community of nature lovers.",
    "home.hero.explore": "Explore Routes",
    "home.hero.map": "View Map",
    "home.featured.title": "Featured Trails",
    "home.featured.subtitle": "Hand-picked routes for your next weekend adventure.",
    "home.services.title": "Expert Guides & Services",
    "home.services.subtitle": "Enhance your adventure with professional support.",
    
    "routes.title": "Explore Routes",
    "routes.subtitle": "Find your next adventure among Azerbaijan's most beautiful trails.",
    "routes.search": "Search routes or regions...",
    "routes.filter.difficulty": "Difficulty",
    "routes.filter.region": "Region",
    "routes.filter.distance": "Max Distance",
    "routes.empty": "No routes found",
    
    "services.title": "Services & Rentals",
    "services.subtitle": "Hire guides, babysitters, or rent equipment for your trip.",
    "services.tab.guides": "Guides",
    "services.tab.babysitters": "Babysitters",
    "services.tab.equipment": "Equipment",
    "services.book": "Book Now",
    "services.per_day": "/ day",
    "services.available": "Available",
    "services.booked": "Booked",
    "services.verified": "Verified Professional",
    
    "community.title": "Community Hikes",
    "community.subtitle": "Join scheduled group hikes and meet fellow adventurers.",
    "community.create": "Create Hike",
    "community.join": "Join Hike",
    "community.full": "Full",
    "community.joined": "Joined",
    "community.participants": "participants",
    "community.hosted_by": "Hosted by",
    
    "profile.badges": "Badges",
    "profile.history": "Hike History",
    "profile.hikes": "Hikes",
    "profile.kilometers": "Kilometers",
    "profile.elevation": "Elevation",
    "profile.earned": "Earned",
    "profile.progress": "progress",
    
    "footer.rights": "© 2025 HikeAZ. All rights reserved.",
    "footer.made_with": "Designed with ♥️ in Azerbaijan"
  },
  az: {
    "nav.home": "Ana Səhifə",
    "nav.routes": "Marşrutlar",
    "nav.map": "Xəritə",
    "nav.profile": "Profil",
    "nav.safety": "Təhlükəsizlik",
    "nav.services": "Xidmətlər",
    "nav.community": "İcma",
    
    "home.hero.title": "Dağlarda Öz \n Yolunu Tap",
    "home.hero.subtitle": "Ən yaxşı yürüş yollarını kəşf edin, macəralarınızı izləyin və təbiətsevərlər icmasına qoşulun.",
    "home.hero.explore": "Marşrutları Kəşf Et",
    "home.hero.map": "Xəritəyə Bax",
    "home.featured.title": "Seçilmiş Yollar",
    "home.featured.subtitle": "Növbəti həftəsonu macəranız üçün seçilmiş marşrutlar.",
    "home.services.title": "Ekspert Bələdçilər və Xidmətlər",
    "home.services.subtitle": "Macəranızı peşəkar dəstək ilə zənginləşdirin.",
    
    "routes.title": "Marşrutları Kəşf Et",
    "routes.subtitle": "Azərbaycanın ən gözəl cığırları arasında növbəti macəranızı tapın.",
    "routes.search": "Marşrut və ya region axtar...",
    "routes.filter.difficulty": "Çətinlik",
    "routes.filter.region": "Region",
    "routes.filter.distance": "Maks Məsafə",
    "routes.empty": "Marşrut tapılmadı",
    
    "services.title": "Xidmətlər və İcarə",
    "services.subtitle": "Səfəriniz üçün bələdçi, dayə tutun və ya avadanlıq icarəyə götürün.",
    "services.tab.guides": "Bələdçilər",
    "services.tab.babysitters": "Dayələr",
    "services.tab.equipment": "Avadanlıq",
    "services.book": "İndi Bron Et",
    "services.per_day": "/ gün",
    "services.available": "Mövcuddur",
    "services.booked": "Məşğuldur",
    "services.verified": "Təsdiqlənmiş Peşəkar",
    
    "community.title": "İcma Yürüşləri",
    "community.subtitle": "Planlaşdırılmış qrup yürüşlərinə qoşulun və digər macəraçılarla tanış olun.",
    "community.create": "Yürüş Yarat",
    "community.join": "Qoşul",
    "community.full": "Dolu",
    "community.joined": "Qoşuldu",
    "community.participants": "iştirakçı",
    "community.hosted_by": "Təşkilatçı:",
    
    "profile.badges": "Nişanlar",
    "profile.history": "Yürüş Tarixçəsi",
    "profile.hikes": "Yürüşlər",
    "profile.kilometers": "Kilometr",
    "profile.elevation": "Hündürlük",
    "profile.earned": "Qazanılıb",
    "profile.progress": "irəliləyiş",
    
    "footer.rights": "© 2025 HikeAZ. Bütün hüquqlar qorunur.",
    "footer.made_with": "Azərbaycanda ♥️ ilə hazırlanıb"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
