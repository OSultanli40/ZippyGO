import mongoose, { Schema, Document } from "mongoose";

export interface IUserBadge {
  id: string;
  name: string;
  description: string;
  image: string;
  earned: boolean;
  dateEarned?: string;
}

export interface IUserCommunityHike {
  hikeId: string;
  joinedAt: Date;
}

export interface IPendingPayment {
  serviceId: string;
  serviceName: string;
  amount: number;
  type: "Guide" | "Babysitter" | "Equipment";
  bookedAt: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
}

export interface IUser extends Document {
  username: string;
  password: string; // Plain text password (no hashing for development)
  phoneNumber?: string;
  email?: string;
  name: string;
  avatar: string;
  completedHikes: number[]; // Route IDs
  communityHikes: IUserCommunityHike[]; // Community hike participations
  badges: IUserBadge[];
  totalKm: number;
  totalElevation: number;
  challengePoints: number; // Points for the 5 Peak Challenge
  isInChallenge: boolean; // Whether user has joined the challenge
  balance: number; // Wallet balance in AZN
  pendingPayments: IPendingPayment[]; // Payments on hold
  createdAt: Date;
  updatedAt: Date;
}

const UserBadgeSchema = new Schema<IUserBadge>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  earned: { type: Boolean, default: false },
  dateEarned: { type: String }
}, { _id: false });

const CommunityHikeSchema = new Schema<IUserCommunityHike>({
  hikeId: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const PendingPaymentSchema = new Schema<IPendingPayment>({
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["Guide", "Babysitter", "Equipment"], required: true },
  bookedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "processing", "completed", "cancelled"], default: "pending" }
}, { _id: false });

const UserSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  email: { 
    type: String, 
    trim: true,
    lowercase: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  avatar: { 
    type: String, 
    default: "https://api.dicebear.com/7.x/notionists/svg?seed=user"
  },
  completedHikes: { 
    type: [Number], 
    default: [] 
  },
  communityHikes: { 
    type: [CommunityHikeSchema], 
    default: [] 
  },
  badges: { 
    type: [UserBadgeSchema], 
    default: [
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
    ]
  },
  totalKm: { 
    type: Number, 
    default: 0 
  },
  totalElevation: { 
    type: Number, 
    default: 0 
  },
  challengePoints: {
    type: Number,
    default: 0
  },
  isInChallenge: {
    type: Boolean,
    default: false
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  pendingPayments: {
    type: [PendingPaymentSchema],
    default: []
  }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>("User", UserSchema);

