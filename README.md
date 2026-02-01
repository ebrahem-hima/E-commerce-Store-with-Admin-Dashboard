# Exclusive Store 🛍️

![Project Banner](link-to-screenshot-or-gif)

**Exclusive** is a fast and modern e-commerce platform built with **Next.js** and **Supabase**. It is designed to offer a smooth shopping experience for customers and powerful management tools for admins.

The platform features a **comprehensive Admin Dashboard** where you can manage products, categories, and track orders in detail. It also provides real-time analytics like total revenue, active users, top-selling products, and top customers. The system includes a built-in support chat to reply to user tickets directly.

For customers, the store offers advanced search and filtering to find products easily. A key feature is the **"Guest Shopping" mode**, which allows users to browse and add items to their cart without registering immediately. They only need to sign up when they are ready to checkout. The project also implements a smart **Coupon System** to handle discounts securely.

---

## 🚀 Live Demo

**[View Live Application](https://your-link.com)**

---

## 🛠 Tech Stack

- **Frontend:** React, Next.js (App Router), TypeScript, TailwindCSS.
- **Backend (BaaS):** Supabase (PostgreSQL, Auth, Edge Functions, Realtime).
- **State Management:** React Context API.
- **Validation:** Zod.
- **Email Services:** Resend.

---

## 💎 Technical Challenges & Solutions

### 1. Advanced Coupon Architecture 🎟️

I implemented a robust **3-Layer Validation Logic** to ensure data integrity and prevent misuse:

1.  **Eligibility Check:** Verifies if the user is authorized to use the coupon (via Many-to-Many relation).
2.  **Usage Limits (Rate Limiting):** Checks the specific user's usage history against the coupon's max limit using database queries.
3.  **Expiration & Scope:** Validates date and applicability (specific products/categories).

### 2. Persistent Guest Cart (The "Invisible" Mode) 🛒

Enabled users to shop without logging in to improve UX and conversion:

- **Challenge:** Maintaining cart state across sessions without a database session.
- **Solution:** Used `LocalStorage` for guest users, and upon login/registration, applied a **Synchronization Logic** to merge the local cart with the database cart seamlessly.

### 3. Real-time Notifications System 🔔

Leveraged **Supabase Realtime** to push instant updates to users:

- When a discount is applied or a new coupon is assigned.
- When an admin replies to a support ticket.
- When the order status changes.

### 4. Admin Dashboard & Analytics 📊

Built a comprehensive dashboard aggregating complex SQL queries to calculate:

- Total revenue & user growth.
- Best-selling products (Top 5).
- Top spenders (Top 5 users).

---

## 🗄️ Database Schema Highlights

The database is normalized to handle complex e-commerce relationships:

- **Coupons ↔ Users:** `Many-to-Many` (via assignment table for targeting).
- **Orders ↔ Order Items:** `One-to-Many` (each order contains multiple items).
- **Categories ↔ Products:** `One-to-Many`.

_(Insert ERD or Database Schema Image Here)_

---

## ✨ Key Features

### 👤 For Users

- **Smart Cart:** Real-time stock validation prevents ordering out-of-stock items.
- **Instant Feedback:** Immediate validation response when applying coupons.
- **Order Tracking:** Detailed timeline of order status.
- **Secure Auth:** Social login & Email/Password via Supabase Auth.
- **Auto-Fill:** Smart address pre-filling based on previous orders for faster checkout.

### 🛡️ For Admins

- **Full Control:** Manage products, categories, and orders.
- **Support System:** Reply to user tickets directly via Email (Resend integration).
- **Advanced Filtering:** Filter products and users with high precision.
- **User Insights:** View complete order history for any user.

---

## 🏃‍♂️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/ebrahem-hima/E-commerce-Store-with-Admin-Dashboard
   ```
