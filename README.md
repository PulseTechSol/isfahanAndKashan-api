# Isfahan & Kashan Backend

Production-ready NestJS backend for the Isfahan & Kashan Persian rugs e-commerce site.

## Stack

- **NestJS** (TypeScript)
- **MongoDB** with Mongoose
- **AdminJS** – admin panel at `/admin`
- **Stripe** – payments, checkout sessions, webhooks

## Setup

1. Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB (local or use a cloud URI in `MONGO_URI`).

4. Run the backend:

```bash
npm run start:dev
```

The API runs on `http://localhost:4000` (or `PORT` from `.env`).

## Environment Variables

| Variable                | Description                         |
| ----------------------- | ----------------------------------- |
| `MONGO_URI`             | MongoDB connection string           |
| `STRIPE_SECRET_KEY`     | Stripe secret key                   |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret       |
| `ADMIN_EMAIL`           | Admin panel login email             |
| `ADMIN_PASSWORD`        | Admin panel login password          |
| `ADMIN_COOKIE_SECRET`   | Session cookie secret (32+ chars)   |
| `FRONTEND_URL`          | Frontend URL for CORS and redirects |
| `PORT`                  | Server port (default: 3001)         |

## API Endpoints

- `GET /products` – List products
- `GET /products/:slug` – Product by slug
- `POST /contact` – Submit contact form
- `POST /stripe/create-checkout-session` – Create Stripe Checkout session
- `POST /stripe/webhook` – Stripe webhooks (configure in Stripe Dashboard)

## Admin Panel

See **[ADMINJS_SETUP.md](./ADMINJS_SETUP.md)** for detailed setup and usage.

- **URL:** `http://localhost:3001/admin`
- **Auth:** Email and password from `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- **Resources:** Products, Users, Contact Inquiries, Orders, Payments

AdminJS is read/write for data only. It does not trigger Stripe operations. Destructive actions (bulk delete) are restricted on sensitive resources.

## Stripe Webhook

Configure the webhook in the Stripe Dashboard:

- **URL:** `https://your-domain.com/stripe/webhook`
- **Events:** `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

Use the Stripe CLI for local testing:

```bash
stripe listen --forward-to localhost:3001/stripe/webhook
```

## Project Structure

```
src/
├── admin/          # AdminJS setup
├── contact/        # Contact form submissions
├── payments/        # Orders, payments (Stripe webhook data)
├── products/        # Product catalog
├── stripe/          # Stripe service, checkout, webhooks
├── users/           # Users (Stripe customers)
├── app.module.ts
└── main.ts
```
