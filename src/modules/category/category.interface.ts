import { Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  user: string;
}
