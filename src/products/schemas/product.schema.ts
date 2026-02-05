import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [String], default: [] })
  characteristics: string[];

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  stripePriceId?: string;

  @Prop()
  stripeProductId?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ isActive: 1 });
