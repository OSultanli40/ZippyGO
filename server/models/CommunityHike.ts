import mongoose, { Schema, Document } from "mongoose";

export interface IParticipant {
  userId: string;
  userName: string;
  userAvatar?: string;
  joinedAt: Date;
}

export interface ICommunityHike extends Document {
  title: string;
  routeId: number;
  date: string;
  time: string;
  host: string;
  hostId: string;
  hostAvatar?: string;
  participants: IParticipant[];
  maxParticipants: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipantSchema = new Schema<IParticipant>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userAvatar: { type: String },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const CommunityHikeSchema = new Schema<ICommunityHike>({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  routeId: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  host: { 
    type: String, 
    required: true 
  },
  hostId: { 
    type: String, 
    required: true 
  },
  hostAvatar: { 
    type: String 
  },
  participants: { 
    type: [ParticipantSchema], 
    default: [] 
  },
  maxParticipants: { 
    type: Number, 
    required: true,
    default: 10,
    min: 2,
    max: 50
  },
  description: { 
    type: String, 
    default: "" 
  }
}, {
  timestamps: true
});

// Index'ler
CommunityHikeSchema.index({ routeId: 1, date: 1 });
CommunityHikeSchema.index({ hostId: 1 });

// Collection adını açıkça belirt (MongoDB'de otomatik olarak "communityhikes" olacak)
export const CommunityHike = mongoose.model<ICommunityHike>(
  "CommunityHike", 
  CommunityHikeSchema,
  "communityhikes" // Collection adını açıkça belirt
);

