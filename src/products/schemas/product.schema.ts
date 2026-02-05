import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

export type ProductDocument = Product & Document;

function getPublicIdFromUrl(url: string): string | null {
  const match = url.match(/\/upload\/v\d+\/(.+)\.\w+$/);
  return match ? match[1] : null;
}

async function deleteFromCloudinary(url: string): Promise<void> {
  if (!url || !url.includes('cloudinary.com')) return;
  const publicId = getPublicIdFromUrl(url);
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch {
      // Ignore - product will still be deleted
    }
  }
}

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

// Delete images from Cloudinary when product is deleted
ProductSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    const urls = [
      doc.mainImage,
      ...(Array.isArray(doc.images) ? doc.images : []),
    ].filter(Boolean);
    for (const url of urls) {
      await deleteFromCloudinary(url);
    }
  }
  next();
});
