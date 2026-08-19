import mongoose from "mongoose";

const CmsEntrySchema = new mongoose.Schema({
  type: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, default: "", required: true },
  image: { type: String, default: "", required: true },
  featured: { type: Boolean, default: false, required: true },
  published: { type: Boolean, default: true, required: true },
  position: { type: Number, default: 0, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

CmsEntrySchema.index({ type: 1, slug: 1 }, { unique: true });

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interest: { type: String, default: "", required: true },
  intent: { type: String, default: "Consultation", required: true },
  budget: { type: String, default: "", required: true },
  preferredDate: { type: String, default: "", required: true },
  message: { type: String, default: "", required: true },
  source: { type: String, default: "website", required: true },
  status: { type: String, default: "New", required: true },
}, { timestamps: true });

const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, default: "", required: true },
}, { timestamps: true });

export const CmsEntryModel = mongoose.models.CmsEntry || mongoose.model("CmsEntry", CmsEntrySchema);
export const LeadModel = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
export const SettingModel = mongoose.models.Setting || mongoose.model("Setting", SettingSchema);

export type CmsEntry = {
  _id?: string;
  id?: number | string;
  type: string;
  slug: string;
  title: string;
  summary: string;
  image: string;
  featured: boolean;
  published: boolean;
  position: number;
  data: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Lead = {
  _id?: string;
  id?: number | string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  intent: string;
  budget: string;
  preferredDate: string;
  message: string;
  source: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NewLead = Omit<Lead, "_id" | "id" | "createdAt" | "updatedAt">;
