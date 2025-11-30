import { Router, type Request, Response } from "express";
import { User } from "../models/User";

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

// Tamamlanan hike'ı ekle/güncelle
router.post("/complete-hike", requireAuth, async (req: Request, res: Response) => {
  try {
    const { routeId, distance, elevation, difficulty } = req.body;

    if (!routeId || distance === undefined || elevation === undefined || !difficulty) {
      return res.status(400).json({ 
        message: "routeId, distance, elevation ve difficulty gereklidir" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    // Eğer zaten tamamlanmışsa, güncelleme yapma
    if (user.completedHikes.includes(routeId)) {
      return res.json({
        message: "Bu hike zaten tamamlanmış",
        user: {
          id: user._id.toString(),
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          completedHikes: user.completedHikes,
          communityHikes: user.communityHikes,
          badges: user.badges,
          totalKm: user.totalKm,
          totalElevation: user.totalElevation,
          challengePoints: user.challengePoints,
          isInChallenge: user.isInChallenge
        }
      });
    }

    // Yeni hike'ı ekle
    user.completedHikes.push(routeId);
    user.totalKm = parseFloat((user.totalKm + distance).toFixed(1));
    user.totalElevation = user.totalElevation + elevation;

    // Challenge points ekle (eğer challenge'a katılmışsa)
    if (user.isInChallenge) {
      // Zorluk seviyesine göre multiplier hesapla
      let multiplier = 10;
      if (difficulty === "Medium") {
        multiplier = 11;
      } else if (difficulty === "Hard") {
        multiplier = 13;
      }
      
      // Points = distance * multiplier (yuvarlanmış)
      const pointsEarned = Math.round(distance * multiplier);
      user.challengePoints = (user.challengePoints || 0) + pointsEarned;
    }

    // Badge kontrolü
    const hikeCount = user.completedHikes.length;
    let earnedBadge = null;

    if (hikeCount === 1) {
      const badgeIndex = user.badges.findIndex(b => b.id === 'starter');
      if (badgeIndex !== -1 && !user.badges[badgeIndex].earned) {
        user.badges[badgeIndex].earned = true;
        user.badges[badgeIndex].dateEarned = new Date().toISOString().split('T')[0];
        earnedBadge = user.badges[badgeIndex].name;
      }
    } else if (hikeCount === 3) {
      const badgeIndex = user.badges.findIndex(b => b.id === 'trailblazer');
      if (badgeIndex !== -1 && !user.badges[badgeIndex].earned) {
        user.badges[badgeIndex].earned = true;
        user.badges[badgeIndex].dateEarned = new Date().toISOString().split('T')[0];
        earnedBadge = user.badges[badgeIndex].name;
      }
    } else if (hikeCount >= 5) {
      const badgeIndex = user.badges.findIndex(b => b.id === 'mountain-pro');
      if (badgeIndex !== -1 && !user.badges[badgeIndex].earned) {
        user.badges[badgeIndex].earned = true;
        user.badges[badgeIndex].dateEarned = new Date().toISOString().split('T')[0];
        earnedBadge = user.badges[badgeIndex].name;
      }
    }

    await user.save();

    res.json({
      message: "Hike tamamlandı",
      earnedBadge,
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        completedHikes: user.completedHikes,
        communityHikes: user.communityHikes,
        badges: user.badges,
        totalKm: user.totalKm,
        totalElevation: user.totalElevation,
        challengePoints: user.challengePoints,
        isInChallenge: user.isInChallenge,
        balance: user.balance || 0,
        pendingPayments: user.pendingPayments || []
      }
    });
  } catch (error: any) {
    console.error("Complete hike hatası:", error);
    res.status(500).json({ 
      message: "Hike tamamlanırken bir hata oluştu",
      error: error.message 
    });
  }
});

// Kullanıcı bilgilerini güncelle
router.put("/update", requireAuth, async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    if (name) user.name = name.trim();
    if (email) user.email = email.trim().toLowerCase();
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      message: "Kullanıcı bilgileri güncellendi",
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        completedHikes: user.completedHikes,
        communityHikes: user.communityHikes,
        badges: user.badges,
        totalKm: user.totalKm,
        totalElevation: user.totalElevation,
        challengePoints: user.challengePoints,
        isInChallenge: user.isInChallenge,
        balance: user.balance || 0,
        pendingPayments: user.pendingPayments || []
      }
    });
  } catch (error: any) {
    console.error("Update user hatası:", error);
    res.status(500).json({ 
      message: "Kullanıcı bilgileri güncellenirken bir hata oluştu",
      error: error.message 
    });
  }
});

// Challenge'a katıl
router.post("/join-challenge", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    if (user.isInChallenge) {
      return res.status(400).json({ 
        message: "Zaten challenge'a katıldınız" 
      });
    }

    user.isInChallenge = true;
    user.challengePoints = 0; // Başlangıç puanı
    await user.save();

    res.json({
      message: "Challenge'a başarıyla katıldınız",
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        completedHikes: user.completedHikes,
        communityHikes: user.communityHikes,
        badges: user.badges,
        totalKm: user.totalKm,
        totalElevation: user.totalElevation,
        challengePoints: user.challengePoints,
        isInChallenge: user.isInChallenge,
        balance: user.balance || 0,
        pendingPayments: user.pendingPayments || []
      }
    });
  } catch (error: any) {
    console.error("Join challenge hatası:", error);
    res.status(500).json({ 
      message: "Challenge'a katılırken bir hata oluştu",
      error: error.message 
    });
  }
});

