# 🏔️ ZippyGO

> **Azerbaycan'ın Doğa Yürüyüşü ve Turizm Platformu**

ZippyGO, Azerbaycan'daki en güzel yürüyüş rotalarını keşfetmenize, rehber bulmanıza, ekipman kiralamanıza ve topluluk yürüyüşlerine katılmanıza olanak sağlayan modern bir web platformudur.

🌐 **Canlı Site:** [https://unmusked-unlunar-pearlie.ngrok-free.dev/](https://unmusked-unlunar-pearlie.ngrok-free.dev/)

> ⚠️ **Not:** Site ücretsiz ngrok servisi üzerinden yayınlanmaktadır, bu nedenle performans yavaş olabilir ve bazen erişim sorunları yaşanabilir.

---

## ✨ Özellikler

### 🗺️ Yürüyüş Rotaları
- Azerbaycan'ın farklı bölgelerindeki detaylı yürüyüş rotaları
- Zorluk seviyeleri (Easy, Medium, Hard)
- Mesafe, yükseklik ve süre bilgileri
- İnteraktif harita görünümü
- Rota detay sayfaları

### 🤖 AI Asistan
- Gemini AI destekli akıllı chatbot
- Yürüyüş rotaları hakkında sorularınızı yanıtlar
- Ekipman ve rehber önerileri sunar
- Deneyim seviyenize göre kişiselleştirilmiş tavsiyeler
- Çok dilli destek (Azerbaycan, İngilizce, Türkçe)

### 👥 Topluluk Yürüyüşleri
- Diğer yürüyüşçülerle buluşun
- Topluluk yürüyüşleri oluşturun ve katılın
- Yürüyüş detaylarını paylaşın

### 🎒 Hizmetler
- **Rehberler:** Deneyimli dağ rehberleri
- **Ekipman Kiralama:** Yürüyüş için gerekli tüm ekipmanlar
- **Çocuk Bakıcıları:** Aileler için özel hizmet

### 🗺️ İnteraktif Harita
- Leaflet tabanlı interaktif harita
- Rotaları harita üzerinde görüntüleyin
- Konum bazlı arama ve filtreleme

### 🌍 Çok Dilli Destek
- Azerbaycan dili (Azərbaycan)
- İngilizce (English)
- Dinamik dil değiştirme

### 👤 Kullanıcı Özellikleri
- Kullanıcı kaydı ve girişi
- Profil sayfası
- Yürüyüş geçmişi takibi

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Node.js** v18 veya üzeri
- **npm** veya **yarn**
- **MongoDB** (veya MongoDB Atlas)
- **Gemini API Key** (AI chatbot için)

### Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd ccx
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**

`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Server Port (varsayılan: 5000)
PORT=5000

# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/zippygo
# veya MongoDB Atlas için:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zippygo

# Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Session Secret (güvenli bir random string)
SESSION_SECRET=your_session_secret_here
```

> 💡 **Gemini API Key Nasıl Alınır?**
> 1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
> 2. Google hesabınızla giriş yapın
> 3. "Create API Key" butonuna tıklayın
> 4. Oluşturulan API key'i kopyalayıp `.env` dosyanıza ekleyin

### Veritabanı Kurulumu

MongoDB'yi başlatın (yerel kurulum için):
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB Compass veya MongoDB Service'i başlatın
```

### Geliştirme Modunda Çalıştırma

```bash
npm run dev
```

Server varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.

Tarayıcınızda şu adresi açın:
```
http://localhost:5000
```

### Production Build

```bash
# Build oluştur
npm run build

# Production modunda çalıştır
npm start
```

---

## 📁 Proje Yapısı

```
ccx/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # React bileşenleri
│   │   │   ├── ChatWidget.tsx  # AI Chatbot
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/         # UI bileşenleri (shadcn/ui)
│   │   ├── pages/          # Sayfa bileşenleri
│   │   │   ├── Home.tsx
│   │   │   ├── RoutesPage.tsx
│   │   │   ├── MapPage.tsx
│   │   │   ├── CommunityPage.tsx
│   │   │   └── ...
│   │   ├── lib/            # Yardımcı kütüphaneler
│   │   │   ├── data.ts     # Rota ve servis verileri
│   │   │   ├── language.tsx
│   │   │   └── userContext.tsx
│   │   └── App.tsx
│   └── index.html
├── server/                 # Backend (Express + TypeScript)
│   ├── routes/             # API route'ları
│   │   ├── auth.ts         # Kimlik doğrulama
│   │   ├── chat.ts         # AI Chatbot API
│   │   ├── user.ts         # Kullanıcı işlemleri
│   │   └── communityHike.ts
│   ├── models/             # MongoDB modelleri
│   │   ├── User.ts
│   │   └── CommunityHike.ts
│   ├── db.ts               # Veritabanı bağlantısı
│   └── index.ts            # Server giriş noktası
├── shared/                 # Paylaşılan şemalar
│   └── schema.ts
└── package.json
```

---

## 🛠️ Teknolojiler

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool ve dev server
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Leaflet** - Interactive maps
- **React Query** - Data fetching
- **Framer Motion** - Animations

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **Passport.js** - Authentication
- **Express Session** - Session management
- **Google Gemini AI** - AI chatbot

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Çıkış
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi

### Chat
- `POST /api/chat` - AI chatbot mesaj gönderme
  ```json
  {
    "message": "Qusar bölgesinde kolay bir rota öner"
  }
  ```

### User
- `GET /api/user/profile` - Kullanıcı profili
- `PUT /api/user/profile` - Profil güncelleme

### Community Hikes
- `GET /api/community-hikes` - Tüm topluluk yürüyüşleri
- `POST /api/community-hikes` - Yeni yürüyüş oluştur
- `GET /api/community-hikes/:id` - Yürüyüş detayı
- `PUT /api/community-hikes/:id` - Yürüyüş güncelle
- `DELETE /api/community-hikes/:id` - Yürüyüş sil

---

## 🎨 Özellikler Detayı

### AI Chatbot
Sağ alt köşedeki chat ikonuna tıklayarak AI asistanına erişebilirsiniz. Chatbot:
- Yürüyüş rotaları hakkında bilgi verir
- Deneyim seviyenize göre rota önerir
- Gerekli ekipmanları önerir
- Rehber önerileri sunar
- Çok dilli destek sağlar (Azerbaycan, İngilizce, Türkçe)

### Rota Filtreleme
- Bölge bazlı filtreleme
- Zorluk seviyesi filtreleme
- Mesafe ve süre bazlı arama

### İnteraktif Harita
- Tüm rotaları harita üzerinde görüntüleme
- Marker'lara tıklayarak rota detaylarına erişim
- Zoom ve pan özellikleri

---

## 🔧 Geliştirme

### Scripts

```bash
# Geliştirme modu
npm run dev

# TypeScript type checking
npm run check

# Production build
npm run build

# Production modunda çalıştır
npm start

# Veritabanı şemasını push et
npm run db:push
```

### Port Yapılandırması

Varsayılan port `5000`'dir. Port'u değiştirmek için:

```bash
PORT=3000 npm run dev
```

veya `.env` dosyasında:
```env
PORT=3000
```

> ⚠️ **Not:** Bazı ortamlarda (özellikle Replit) sadece belirli portlar desteklenir. Port 5000 genellikle güvenli bir seçimdir.

---

## 🐛 Sorun Giderme

### Port Hatası (ENOTSUP)
Eğer `Error: listen ENOTSUP: operation not supported on socket 0.0.0.0:PORT` hatası alırsanız:

Server otomatik olarak `localhost` (127.0.0.1) adresine geçiş yapacaktır. Eğer sorun devam ederse, `.env` dosyasında port'u değiştirmeyi deneyin.

### MongoDB Bağlantı Hatası
- MongoDB servisinin çalıştığından emin olun
- `MONGODB_URI` değişkeninin doğru olduğunu kontrol edin
- MongoDB Atlas kullanıyorsanız, IP whitelist ayarlarını kontrol edin

### Gemini API Hatası
- `GEMINI_API_KEY` değişkeninin `.env` dosyasında olduğundan emin olun
- API key'in geçerli olduğunu kontrol edin
- API quota limitlerini kontrol edin

### Chat Widget Görünmüyor
- Browser console'da hata olup olmadığını kontrol edin
- `ChatWidget` component'inin `App.tsx`'e eklendiğinden emin olun
- CSS stillerinin yüklendiğini kontrol edin

---

## 📝 Lisans

MIT License

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:
1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📧 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

## 🙏 Teşekkürler

- [Google Gemini AI](https://ai.google.dev/) - AI chatbot desteği için
- [shadcn/ui](https://ui.shadcn.com/) - Harika UI component'leri için
- [Leaflet](https://leafletjs.com/) - İnteraktif haritalar için
- [Vite](https://vitejs.dev/) - Hızlı build tool için

---

**ZippyGO ile Azerbaycan'ın doğasını keşfedin! 🏔️✨**

