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

// Signup endpoint
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, phoneNumber } = req.body;

    if (!username || !name || !password) {
      return res.status(400).json({ 
        message: "Kullanıcı adı, isim ve şifre gereklidir" 
      });
    }

    // Kullanıcı adı kontrolü
    const existingUser = await User.findOne({ 
      username: username.toLowerCase().trim() 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: "Bu kullanıcı adı zaten kullanılıyor" 
      });
    }

    // Yeni kullanıcı oluştur
    const avatar = `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`;
    
    const newUser = new User({
      username: username.toLowerCase().trim(),
      password: password, // Plain text password (no hashing for development)
      phoneNumber: phoneNumber?.trim() || undefined,
      name: name.trim(),
      email: email?.trim().toLowerCase() || undefined,
      avatar,
      completedHikes: [],
      communityHikes: [],
      badges: [
        {
          id: "starter",
          name: "Starter",
          description: "Completed your first hike",
          image: "/badges/starter.png",
          earned: false
        },
        {
          id: "trailblazer",
          name: "Trailblazer",
          description: "Completed 3 hikes",
          image: "/badges/trailblazer.png",
          earned: false
        },
        {
          id: "mountain-pro",
          name: "Mountain Pro",
          description: "Completed 5+ hikes",
          image: "/badges/mountain-pro.png",
          earned: false
        }
      ],
      totalKm: 0,
      totalElevation: 0
    });

    await newUser.save();

    // Session'a kullanıcı bilgilerini kaydet
    req.session.userId = newUser._id.toString();
    req.session.username = newUser.username;

    res.status(201).json({
      message: "Kayıt başarılı",
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        completedHikes: newUser.completedHikes,
        communityHikes: newUser.communityHikes,
        badges: newUser.badges,
        totalKm: newUser.totalKm,
        totalElevation: newUser.totalElevation,
        challengePoints: newUser.challengePoints,
        isInChallenge: newUser.isInChallenge,
        balance: newUser.balance || 0,
        pendingPayments: newUser.pendingPayments || []
      }
    });
  } catch (error: any) {
    console.error("Signup hatası:", error);
    res.status(500).json({ 
      message: "Kayıt sırasında bir hata oluştu",
      error: error.message 
    });
  }
});

// Login endpoint
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        message: "Kullanıcı adı ve şifre gereklidir" 
      });
    }

    // Kullanıcıyı bul
    const user = await User.findOne({ 
      username: username.toLowerCase().trim() 
    });

    if (!user) {
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    // Şifre kontrolü (plain text comparison for development)
    if (user.password !== password) {
      return res.status(401).json({ 
        message: "Şifre yanlış" 
      });
    }

    // Session'a kullanıcı bilgilerini kaydet
    req.session.userId = user._id.toString();
    req.session.username = user.username;

    res.json({
      message: "Giriş başarılı",
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
    console.error("Login hatası:", error);
    res.status(500).json({ 
      message: "Giriş sırasında bir hata oluştu",
      error: error.message 
    });
  }
});

// Logout endpoint
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ 
        message: "Çıkış yapılırken bir hata oluştu" 
      });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Çıkış başarılı" });
  });
});

// Me endpoint (mevcut kullanıcı bilgilerini getir)
router.get("/me", async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ 
        message: "Oturum açılmamış" 
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      req.session.destroy(() => {});
      return res.status(404).json({ 
        message: "Kullanıcı bulunamadı" 
      });
    }

    res.json({
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
    console.error("Me endpoint hatası:", error);
    res.status(500).json({ 
      message: "Kullanıcı bilgileri alınırken bir hata oluştu",
      error: error.message 
    });
  }
});

export default router;

