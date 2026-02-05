import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactInquiryDocument = ContactInquiry & Document;

@Schema({ timestamps: true })
export class ContactInquiry {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'new' })
  status: string; // new, read, replied
}

export const ContactInquirySchema =
  SchemaFactory.createForClass(ContactInquiry);

ContactInquirySchema.index({ createdAt: -1 });
ContactInquirySchema.index({ status: 1 });
