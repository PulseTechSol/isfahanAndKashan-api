import * as os from 'os';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  ContactInquiry,
  ContactInquirySchema,
} from '../contact/schemas/contact-inquiry.schema';
import { Order, OrderSchema } from '../payments/schemas/order.schema';
import { Payment, PaymentSchema } from '../payments/schemas/payment.schema';
import { MongooseModule } from '@nestjs/mongoose';

AdminJS.registerAdapter(AdminJSMongoose);

// Upload-first: upload to Cloudinary, store URL in field
const cloudinaryUrlUploadPath = path.join(
  process.cwd(),
  'src/admin/components/cloudinary-url-upload',
);
// Show view: display image previews instead of raw URLs
const imageUrlShowPath = path.join(
  process.cwd(),
  'src/admin/components/image-url-show',
);
// List view: thumbnail in first column
const imageListCellPath = path.join(
  process.cwd(),
  'src/admin/components/image-list-cell',
);

const restrictDestructiveActions = {
  delete: { isVisible: true, isAccessible: true },
  bulkDelete: { isVisible: false, isAccessible: false },
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: ContactInquiry.name, schema: ContactInquirySchema },
      { name: Order.name, schema: OrderSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
    AdminJSModule.createAdminAsync({
      imports: [ConfigModule],
      inject: [ConfigService, getConnectionToken()],
      useFactory: (configService: ConfigService, connection: Connection) => {
        const adminEmail = configService.get<string>('ADMIN_EMAIL');
        const adminPassword = configService.get<string>('ADMIN_PASSWORD');
        const cookieSecret = configService.get<string>('ADMIN_COOKIE_SECRET');

        if (!adminEmail || !adminPassword || !cookieSecret) {
          throw new Error(
            'ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_COOKIE_SECRET are required for AdminJS',
          );
        }

        const getModel = <T>(
          name: string,
          schema: import('mongoose').Schema<T>,
        ) => {
          try {
            return connection.model(name);
          } catch {
            return connection.model(name, schema);
          }
        };

        const ProductModel = getModel(Product.name, ProductSchema);
        const UserModel = getModel(User.name, UserSchema);
        const ContactInquiryModel = getModel(
          ContactInquiry.name,
          ContactInquirySchema,
        );
        const OrderModel = getModel(Order.name, OrderSchema);
        const PaymentModel = getModel(Payment.name, PaymentSchema);

        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: ProductModel,
                options: {
                  navigation: { name: 'Catalog' },
                  actions: restrictDestructiveActions,
                  listProperties: [
                    'mainImage',
                    'name',
                    'id',
                    'slug',
                    'price',
                    'isActive',
                  ],
                  properties: {
                    description: {
                      type: 'richtext',
                      isVisible: {
                        list: false,
                        show: true,
                        edit: true,
                        new: true,
                      },
                    },
                    createdAt: {
                      isVisible: { edit: false, new: false },
                    },
                    updatedAt: {
                      isVisible: { edit: false, new: false },
                    },
                    // Upload-first: select file → upload to Cloudinary → URL stored in payload
                    mainImage: {
                      components: {
                        edit: AdminJS.bundle(cloudinaryUrlUploadPath),
                        show: AdminJS.bundle(imageUrlShowPath),
                        list: AdminJS.bundle(imageListCellPath),
                      },
                      custom: { isMultiple: false },
                      isVisible: {
                        list: true,
                        show: false, // shown combined in images row
                        edit: true,
                        new: true,
                      },
                    },
                    images: {
                      components: {
                        edit: AdminJS.bundle(cloudinaryUrlUploadPath),
                        show: AdminJS.bundle(imageUrlShowPath),
                      },
                      custom: { isMultiple: true, combineWithMain: true },
                      isVisible: {
                        list: false,
                        show: true,
                        edit: true,
                        new: true,
                      },
                    },
                  },
                },
              },
              {
                resource: UserModel,
                options: {
                  navigation: { name: 'Users' },
                  actions: restrictDestructiveActions,
                },
              },
              {
                resource: ContactInquiryModel,
                options: {
                  navigation: { name: 'Support' },
                  actions: restrictDestructiveActions,
                },
              },
              {
                resource: OrderModel,
                options: {
                  navigation: { name: 'Commerce' },
                  actions: {
                    delete: { isVisible: false, isAccessible: false },
                    bulkDelete: { isVisible: false, isAccessible: false },
                  },
                },
              },
              {
                resource: PaymentModel,
                options: {
                  navigation: { name: 'Commerce' },
                  actions: {
                    delete: { isVisible: false, isAccessible: false },
                    bulkDelete: { isVisible: false, isAccessible: false },
                    edit: { isVisible: false, isAccessible: false },
                  },
                },
              },
            ],
            branding: {
              companyName: 'Isfahan & Kashan Admin',
            },
          },
          auth: {
            authenticate: async (email: string, password: string) => {
              if (email === adminEmail && password === adminPassword) {
                return { email };
              }
              return null;
            },
            cookieName: 'adminjs',
            cookiePassword: cookieSecret,
          },
          sessionOptions: {
            secret: cookieSecret,
            saveUninitialized: false,
            resave: true,
            cookie: {
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000, // 24 hours
            },
          },
          formidableOptions: {
            uploadDir: os.tmpdir(),
            maxFileSize: 10 * 1024 * 1024, // 10MB
            keepExtensions: true,
          },
        };
      },
    }),
  ],
})
export class AdminModule {}
