import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ContactInquiry,
  ContactInquiryDocument,
} from './schemas/contact-inquiry.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactInquiry.name)
    private contactModel: Model<ContactInquiryDocument>,
  ) {}

  async create(dto: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<ContactInquiryDocument> {
    const inquiry = new this.contactModel(dto);
    return inquiry.save();
  }

  async findAll(): Promise<ContactInquiryDocument[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }
}
