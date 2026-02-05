import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByStripeCustomerId(
    stripeCustomerId: string,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne({ stripeCustomerId }).exec();
  }

  async createOrUpdateByStripe(
    email: string,
    name: string | undefined,
    stripeCustomerId: string,
  ): Promise<UserDocument> {
    const existing = await this.findByEmail(email);
    if (existing) {
      existing.stripeCustomerId = stripeCustomerId;
      if (name) existing.name = name;
      return existing.save();
    }
    const user = new this.userModel({
      email,
      name,
      stripeCustomerId,
    });
    return user.save();
  }

  async updateStripeCustomerId(
    userId: string,
    stripeCustomerId: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { stripeCustomerId }, { new: true })
      .exec();
  }
}
