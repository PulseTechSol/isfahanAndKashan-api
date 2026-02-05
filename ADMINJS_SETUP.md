# AdminJS Setup Guide

AdminJS provides an auto-generated admin panel for managing your MongoDB data. This document describes how it's configured and how to use it.

## Overview

- **URL:** `http://localhost:3001/admin` (or `{BASE_URL}/admin`)
- **Authentication:** Email + password from environment variables
- **Database:** MongoDB via Mongoose adapter

## Environment Variables

Add these to your `.env` file:

| Variable              | Description                            | Example                        |
| --------------------- | -------------------------------------- | ------------------------------ |
| `ADMIN_EMAIL`         | Login email for the admin panel        | `admin@example.com`            |
| `ADMIN_PASSWORD`      | Login password                         | `your-secure-password`         |
| `ADMIN_COOKIE_SECRET` | Session cookie secret (32+ characters) | `your-32-char-cookie-secret!!` |

All three are **required**. The app will not start without them.

## Accessing the Admin Panel

1. Start the backend: `npm run start:dev`
2. Open `http://localhost:3001/admin` in your browser
3. Log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`

## Resources (Data Models)

AdminJS manages the following MongoDB collections:

| Resource           | Navigation Group | Description                                    |
| ------------------ | ---------------- | ---------------------------------------------- |
| **Product**        | Catalog          | Rug products (slug, name, description, images) |
| **User**           | Users            | Users / Stripe customers                       |
| **ContactInquiry** | Support          | Contact form submissions                       |
| **Order**          | Commerce         | Orders from Stripe checkout                    |
| **Payment**        | Commerce         | Payment records from Stripe webhooks           |

## Action Restrictions

To reduce risk of accidental data loss:

| Resource       | Delete | Bulk Delete | Edit |
| -------------- | ------ | ----------- | ---- |
| Product        | ✅     | ❌          | ✅   |
| User           | ✅     | ❌          | ✅   |
| ContactInquiry | ✅     | ❌          | ✅   |
| Order          | ❌     | ❌          | ✅   |
| Payment        | ❌     | ❌          | ❌   |

- **Orders** and **Payments** are created by Stripe webhooks. Deleting or editing them in AdminJS can desync your data from Stripe.
- **Bulk delete** is disabled on all resources.

## What AdminJS Does NOT Do

- **No Stripe operations** – AdminJS only reads/writes MongoDB. It does not create customers, checkout sessions, or refunds.
- **No business logic** – Use the API or Stripe Dashboard for payment flows.

## Configuration Location

AdminJS is configured in:

```
src/admin/admin.module.ts
```

Key configuration:

- **Adapter:** `@adminjs/mongoose` for MongoDB
- **Auth:** Session-based with `express-session`
- **Branding:** Company name set to "Isfahan & Kashan Admin"

## Adding a New Resource

1. Create a Mongoose schema in the appropriate module
2. Register it in `MongooseModule.forFeature()` in `admin.module.ts`
3. Add the model to the `resources` array in `adminJsOptions`:

```typescript
{
  resource: YourModel,
  options: {
    navigation: { name: 'Your Group' },
    actions: restrictDestructiveActions, // or custom actions
  },
},
```

## Troubleshooting

| Issue                                                               | Solution                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------- |
| "ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_COOKIE_SECRET are required" | Set all three in `.env`                                 |
| Login fails                                                         | Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` match exactly |
| Session lost on refresh                                             | Ensure `ADMIN_COOKIE_SECRET` is at least 32 characters  |
| 404 on /admin                                                       | Confirm the backend is running and the path is `/admin` |
