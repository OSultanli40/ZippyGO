import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri || mongoUri.trim() === "") {
    throw new Error("MONGODB_URI environment variable is not set. Please add your MongoDB connection string to the .env file.");
  }

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("MongoDB bağlantısı başarılı");
    
    // Modelleri import et (collection'ların oluşturulmasını sağla)
    await import("./models/User");
    await import("./models/CommunityHike");
    console.log("Modeller yüklendi");
  } catch (error) {
    console.error("MongoDB bağlantı hatası:", error);
    throw error;
  }
}

export default mongoose;

