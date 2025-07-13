import { Document, Types } from 'mongoose';

export interface INotes extends Document {
   user: Types.ObjectId;
  category?: Types.ObjectId;
  title: string;
  content: string;
  isPinned?: boolean;
  type?: "note" | "blog" | "doc";
  createdAt?: Date;
  updatedAt?: Date;
}