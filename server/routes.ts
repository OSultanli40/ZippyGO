import type { Express } from "express";
import { createServer, type Server } from "http";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import communityHikeRoutes from "./routes/communityHike";
import chatRoutes from "./routes/chat";

// Modelleri import et (collection'ların tanımlanması için)
import "./models/User";
import "./models/CommunityHike";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth routes
  app.use("/api/auth", authRoutes);
  
  // User routes
  app.use("/api/user", userRoutes);

  // Community Hike routes
  app.use("/api/community-hikes", communityHikeRoutes);

  // Chat routes
  app.use("/api/chat", chatRoutes);
  
  console.log("✅ API route'ları kaydedildi:");
  console.log("   - /api/auth");
  console.log("   - /api/user");
  console.log("   - /api/community-hikes");
  console.log("   - /api/chat");

  return httpServer;
}
