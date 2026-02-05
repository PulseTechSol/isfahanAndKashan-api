import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  /** Rich text product description (HTML from TipTap editor) */
  @Prop({ default: '' })
  description: string;

  /** Main product image - full Cloudinary URL (upload first, then store) */
  @Prop({ default: '' })
  mainImage: string;

  /** Gallery images - full Cloudinary URLs (upload first, then store) */
  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ isActive: 1 });
