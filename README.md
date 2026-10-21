<div align="center">

# ⚡ Sparq

### *Your one-stop electronics store — browse, compare, buy, track.*

**A full-stack electronics e-commerce platform with role-based dashboards.**

[![Frontend Repo](https://img.shields.io/badge/Frontend-Repository-2ea44f?style=for-the-badge)](https://github.com/demoprojectbdsoft/Sparq-Electronics-Store)
[![Server Repo](https://img.shields.io/badge/Server-Repository-blue?style=for-the-badge)](https://github.com/demoprojectbdsoft/Sparq-Server)
[![Internship Project](https://img.shields.io/badge/Type-Internship%20Project-orange?style=for-the-badge)]()

</div>

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Quick Navigation](#-quick-navigation)
3. [Roles & Access](#-roles--access)
4. [Storefront](#-storefront)
5. [Customer Dashboard](#-customer-dashboard)
6. [Admin Dashboard](#️-admin-dashboard)
   - [Catalog & Orders](#catalog--orders)
   - [Site Settings & Branding](#site-settings--branding)
7. [Business Rules](#-business-rules)
   - [Orders & Payments](#orders--payments)
   - [Loyalty & Membership](#loyalty--membership)
   - [Pricing & Slider](#pricing--slider)
   - [Reviews & Ratings](#reviews--ratings)
   - [Suspended Accounts](#suspended-accounts)
8. [Demo Admin Mode](#-demo-admin-mode)
9. [Security](#-security)
10. [Tech Stack](#-tech-stack)
11. [Setup](#-setup)
    - [Environment Variables](#environment-variables)
    - [Run Locally](#run-locally)
12. [Future Roadmap](#️-future-roadmap)
13. [About This Project](#-about-this-project)

---

## 📖 Overview

Sparq is a full-stack electronics e-commerce platform — a dynamic, database-driven storefront with cart, wishlist, multi-method checkout, order tracking, reviews, a loyalty points system, and separate customer and admin dashboards.

Nothing is hardcoded. Categories, products, the homepage slider, and the store's own branding (name, fonts, colors, logos, contact details) are all managed from the admin dashboard and served from MongoDB.

| Audience | What they get |
|---|---|
| **Shoppers** | Browse and buy electronics online. |
| **Store Admins** | Manage the catalog, orders, users, reviews, and the look of the whole store. |
| **Developers / Recruiters** | A demonstration of full-stack, role-based application development. |

---

## 🧭 Quick Navigation

| I want to know about… | Go to |
|---|---|
| What a shopper can do | [Storefront](#-storefront), [Customer Dashboard](#-customer-dashboard) |
| What an admin can do | [Admin Dashboard](#️-admin-dashboard) |
| How the store's look and branding is changed | [Site Settings & Branding](#site-settings--branding) |
| How orders, points, and prices behave | [Business Rules](#-business-rules) |
| Who can see or do what | [Roles & Access](#-roles--access) |
| The demo login and its limits | [Demo Admin Mode](#-demo-admin-mode) |
| Running the project | [Setup](#-setup) |

---

## 🔐 Roles & Access

| Role | Lands on | Can do |
|---|---|---|
| **Customer** | `/dashboard/customer` | Shop, order, review, manage own account. |
| **Admin** | `/dashboard/admin` | Everything in the [Admin Dashboard](#️-admin-dashboard). |
| **Demo admin** | `/dashboard/admin` | Explore the admin dashboard and edit catalog data; changes are reverted daily. See [Demo Admin Mode](#-demo-admin-mode). |

```
Sign in (email/password or Google) → better-auth issues a JWT
        │
        ├─ Frontend routes by role: admin → /dashboard/admin, customer → /dashboard/customer
        └─ Backend verifies the JWT on every request via requireAuth + requireRole(...)
```

- **Role-isolated dashboards** — route guards keep each role confined to its own dashboard; one role can't open another's.
- **Checked on both sides** — frontend route guards and backend middleware both enforce access, so a role check can't be bypassed through the UI.
- **Shared JWT auth** — the frontend owns authentication via better-auth and exposes a JWKS endpoint; the backend verifies every request against it, with no shared secret.

---

## 🏬 Storefront

Public pages anyone can visit.

| Feature | Description |
|---|---|
| **Dynamic homepage** | Hero slider, Popular/Trending Products, Warehouse Deals, New Arrivals, promo banners, and newsletter signup. |
| **Category mega-menu** | Desktop and mobile menus driven by live category/subcategory data. |
| **Shop page** | Search, filters, sorting, pagination, and a product details page per slug. |
| **Language translator** | A built-in switcher to translate the storefront on the fly. |
| **Admin-controlled branding** | Site name, tagline, SEO meta, fonts, colors, logos, favicon, announcement bar, contact details, currency, and footer text come from the database, so changes show up across the storefront without a redeploy. |
| **Dark / Light theme** | Via `next-themes`, with separate light and dark colors and logos. |
| **Installable app (PWA)** | A web manifest for installing Sparq to desktop or mobile. |
| **Maintenance mode** | When switched on by an admin, non-admin visitors see a maintenance message. |

### Shopping Experience

| Feature | Description |
|---|---|
| **Cart & Wishlist** | Persisted per user in the database, synced across devices. |
| **Checkout** | Cash on Delivery or mobile wallet (bKash / Rocket / Nagad) with OTP verification. |
| **Order tracking** | A Track Order page and full status history per order. |
| **Buy Again** | From an order in Orders history, re-add that same product straight back to the cart. |
| **Reviews & ratings** | A product's rating and review count are recalculated from its actual reviews. |
| **Loyalty points & membership** | Points on every order, tracked against a membership tier. |

---

## 👤 Customer Dashboard

| Page | What it offers |
|---|---|
| **Overview** | Summary of the customer's account activity. |
| **Orders** | Order history with **Buy Again** and a direct link to leave a review. |
| **Transactions** | Payment records for the customer's orders. |
| **Wishlist** | Saved products. |
| **Reviews** | Reviews the customer has written. |
| **Analytics** | Personal spending analytics, with CSV export. |
| **Profile** | Personal details. |
| **Settings** | Account settings — see below. |

### Account Settings

| Tab | What the customer can do |
|---|---|
| **Preferences & Localization** | Choose a display currency and language. The currency overrides the store default for that customer's display only. |
| **Notifications & Alerts** | Manage notification preferences. |
| **Security & Sessions** | Change password (current password required). Changing it revokes all other active sessions. |
| **Privacy & Data** | Export account data as JSON (purchase history, saved addresses, profile), or permanently delete the account — requires typing `DELETE` and re-entering the password. |

---

## 🛠️ Admin Dashboard

### Catalog & Orders

| Area | What the admin can do |
|---|---|
| **Products** | Add, edit, and delete products with image upload, badges, and stock. See each product's **sell count** and the **profit or loss** it has made. |
| **Categories & subcategories** | Manage the hierarchy. Deleting a category also deletes its subcategories, but the whole delete is cancelled if the category or any subcategory still has products. |
| **Home Slider** | Add, reorder, and manage slides by selecting an existing product. |
| **Orders & Transactions** | Platform-wide tables with status updates. |
| **Users** | Change user role and account status. |
| **Reviews** | View and moderate all product reviews. |
| **Profit & sales analytics** | Daily/weekly/monthly/yearly profit, exportable to CSV. |
| **Settings** | Site Settings & Branding — see below. |

### Site Settings & Branding

One page, split into tabs, that controls how the whole store looks and behaves. Changes are staged until saved, then published with **Publish Changes**.

| Tab | What it controls |
|---|---|
| **Identity & Meta** | Site name, slogan, store type, and SEO meta title and description, with recommended character counts (60 / 160). |
| **Typography & Fonts** | Body and heading fonts from curated Google Fonts, with a live preview. |
| **Theme & Palettes** | Industry palettes (jewelry, fashion, restaurant, bakery, coffee, plants, electronics, robotics) with **Preview** and **Save**. A custom palette creator builds a scheme from a seed color with auto-harmonize and saves it to **My Presets**. Brand colors, light and dark surfaces, and the top bar gradient are all editable, and the palette is saved to the database. |
| **Shipping & Delivery** | Free shipping toggle and threshold, standard and express delivery fees, and estimated delivery duration, with a live customer-view preview. |
| **Top Bar & Layout** | Show or hide the announcement bar, edit its text with live preview, and add custom action links. |
| **Logos & Media** | Image + Text, Image Only, or Text Only display; separate light and dark logos for navbar and footer; brand wordmark text; favicon by upload or URL (hosted on ImgBB). |
| **Contact & Socials** | Support phone, email, physical address, and social links shown in the footer and mobile navigation. |
| **System & Security** | Store currency, timezone, custom footer copyright, and **maintenance mode**. |

---

## 📋 Business Rules

How the system behaves behind the screens.

### Orders & Payments

```
Place order ─► validate stock ─► compute totals ─► create order + linked transaction
            ─► log status ─► decrement stock ─► clear cart
```

- **One backend flow** — placing an order does all of the above in a single call.
- **Order response** — after an order ships, admin records the customer's response (Order Received / Still Not Received / Order Cancel) with a description message. The order then resolves to `delivered` or `cancelled`.
- **COD transactions** — stay `pending` until delivery, then flip to `success` automatically.
- **Cancellation** — marks the linked transaction as `failed`, whatever the payment method.
- **Sell count** — a product's sold count increases by the ordered quantity whenever an order succeeds.
- **Server-trusted money** — prices, discounts, shipping fees, and totals are always computed server-side.

### Loyalty & Membership

- Points are credited, and the membership tier re-checked, **only when an admin marks the order delivered**.

### Pricing & Slider

- Slides reference a real product; price, image, and discount are read live.
- Once a slide's countdown ends, the product's discount reverts to 0 and its price reverts to the original.

### Reviews & Ratings

A customer can review a product only if **all** of these hold:

1. They are signed in.
2. They are not an admin, and not the product's own owner.
3. They have purchased the product, and that order has been **delivered**.
4. They haven't already reviewed that product — one review per user per product.

Ratings are recalculated from the actual review documents on every create, update, and delete, so they are never stored stale.

### Suspended Accounts

A suspended user:
- can't add new items to the cart;
- can't check out, including items that were already in the cart.

---

## 🧪 Demo Admin Mode

A shared demo admin login lets reviewers explore the admin dashboard safely.

| | Demo admin can | Demo admin cannot |
|---|---|---|
| **Catalog** | Add, edit, and delete categories, subcategories, products, slides, and reviews. | — |
| **Everything else** | — | Change users, orders, transactions, cart, wishlist, account settings, password, or email, or delete the account. |

**Automatic restore** — everything the demo admin changes is reverted by a daily job on the server: added items are removed, edited items go back to their original values, and deleted items come back. Real admin changes are never touched.

Technical details are in the [server README](https://github.com/demoprojectbdsoft/Sparq-Server#-demo-admin-mode).

---

## 🔒 Security

| Protection | How it works |
|---|---|
| **JWT on every request** | The backend verifies the better-auth JWT against the frontend's JWKS endpoint. |
| **Role guards** | Frontend route guards plus backend `requireAuth` and `requireRole(...)`. |
| **Review eligibility** | Enforced server-side — see [Reviews & Ratings](#reviews--ratings). |
| **Suspended accounts** | Blocked from adding to cart and checking out. |
| **Demo admin limits** | Restricted to catalog routes only. |
| **Account deletion** | Requires typing `DELETE` and re-verifying the password. |
| **Money math** | Prices, discounts, shipping fees, and totals never come from the client. |

---

## 🧰 Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4, HeroUI v3 |
| Backend | Node.js, Express.js, TypeScript ([server repository](https://github.com/demoprojectbdsoft/Sparq-Server)) |
| Database | MongoDB Atlas (Mongoose) |
| Auth | better-auth — JWT via JWKS, email/password and Google Social Login |
| Hosting | Vercel (frontend) and Vercel Serverless Functions (backend) |
| Image Hosting | ImgBB |

<details>
<summary><b>npm packages used</b></summary>

| Package | Purpose |
|---|---|
| `next` | React framework — App Router, SSR, Server Actions |
| `react` / `react-dom` | Core UI library |
| `@heroui/react` / `@heroui/styles` | Component library (HeroUI v3) |
| `tailwindcss` | Utility-first CSS |
| `better-auth` / `@better-auth/mongo-adapter` | Authentication — email/password, Google OAuth, JWT/JWKS |
| `mongodb` | MongoDB driver |
| `next-themes` | Dark / Light theme switching |
| `lucide-react` / `react-icons` | Icon sets |
| `react-fast-marquee` | Brand logo marquee |
| `react-toastify` | Toast notifications |
| `recharts` | Analytics dashboard charts |

</details>

---

## 🚀 Setup

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=your_backend_api_base_url

# better-auth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=your_app_url
NEXT_PUBLIC_CLIENT_URL=your_app_url

# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string
DATABASE=your_database_name

# Google Social Login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> ⚠️ Never commit `.env.local`. `NEXT_PUBLIC_*` variables are baked in at build time — rebuild after changing one.

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/demoprojectbdsoft/Sparq-Electronics-Store.git
cd Sparq-Electronics-Store

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> 💡 The [Sparq-Server](https://github.com/demoprojectbdsoft/Sparq-Server) backend must be running and reachable at `NEXT_PUBLIC_API_URL`.

---

## 🗺️ Future Roadmap

- [ ] **Rider role & dashboard** — a courier role that accepts assigned deliveries and updates order status.
- [ ] **Live delivery tracking** — real-time GPS tracking of the rider on the customer's Track Order page.
- [ ] **Multi-tenant stores** — every store gets its own data, branding, and subdomain.
- [ ] **Self-serve store onboarding** — sign up and launch a store in minutes.
- [ ] **Subscription plans** — tiered pricing per store.
- [ ] **"Lucky Box" gamification** — a points-based mystery-box reward.
- [ ] **Points-redeemable discounts** — spending loyalty points directly at checkout.
- [ ] **Real-time settings sync** — live, instantly-applied store configuration.
- [ ] **Live chat support** — in-app chat with store support/admins.
- [ ] **Coupons & promo codes** — discount codes applied at checkout.
- [ ] **Real payment gateway integration** — Stripe/SSLCommerz/bKash, replacing the simulated flow.
- [ ] **Push / email notifications** — order and promotional alerts.
- [ ] **Store Locator** — a page for finding physical store locations.
- [ ] **Product comparison** — side-by-side spec comparison.

---

## 🎓 About This Project

An internship project for learning and demonstration — not distributed under an open-source license. Feel free to explore the code, but please reach out before reusing or redistributing it.