// Leaderboard'ı getir
router.get("/leaderboard", async (req: Request, res: Response) => {
  try {
    // Challenge'a katılmış kullanıcıları points'e göre sırala
    const users = await User.find({ isInChallenge: true })
      .select("name challengePoints avatar username")
      .sort({ challengePoints: -1 })
      .limit(10)
      .lean();

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user._id.toString(),
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      points: user.challengePoints || 0
    }));

    res.json({
      leaderboard
    });
  } catch (error: any) {
    console.error("Leaderboard hatası:", error);
    res.status(500).json({ 
      message: "Leaderboard yüklenirken bir hata oluştu",
      error: error.message 
    });
  }
});

// Wallet: Balance ekle
router.post("/wallet/add", requireAuth, async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        message: "Geçerli bir miktar giriniz" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    user.balance = (user.balance || 0) + amount;
    await user.save();

    // Güncellenmiş user bilgisini döndür
    res.json({
      message: "Bakiye başarıyla eklendi",
      balance: user.balance,
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        completedHikes: user.completedHikes,
        communityHikes: user.communityHikes,
        badges: user.badges,
        totalKm: user.totalKm,
        totalElevation: user.totalElevation,
        challengePoints: user.challengePoints,
        isInChallenge: user.isInChallenge,
        balance: user.balance || 0,
        pendingPayments: user.pendingPayments || []
      }
    });
  } catch (error: any) {
    console.error("Add balance hatası:", error);
    res.status(500).json({ 
      message: "Bakiye eklenirken bir hata oluştu",
      error: error.message 
    });
  }
});

// Wallet: Balance'ı getir
router.get("/wallet/balance", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    res.json({
      balance: user.balance || 0,
      pendingPayments: user.pendingPayments || []
    });
  } catch (error: any) {
    console.error("Get balance hatası:", error);
    res.status(500).json({ 
      message: "Bakiye alınırken bir hata oluştu",
      error: error.message 
    });
  }
});

// Service booking: Balance'dan para blokla
router.post("/wallet/hold", requireAuth, async (req: Request, res: Response) => {
  try {
    const { serviceId, serviceName, amount, type } = req.body;

    if (!serviceId || !serviceName || !amount || !type) {
      return res.status(400).json({ 
        message: "Tüm alanlar gereklidir" 
      });
    }

    if (amount <= 0) {
      return res.status(400).json({ 
        message: "Geçerli bir miktar giriniz" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    const availableBalance = (user.balance || 0) - 
      (user.pendingPayments || [])
        .filter(p => p.status === "pending" || p.status === "processing")
        .reduce((sum, p) => sum + p.amount, 0);

    if (availableBalance < amount) {
      return res.status(400).json({ 
        message: "Yetersiz bakiye. Lütfen cüzdanınıza para ekleyin.",
        availableBalance,
        requiredAmount: amount
      });
    }

    // Pending payment ekle
    const pendingPayment = {
      serviceId,
      serviceName,
      amount,
      type,
      bookedAt: new Date(),
      status: "pending" as const
    };

    user.pendingPayments = [...(user.pendingPayments || []), pendingPayment];
    await user.save();

    res.json({
      message: "Ödeme bloklandı. Rehber ile iletişime geçtikten sonra ödemeyi işleme alabilirsiniz.",
      balance: user.balance,
      pendingPayment,
      availableBalance: availableBalance - amount
    });
  } catch (error: any) {
    console.error("Hold payment hatası:", error);
    res.status(500).json({ 
      message: "Ödeme bloklanırken bir hata oluştu",
      error: error.message 
    });
  }
});

// Process payment: Pending payment'ı tamamla
router.post("/wallet/process-payment", requireAuth, async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ 
        message: "Ödeme ID gereklidir" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    const payment = user.pendingPayments?.find(
      p => p.serviceId === paymentId && (p.status === "pending" || p.status === "processing")
    );

    if (!payment) {
      return res.status(404).json({ 
        message: "Bekleyen ödeme bulunamadı" 
      });
    }

    // Balance'dan düş
    if ((user.balance || 0) < payment.amount) {
      return res.status(400).json({ 
        message: "Yetersiz bakiye" 
      });
    }

    user.balance = (user.balance || 0) - payment.amount;
    payment.status = "completed";
    await user.save();

    res.json({
      message: "Ödeme başarıyla işlendi",
      balance: user.balance,
      payment
    });
  } catch (error: any) {
    console.error("Process payment hatası:", error);
    res.status(500).json({ 
      message: "Ödeme işlenirken bir hata oluştu",
      error: error.message 
    });
  }
});

// Cancel pending payment
router.post("/wallet/cancel-payment", requireAuth, async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ 
        message: "Ödeme ID gereklidir" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    const payment = user.pendingPayments?.find(
      p => p.serviceId === paymentId && p.status === "pending"
    );

    if (!payment) {
      return res.status(404).json({ 
        message: "Bekleyen ödeme bulunamadı" 
      });
    }

    payment.status = "cancelled";
    await user.save();

    res.json({
      message: "Ödeme iptal edildi",
      balance: user.balance,
      pendingPayments: user.pendingPayments?.filter(p => p.status !== "cancelled") || []
    });
  } catch (error: any) {
    console.error("Cancel payment hatası:", error);
    res.status(500).json({ 
      message: "Ödeme iptal edilirken bir hata oluştu",
      error: error.message 
    });
  }
});

export default router;

