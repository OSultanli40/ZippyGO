import { Router, type Request, Response } from "express";
import { CommunityHike } from "../models/CommunityHike";
import { User } from "../models/User";
import mongoose from "mongoose";

const router = Router();

// TypeScript için session tipi
declare module "express-session" {
  interface SessionData {
    userId?: string;
    username?: string;
  }
}

// Middleware: Kullanıcının giriş yapmış olmasını kontrol et
function requireAuth(req: Request, res: Response, next: any) {
  if (!req.session.userId) {
    return res.status(401).json({ 
      message: "Bu işlem için giriş yapmanız gerekiyor" 
    });
  }
  next();
}

// Tüm community hike'ları listele
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("GET /api/community-hikes endpoint çağrıldı");
    console.log("CommunityHike model:", CommunityHike ? "yüklü" : "yüklenmedi");
    
    const hikes = await CommunityHike.find()
      .sort({ date: 1, time: 1 })
      .limit(50)
      .lean();
    
    console.log(`Bulunan hike sayısı: ${hikes.length}`);

    res.json({
      hikes: hikes.map(hike => ({
        id: hike._id.toString(),
        title: hike.title,
        routeId: hike.routeId,
        date: hike.date,
        time: hike.time,
        host: hike.host,
        hostId: hike.hostId,
        hostAvatar: hike.hostAvatar,
        participants: hike.participants.length,
        participantNames: hike.participants.map(p => p.userName),
        participantsList: hike.participants.map(p => ({
          userId: p.userId,
          userName: p.userName,
          userAvatar: p.userAvatar,
          joinedAt: p.joinedAt
        })),
        maxParticipants: hike.maxParticipants,
        description: hike.description,
        createdAt: hike.createdAt,
        updatedAt: hike.updatedAt
      }))
    });
  } catch (error: any) {
    console.error("Community hike listesi hatası:", error);
    console.error("Error details:", error);
    res.status(500).json({ 
      message: "Community hike'lar yüklenirken bir hata oluştu",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
});

// Belirli bir route için community hike'ları getir
router.get("/route/:routeId", async (req: Request, res: Response) => {
  try {
    const routeId = parseInt(req.params.routeId);
    
    if (isNaN(routeId)) {
      return res.status(400).json({ 
        message: "Geçersiz route ID" 
      });
    }

    const hikes = await CommunityHike.find({ routeId })
      .sort({ date: 1, time: 1 })
      .lean();

    res.json({
      hikes: hikes.map(hike => ({
        id: hike._id.toString(),
        title: hike.title,
        routeId: hike.routeId,
        date: hike.date,
        time: hike.time,
        host: hike.host,
        hostId: hike.hostId,
        hostAvatar: hike.hostAvatar,
        participants: hike.participants.length,
        participantNames: hike.participants.map(p => p.userName),
        participantsList: hike.participants.map(p => ({
          userId: p.userId,
          userName: p.userName,
          userAvatar: p.userAvatar,
          joinedAt: p.joinedAt
        })),
        maxParticipants: hike.maxParticipants,
        description: hike.description,
        createdAt: hike.createdAt,
        updatedAt: hike.updatedAt
      }))
    });
  } catch (error: any) {
    console.error("Route hike listesi hatası:", error);
    res.status(500).json({ 
      message: "Route hike'ları yüklenirken bir hata oluştu",
      error: error.message 
    });
  }
});

// Yeni community hike oluştur
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const { title, routeId, date, time, description, maxParticipants } = req.body;

    if (!title || !routeId || !date) {
      return res.status(400).json({ 
        message: "Başlık, route ID ve tarih gereklidir" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    const newHike = new CommunityHike({
      title: title.trim(),
      routeId: parseInt(routeId),
      date: date.trim(),
      time: time?.trim() || "09:00 AM",
      host: user.name,
      hostId: user._id.toString(),
      hostAvatar: user.avatar,
      maxParticipants: parseInt(maxParticipants) || 10,
      description: description?.trim() || "",
      participants: [{
        userId: user._id.toString(),
        userName: user.name,
        userAvatar: user.avatar,
        joinedAt: new Date()
      }]
    });

    await newHike.save();

    // Kullanıcının communityHikes listesine ekle
    const hikeId = newHike._id.toString();
    if (!user.communityHikes.some(ch => ch.hikeId === hikeId)) {
      user.communityHikes.push({
        hikeId: hikeId,
        joinedAt: new Date()
      });
      await user.save();
    }

    res.status(201).json({
      message: "Community hike oluşturuldu",
      hike: {
        id: newHike._id.toString(),
        title: newHike.title,
        routeId: newHike.routeId,
        date: newHike.date,
        time: newHike.time,
        host: newHike.host,
        hostId: newHike.hostId,
        hostAvatar: newHike.hostAvatar,
        participants: newHike.participants.length,
        participantNames: newHike.participants.map(p => p.userName),
        participantsList: newHike.participants.map(p => ({
          userId: p.userId,
          userName: p.userName,
          userAvatar: p.userAvatar,
          joinedAt: p.joinedAt
        })),
        maxParticipants: newHike.maxParticipants,
        description: newHike.description
      }
    });
  } catch (error: any) {
    console.error("Community hike oluşturma hatası:", error);
    res.status(500).json({ 
      message: "Community hike oluşturulurken bir hata oluştu",
      error: error.message 
    });
  }
});

// Community hike'a katıl
router.post("/:hikeId/join", requireAuth, async (req: Request, res: Response) => {
  try {
    const hikeId = req.params.hikeId;
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    const hike = await CommunityHike.findById(hikeId);

    if (!hike) {
      return res.status(404).json({ 
        message: "Community hike bulunamadı" 
      });
    }

    // Zaten katılmış mı kontrol et
    const alreadyJoined = hike.participants.some(
      p => p.userId === user._id.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({ 
        message: "Bu hike'a zaten katıldınız" 
      });
    }

    // Kapasite kontrolü
    if (hike.participants.length >= hike.maxParticipants) {
      return res.status(400).json({ 
        message: "Bu hike dolu, daha fazla katılımcı kabul edilmiyor" 
      });
    }

    // Katılımcıyı ekle
    hike.participants.push({
      userId: user._id.toString(),
      userName: user.name,
      userAvatar: user.avatar,
      joinedAt: new Date()
    });

    await hike.save();

    // Kullanıcının communityHikes listesine ekle
    if (!user.communityHikes.some(ch => ch.hikeId === hikeId)) {
      user.communityHikes.push({
        hikeId: hikeId,
        joinedAt: new Date()
      });
      await user.save();
    }

    res.json({
      message: "Community hike'a katıldınız",
      hike: {
        id: hike._id.toString(),
        title: hike.title,
        routeId: hike.routeId,
        date: hike.date,
        time: hike.time,
        host: hike.host,
        hostId: hike.hostId,
        hostAvatar: hike.hostAvatar,
        participants: hike.participants.length,
        participantNames: hike.participants.map(p => p.userName),
        participantsList: hike.participants.map(p => ({
          userId: p.userId,
          userName: p.userName,
          userAvatar: p.userAvatar,
          joinedAt: p.joinedAt
        })),
        maxParticipants: hike.maxParticipants,
        description: hike.description
      }
    });
  } catch (error: any) {
    console.error("Community hike'a katılma hatası:", error);
    res.status(500).json({ 
      message: "Community hike'a katılırken bir hata oluştu",
      error: error.message 
    });
  }
});

// Community hike'dan ayrıl
router.post("/:hikeId/leave", requireAuth, async (req: Request, res: Response) => {
  try {
    const hikeId = req.params.hikeId;
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    const hike = await CommunityHike.findById(hikeId);

    if (!hike) {
      return res.status(404).json({ 
        message: "Community hike bulunamadı" 
      });
    }

    // Host ayrılamaz
    if (hike.hostId === user._id.toString()) {
      return res.status(400).json({ 
        message: "Host olarak hike'dan ayrılamazsınız. Hike'ı silmek istiyorsanız farklı bir işlem kullanın." 
      });
    }

    // Katılımcıyı çıkar
    hike.participants = hike.participants.filter(
      p => p.userId !== user._id.toString()
    );

    await hike.save();

    // Kullanıcının communityHikes listesinden çıkar
    user.communityHikes = user.communityHikes.filter(
      ch => ch.hikeId !== hikeId
    );
    await user.save();

    res.json({
      message: "Community hike'dan ayrıldınız"
    });
  } catch (error: any) {
    console.error("Community hike'dan ayrılma hatası:", error);
    res.status(500).json({ 
      message: "Community hike'dan ayrılırken bir hata oluştu",
      error: error.message 
    });
  }
});

// Community hike'ı sil (sadece host)
router.delete("/:hikeId", requireAuth, async (req: Request, res: Response) => {
  try {
    const hikeId = req.params.hikeId;
    const hike = await CommunityHike.findById(hikeId);

    if (!hike) {
      return res.status(404).json({ 
        message: "Community hike bulunamadı" 
      });
    }

    // Sadece host silebilir
    if (hike.hostId !== req.session.userId) {
      return res.status(403).json({ 
        message: "Bu hike'ı silmek için yetkiniz yok" 
      });
    }

    await CommunityHike.findByIdAndDelete(hikeId);

    res.json({
      message: "Community hike silindi"
    });
  } catch (error: any) {
    console.error("Community hike silme hatası:", error);
    res.status(500).json({ 
      message: "Community hike silinirken bir hata oluştu",
      error: error.message 
    });
  }
});

// Test endpoint'i: Collection'ın varlığını kontrol et
router.get("/test-collection", async (req: Request, res: Response) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    const communityHikesCollectionExists = collectionNames.includes("communityhikes");

    // Model bilgileri
    const modelName = CommunityHike.modelName;
    const collectionName = CommunityHike.collection.name;
    
    // Collection'daki kayıt sayısı
    const count = await CommunityHike.countDocuments();

    res.json({
      message: "Collection kontrolü yapıldı",
      communityHikesCollectionExists,
      allCollections: collectionNames,
      modelName,
      collectionName,
      documentCount: count,
      mongooseConnected: mongoose.connection.readyState === 1
    });
  } catch (error: any) {
    console.error("Collection kontrol hatası:", error);
    res.status(500).json({
      message: "Collection kontrolü sırasında bir hata oluştu",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
});

export default router;

