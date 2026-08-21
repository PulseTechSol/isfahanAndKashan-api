import * as os from 'os';
import MongoStore from 'connect-mongo';
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
import { bundleAdminComponents } from './admin-js-components';

AdminJS.registerAdapter(AdminJSMongoose);

const adminComponents = bundleAdminComponents();

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

        const getModel = (name: string, schema: any): any => {
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

        const frontendUrl =
          configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

        const theme = {
          colors: {
            primary100: '#6D1212',
            primary80: '#8a1a1a',
            primary60: '#a72222',
            primary40: '#c44a4a',
            primary20: '#e18a8a',
            grey100: '#171a23',
            grey80: '#454655',
            grey60: '#898A9A',
            grey40: '#C0C0CA',
            grey20: '#F6F7FB',
            filterBg: '#171a23',
            hoverBg: '#252a36',
            bg: '#FDF4E3',
            border: '#e8e0d0',
            inputBorder: '#C0C0CA',
            highlight: '#FDF4E3',
            infoDark: '#6D1212',
            info: '#a72222',
            infoLight: '#e18a8a',
          },
        };

        const branding = (currentAdmin?: { email: string }) => ({
          companyName: 'Isfahan & Kashan Admin',
          logo: currentAdmin ? `${frontendUrl}/logo.svg` : '/logo-red.svg',
          favicon: `${frontendUrl}/favicon.ico`,
          withMadeWithLove: false,
          theme,
        });

        const useSecureCookies =
          process.env.ADMIN_COOKIE_SECURE === 'true' ||
          process.env.RAILWAY_ENVIRONMENT === 'production';

        return {
          adminJsOptions: {
            rootPath: '/admin',
            assets: {
              styles: ['/admin-sidebar-theme.css'],
            },
            branding,
            dashboard: {
              component: adminComponents.dashboardComponent,
              handler: async () => ({}),
            },
            resources: [
              {
                resource: ProductModel,
                options: {
                  navigation: { name: 'Catalog' },
                  actions: restrictDestructiveActions,
                  listProperties: [
                    'mainImage',
                    'name',
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
                      components: adminComponents.productMainImage,
                      custom: { isMultiple: false },
                      isVisible: {
                        list: true,
                        show: false, // shown combined in images row
                        edit: true,
                        new: true,
                      },
                    },
                    images: {
                      components: adminComponents.productImages,
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
                  navigation: false,
                  actions: restrictDestructiveActions,
                },
              },
              {
                resource: ContactInquiryModel,
                options: {
                  navigation: false,
                  actions: restrictDestructiveActions,
                },
              },
              {
                resource: OrderModel,
                options: {
                  navigation: { name: 'Commerce' },
                  actions: {
                    new: { isVisible: false, isAccessible: false },
                    edit: { isVisible: false, isAccessible: false },
                    delete: { isVisible: false, isAccessible: false },
                    bulkDelete: { isVisible: false, isAccessible: false },
                    updateStatus: {
                      actionType: 'record',
                      isVisible: false,
                      isAccessible: true,
                      handler: async (
                        request: any,
                        _res: any,
                        context: any,
                      ) => {
                        const { record, currentAdmin } = context;
                        const status = request.payload?.status;
                        if (!status) {
                          return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                              type: 'error',
                              message: 'Status required',
                            },
                          };
                        }
                        const updated = await record.update(
                          { status },
                          context,
                        );
                        return { record: updated.toJSON(currentAdmin) };
                      },
                    },
                  },
                  listProperties: [
                    'orderNumber',
                    'firstName',
                    'customerEmail',
                    'status',
                    'totalAmount',
                  ],
                  properties: {
                    _id: {
                      isVisible: { list: false, show: false, edit: false },
                    },
                    orderNumber: {
                      position: 1,
                      title: 'Order number',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    firstName: {
                      position: 2,
                      title: 'Name',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    lastName: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    customerEmail: {
                      position: 3,
                      title: 'Email',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    status: {
                      position: 4,
                      title: 'Order status',
                      isVisible: { list: true, show: true, edit: true },
                      components: adminComponents.orderStatus,
                    },
                    totalAmount: {
                      position: 5,
                      isVisible: { list: true, show: false, edit: false },
                      title: 'Price',
                      components: adminComponents.orderTotalAmount,
                    },
                    stripeCheckoutSessionId: {
                      isVisible: { list: false, show: false, edit: false },
                    },
                    stripePaymentIntentId: {
                      isVisible: { list: false, show: false, edit: false },
                    },
                    stripeSubscriptionId: {
                      isVisible: { list: false, show: false, edit: false },
                    },
                    stripeCustomerId: {
                      isVisible: { list: false, show: false, edit: false },
                    },
                    customerId: {
                      isVisible: { list: false, show: false, edit: false },
                    },
                    items: {
                      isVisible: { list: false, show: true, edit: false },
                      components: adminComponents.orderItems,
                    },
                    address: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    town: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    state: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    postCode: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    country: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    phoneNumber: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    currency: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    createdAt: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    updatedAt: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                  },
                },
              },
              {
                resource: PaymentModel,
                options: {
                  navigation: { name: 'Commerce' },
                  actions: {
                    new: { isVisible: false, isAccessible: false },
                    delete: { isVisible: false, isAccessible: false },
                    bulkDelete: { isVisible: false, isAccessible: false },
                    edit: { isVisible: false, isAccessible: false },
                  },
                  listProperties: [
                    'orderNumber',
                    'status',
                    'amount',
                    'currency',
                    'stripePaymentIntentId',
                    'createdAt',
                  ],
                  properties: {
                    orderId: {
                      title: 'Order ID',
                      isVisible: { list: false, show: true, edit: false },
                    },
                    orderNumber: {
                      title: 'Order number',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    status: {
                      title: 'Status',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    amount: {
                      title: 'Amount',
                      isVisible: { list: true, show: true, edit: false },
                      components: adminComponents.paymentAmount,
                    },
                    currency: {
                      isVisible: { list: true, show: true, edit: false },
                    },
                    stripePaymentIntentId: {
                      title: 'Stripe Payment Intent',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    stripeChargeId: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    stripeCustomerId: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    stripeEventId: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                    createdAt: {
                      title: 'Created',
                      isVisible: { list: true, show: true, edit: false },
                    },
                    updatedAt: {
                      isVisible: { list: false, show: true, edit: false },
                    },
                  },
                },
              },
            ],
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
            resave: false,
            saveUninitialized: false,
            secret: cookieSecret,
            store: MongoStore.create({
              mongoUrl: configService.get<string>('MONGO_URI'),
              collectionName: 'adminjs_sessions',
              ttl: 24 * 60 * 60, // 24 hours in seconds
            }),
            cookie: {
              // Secure cookies need HTTPS. Enabled on Railway; off for local http://localhost.
              secure: useSecureCookies,
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
