<div align="center">

# 🍽️ ZeroHunger

### **Connecting Surplus to Need**

_A community-powered food recovery platform fighting food waste and hunger, one donation at a time._

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-In_Development-orange?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](#) • [Documentation](docs/) • [API Contract](docs/API-CONTRACT.md) • [Roadmap](ROADMAP.md)

</div>

---

## 📖 Project Overview

**ZeroHunger** is a full-stack web application designed to bridge the gap between food surplus and food insecurity. By connecting **donors** (restaurants, bakeries, caterers) with **volunteers** and **recipients** (charities, shelters, food banks), we create a seamless food recovery ecosystem that:

- 🌍 **Reduces Food Waste** — Rescue perfectly good food from going to landfills
- 🤝 **Fights Hunger** — Deliver surplus food to those who need it most
- 🎯 **Empowers Communities** — Enable local volunteers to make real impact
- 📊 **Tracks Impact** — Gamified system rewards contributions and measures collective success

Built with modern web technologies and designed for scalability, ZeroHunger demonstrates how technology can solve real-world social problems.

---

## ✨ Key Features

### 🔐 **Authentication & Role-Based Access**

- Secure user registration and login with JWT tokens
- Three distinct roles: **Donor**, **Volunteer**, **Recipient**
- Role-specific dashboards with personalized workflows
- Protected routes with middleware-level security

### 🗺️ **Geolocation & Maps**

- Real-time location detection using browser geolocation API
- Interactive **Leaflet** maps showing nearby donations
- Distance-based filtering (5km, 10km, 25km, 50km radius)
- Visual markers for donation availability status
- Click-to-set location picker for donation creation

### 🎁 **Donation Management (Donor)**

- Create detailed food listings (title, quantity, expiry, location)
- Track donation lifecycle (Available → Claimed → Picked Up → Delivered)
- Receive instant notifications when claimed by volunteers
- Provide secure pickup codes for verification
- View comprehensive donation history

### 🚚 **Claim Workflow (Volunteer)**

- Discover and claim available donations
- Two-step verification: **Pickup** (with code) → **Delivery** (with notes)
- Real-time status updates throughout the process
- Earn **2x impact points** for completed deliveries
- Cancel claims if unable to complete (donation becomes available again)

### 🔔 **Notifications System**

- In-app notification center with unread badge
- Real-time updates for claims, pickups, and deliveries
- Toast notifications for instant feedback
- Animated bell icon with shake effect on new notifications
- Glassmorphic dropdown design with Framer Motion

### 👤 **Profile & Gamification**

- **Impact Score** tracking (visible across platform)
- Editable profile with location and contact settings
- Activity history and statistics dashboard
- Account settings and preferences

### 🎨 **Polish & Animations**

- Smooth page transitions powered by **Framer Motion**
- Micro-interactions on buttons, cards, and modals
- Loading skeletons for optimal perceived performance
- Responsive design (mobile-first approach)
- Dark mode support with system preference detection
- Reduced motion support for accessibility

---

## 🛠️ Tech Stack — The Arsenal

### **Core Framework**

| Technology     | Version | Purpose                                        |
| -------------- | ------- | ---------------------------------------------- |
| **Next.js**    | 16.x    | App Router, React Server Components, Turbopack |
| **TypeScript** | 5.x     | Type safety and developer experience           |
| **React**      | 19.x    | Component-based UI architecture                |

### **Styling & UI**

| Technology           | Version | Purpose                                    |
| -------------------- | ------- | ------------------------------------------ |
| **Tailwind CSS**     | v4      | Utility-first styling with design tokens   |
| **Shadcn UI**        | Latest  | Accessible, customizable component library |
| **Radix Primitives** | Latest  | Unstyled, accessible UI primitives         |
| **Lucide React**     | Latest  | Consistent iconography                     |
| **Framer Motion**    | 11.x    | Animation and transitions                  |

### **Data & Forms**

| Technology          | Version | Purpose                             |
| ------------------- | ------- | ----------------------------------- |
| **TanStack Query**  | v5      | Server state management and caching |
| **React Hook Form** | Latest  | Performant form handling            |
| **Zod**             | Latest  | Runtime schema validation           |
| **Axios**           | 1.x     | HTTP client with interceptors       |

### **Maps & Geolocation**

| Technology        | Version | Purpose                             |
| ----------------- | ------- | ----------------------------------- |
| **React-Leaflet** | 4.x     | Interactive maps with OpenStreetMap |
| **Leaflet**       | 1.x     | Core map library                    |

### **Developer Tools**

| Technology    | Purpose                              |
| ------------- | ------------------------------------ |
| **ESLint**    | Code quality and consistency         |
| **Prettier**  | Code formatting                      |
| **Turbopack** | Blazing-fast bundler (Next.js 16)    |
| **PNPM**      | Fast, disk-efficient package manager |

---

## 🚀 Getting Started

Follow these steps to run **ZeroHunger** locally on your machine.

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** — Version 18.18 or later ([Download](https://nodejs.org/))
- **PNPM** — Version 8.x or later (recommended) or npm/yarn
  ```bash
  npm install -g pnpm
  ```
- **Git** — For cloning the repository

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/zerohunger-frontend.git
   cd zerohunger-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

### **⚠️ Configuration (MANDATORY)**

The application requires an environment variable to connect to the backend API.

3. **Create environment file**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure API Base URL**

   Open `.env.local` and set the backend URL:

   ```bash
   # Laravel Backend (Default)
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

   # Java Spring Boot Backend (Alternative)
   # NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

   > **Note:** The architecture supports **two backends** (Laravel PHP and Java Spring Boot) with identical API contracts. Switch between them by changing only this environment variable.

### **Running the Development Server**

5. **Start the application**

   ```bash
   pnpm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

   The page auto-updates as you edit files thanks to **Fast Refresh**.

### **Building for Production**

To create an optimized production build:

```bash
pnpm run build
pnpm run start
```

---

## 📁 Project Structure

```
src/
├── app/                           # Next.js 16 App Router
│   ├── (auth)/                    # Auth route group (login, register)
│   ├── (dashboard)/               # Protected dashboards (donor, volunteer, recipient)
│   ├── donations/                 # Donation pages (list, create, detail, nearby)
│   ├── claims/                    # Claims management (volunteer)
│   ├── profile/                   # User profile and settings
│   ├── notifications/             # Notification center
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Tailwind v4 imports
│
├── components/
│   ├── ui/                        # Shadcn UI components (button, card, dialog, etc.)
│   ├── layout/                    # Navbar, Sidebar, Footer, MobileNav
│   ├── auth/                      # LoginForm, RegisterForm, AuthGuard
│   ├── donations/                 # DonationCard, DonationForm, DonationMap, ClaimButton
│   ├── claims/                    # ClaimCard, PickupDialog, DeliverDialog
│   ├── notifications/             # NotificationBell, NotificationList, NotificationItem
│   ├── profile/                   # ProfileHeader, ProfileEditForm, ImpactScoreCard
│   ├── dashboard/                 # Role-specific dashboard components
│   └── home/                      # Landing page sections (Hero, Features, HowItWorks)
│
├── lib/
│   ├── api.ts                     # Centralized API client (Axios + interceptors)
│   ├── utils.ts                   # Utility functions (cn, formatters)
│   ├── constants.ts               # App-wide constants (roles, statuses, routes)
│   └── validators/                # Zod schemas for forms
│
├── hooks/
│   ├── useAuth.ts                 # Authentication hook
│   ├── useGeolocation.ts          # Browser geolocation wrapper
│   ├── useUserRole.ts             # Role-based logic
│   └── useReducedMotion.ts        # Accessibility hook
│
├── context/
│   └── NotificationContext.tsx    # Notification state management
│
├── providers/
│   ├── AuthProvider.tsx           # Auth context provider
│   └── QueryProvider.tsx          # TanStack Query provider
│
├── types/
│   ├── api.ts                     # API response types
│   ├── auth.ts                    # User and auth types
│   ├── donation.ts                # Donation types
│   ├── claim.ts                   # Claim types
│   └── profile.ts                 # Profile types
│
└── middleware.ts                  # Route protection logic
```

---

## 🗓️ Roadmap & Development Status

This project follows a **phased implementation** approach. Below is the current progress:

### ✅ **Completed Stages**

- **Stage 1:** Project Foundation & Authentication

  - Next.js 16 setup with TypeScript and Tailwind v4
  - Centralized API client with environment abstraction
  - Complete auth flow (register, login, logout, token management)
  - Route protection with middleware

- **Stage 2:** Dashboard & Role-Based Views

  - Role-specific dashboards (Donor, Volunteer, Recipient)
  - Responsive sidebar navigation
  - Impact score display with gamification
  - Quick action cards and activity overview

- **Stage 3:** Donation Management (Donor)

  - Create donations with validation
  - View donation listings with filtering
  - Donation detail pages with timeline
  - Status tracking (Available → Claimed → Delivered)

- **Stage 4:** Claim Workflow (Volunteer)

  - Claim donations with race-condition handling
  - Pickup verification with secure codes
  - Delivery confirmation with notes
  - Claim cancellation flow

- **Stage 5:** Geolocation & Map Integration

  - Browser geolocation API integration
  - Interactive Leaflet maps with custom markers
  - Nearby donations with radius filtering
  - Location picker for donation creation

- **Stage 6:** Notifications System

  - In-app notification center with animations
  - Real-time updates for claims, pickups, deliveries
  - Unread badge with pulse effect
  - Toast notifications for instant feedback

- **Stage 7:** Profile & Settings

  - View and edit user profile
  - Location and contact information management
  - Impact score and activity history

- **Stage 8:** Polish, Animation & Accessibility
  - Framer Motion page transitions
  - Component micro-interactions
  - Loading skeletons and suspense boundaries
  - ARIA compliance and keyboard navigation
  - Responsive design across all breakpoints

### 🚧 **In Progress / Upcoming**

- **Stage 9:** Testing & Quality Assurance

  - Unit tests with Vitest
  - Integration tests with React Testing Library
  - E2E tests with Playwright
  - API mocking with MSW

- **Stage 10:** Deployment & Documentation
  - Vercel deployment with environment configuration
  - Performance optimization (code splitting, image optimization)
  - SEO setup with metadata API
  - Production monitoring setup

### 🔮 **Future Enhancements**

- **Community Features**

  - User ratings and reviews
  - Volunteer leaderboards
  - Community forums and discussion boards

- **Advanced Notifications**

  - Real-time WebSocket integration
  - Push notifications (PWA)
  - Email notification preferences

- **Chat System**

  - Direct messaging between donors and volunteers
  - Group chats for coordination
  - File/image sharing

- **Analytics Dashboard**
  - Platform-wide impact metrics
  - Food waste reduction statistics
  - Volunteer activity heatmaps

See the full [ROADMAP.md](ROADMAP.md) for detailed task breakdowns.

---

## 🏗️ Architecture Highlights

### **Environment Abstraction Pattern**

ZeroHunger uses a **centralized API client** to support multiple backend implementations:

```typescript
// .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000  // Laravel
// OR
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080  // Java Spring Boot
```

All API calls go through `lib/api.ts`, which:

- Automatically injects the base URL from environment variables
- Attaches Bearer tokens via request interceptors
- Handles errors globally (401 → logout, 422 → validation, 500 → error boundary)
- Provides typed responses with `ApiResponse<T>` wrapper

**No code changes required** to switch backends — only the environment variable.

### **Type Safety**

- **Zero `any` types** — All API responses use TypeScript generics
- **Runtime validation** — Zod schemas validate data at boundaries
- **Contract enforcement** — Types match `docs/API-CONTRACT.md` exactly

### **State Management Strategy**

- **Server State** — TanStack Query (caching, mutations, optimistic updates)
- **Auth State** — React Context with localStorage persistence
- **Notification State** — React Context with local actions
- **Form State** — React Hook Form with controlled inputs

---

## 📚 Documentation

- **[API Contract](docs/API-CONTRACT.md)** — Complete backend API specification
- **[Project Overview](docs/PROJECT-OVERVIEW.md)** — High-level system architecture
- **[Roadmap](ROADMAP.md)** — Detailed development phases and task tracking
- **[Motion System](docs/MOTION-SYSTEM.md)** — Animation guidelines and Framer Motion patterns

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage

Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

Built with passion by the **CodeMavericks** team as part of a mission to leverage technology for social good.

**Special Thanks:**

- [Next.js Team](https://nextjs.org/) for the incredible framework
- [Shadcn](https://ui.shadcn.com/) for the beautiful component library
- [OpenStreetMap](https://www.openstreetmap.org/) for free mapping data
- All open-source contributors whose libraries made this possible

---

<div align="center">

**Made with ❤️ to fight food waste and hunger**

[⬆ Back to Top](#-zerohunger)

</div>
