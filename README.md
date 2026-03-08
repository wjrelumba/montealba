# 🛒 Montealba

> An ordering and inventory management app built exclusively for the Montealba brand — empowering the business owner to manage stock, handle orders, and showcase products to customers.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)

**Live App:** [montealba.vercel.app](https://montealba.vercel.app)

---

## Overview

**Montealba** is a custom-built web application designed for the Montealba food business. It serves two audiences:

- **The business owner** — who can track food stock levels, manage inventory, and create orders on behalf of customers
- **Customers** — who can browse the product catalog to explore what's available for purchase

Built as a personal project to streamline day-to-day business operations for a small food business.

---

## ✨ Features

### 🗂 Inventory Tracking
- View current stock levels for all food products
- Monitor remaining quantities to avoid stockouts
- Keep inventory up to date as orders are fulfilled

### 📋 Order Management
- Business owner can create orders based on customer requests
- Track what has been ordered and for whom
- Manage order status from creation to completion

### 🛍 Product Showcase
- Public-facing product catalog for customers to browse
- Customers can see available products and what's in stock before placing an order

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | React 18 + Vite | Fast, modern UI development |
| Styling | TailwindCSS | Utility-first responsive design |
| Backend & Database | Supabase | PostgreSQL database and authentication |
| Deployment | Vercel | Frontend hosting and CI/CD |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm**, yarn, or pnpm
- A [Supabase](https://supabase.com) account and project

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/wjrelumba/montealba.git
cd montealba

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Supabase credentials (see below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

You can find these values in your Supabase project under **Settings → API**.

---

## 🗄 Database Schema

### `products`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `created_at` | `timestamp` | Auto-generated creation timestamp |
| `name` | `text` | Product name |
| `description` | `text` | Product description |
| `price` | `numeric` | Product price |
| `image_url` | `text` | URL to product image |

### `inventory`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `product_id` | `uuid` | FK → `products` |
| `quantity` | `integer` | Current stock quantity |
| `updated_at` | `timestamp` | Last stock update time |

### `orders`

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key |
| `created_at` | `timestamp` | Order creation time |
| `customer_name` | `text` | Name of the customer |
| `items` | `jsonb` | Ordered products and quantities |
| `status` | `text` | Order status (e.g. `pending`, `fulfilled`) |
| `created_by` | `uuid` | FK → `auth.users` (business owner) |

> ⚠️ Update this schema to reflect your actual Supabase table structure.

---

## 📁 Project Structure

```
montealba/
├── montealba/               # Nested package or additional config
├── public/                  # Static assets (images, icons)
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route-level page components
│   │   ├── Products.jsx     # Customer-facing product showcase
│   │   ├── Inventory.jsx    # Owner inventory management
│   │   └── Orders.jsx       # Order creation and tracking
│   ├── lib/
│   │   └── supabaseClient.js   # Supabase client initialization
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   └── main.jsx             # App entry point
├── .env.example             # Environment variable template
├── vercel.json              # Vercel deployment configuration
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 👤 User Roles

| Role | Access |
|---|---|
| **Customer** | Browse product catalog, view product details and availability |
| **Business Owner** | Full access — manage inventory, create and track orders, manage products |

---

## 🚢 Deployment

Montealba is deployed on **Vercel** with automatic deployments triggered on every push to the `main` branch.

### To deploy your own instance:

1. Push the repository to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Add the environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under **Project Settings → Environment Variables**
4. Vercel builds with `npm run build` and serves from the `dist/` directory

---

## 📄 License

This project is a private application built for the Montealba brand. All rights reserved.
