import { Schema, model } from "mongoose";
import { INotes } from "./note.interface";
const noteSchema = new Schema<INotes>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },    
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, 
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["note", "blog", "doc"],
      default: "note",
    },
  },
  {
    timestamps: true,
  }
);
export const Note = model<INotes>("Note", noteSchema);
