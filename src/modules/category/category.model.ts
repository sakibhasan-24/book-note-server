import mongoose, { Schema } from 'mongoose';
import { ICategory } from './category.interface';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true,unique:true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } as any
  },
  { timestamps: true }
);
CategorySchema.pre('save', function (next) {
  this.name = this.name.toUpperCase();
  next();
});

CategorySchema.index({ name: 1, user: 1 }, { unique: true });
export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
