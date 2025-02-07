Chainx Financial Asset Management Dashboard: Technical Requirements
Project Overview

The project involves developing a modern, responsive user interface for the Chainx Financial Asset Management Dashboard, enabling users to monitor and manage financial assets effectively. The frontend will be built using:

    Next.js (v14+) with App Router for routing, static/hybrid rendering, and performance optimization.

    Tailwind CSS (v3.3+) for utility-first styling and design consistency.

    TypeScript (Strict Mode) for robust type safety and maintainability.

    Recharts for interactive data visualizations.

    date-fns for date formatting and manipulation.

Technical Requirements
Core Technologies

    Next.js (v14+)

        Implement App Router for routing and layout management.

        Use Static Site Generation (SSG) for non-dynamic pages (e.g., /dashboard).

        Enable Incremental Static Regeneration (ISR) for hybrid rendering where applicable.

    Tailwind CSS (v3.3+)

        Define a global theme in styles/theme.ts (e.g., color palette, spacing scales).

        Ensure responsive design using mobile-first breakpoints (e.g., md:grid-cols-2).

    TypeScript

        Enforce strict type checking for all components and data structures.

        Validate API responses and mock data using Zod during development.

    Recharts

        Implement accessible charts (e.g., aria-label for screen readers).

        Ensure cross-browser compatibility for SVG-based visualizations.

State Management

    Context API for global state (e.g., theme, user preferences, asset data).

    Avoid third-party state libraries (Redux/Zustand) unless complexity necessitates their use.

Performance Optimization

    Lazy loading for non-critical components (e.g., charts, modals) via React.lazy().

    Code splitting at the route level using Next.js dynamic imports.

    Optimize images with next/image and enforce modern formats (WebP/AVIF).

Structural Requirements
Directory Structure
markdown
Copy

src/  
├── app/  
│   └── dashboard/              # Dashboard page (Next.js App Router)  
├── components/  
│   ├── dashboard/              # Dashboard-specific components  
│   │   ├── Sidebar/            # Collapsible navigation  
│   │   ├── TotalAssets/        # Asset value display  
│   │   └── DistributionChart/  # Recharts pie/bar chart  
│   └── shared/                 # Reusable components  
│       ├── cards/              # Card layouts  
│       └── loaders/            # Skeleton UI components  
├── types/                      # TypeScript interfaces (e.g., `Asset`, `User`)  
├── data/                       # Mock data (e.g., `mockInvestments.ts`)  
└── styles/                     # Tailwind config and global CSS  

Functional Requirements
Dashboard Page

    Core Features

        Display real-time market summaries, total asset value, investment distribution, and annual profit.

        Collapsible sidebar with navigation links (Portfolio, Analytics, Community).

        Interactive UpgradeBanner with a CTA for premium plan upgrades.

    Key Components

        TotalAssets: Show total value (USD) and annual percentage change.

        DistributionChart: Pie/bar chart for asset allocation (Stocks, Bonds, Mutual Funds).

        ProfitSummary: Annual profit/loss breakdown with YoY comparisons.

        MarketOverview: Real-time metrics (e.g., indices, trending assets).

    Interactivity

        Dynamic data updates when filters (e.g., date range, asset type) are applied.

        Smooth animations for state transitions (e.g., loading spinners, chart updates).

Styling & Responsiveness
Design Guidelines

    Tailwind Utility Classes: Enforce consistent spacing, typography, and color schemes.

    Dark/Light Themes: Implement toggleable themes via CSS variables and Context API.

    Accessibility:

        Minimum text contrast ratio of 4.5:1 (WCAG AA compliance).

        Semantic HTML and ARIA labels for charts and interactive elements.

Responsive Layouts

    Mobile-first approach for screens <768px (e.g., hamburger menu for sidebar).

    Flexible grid layouts using grid-cols-1 md:grid-cols-2 lg:grid-cols-4.

Best Practices
Code Quality

    Atomic Design Principles: Organize components into atoms (buttons), molecules (cards), and organisms (sidebar).

    ESLint/Prettier: Enforce consistent code formatting and linting rules.

    Error Handling: Implement loading/error states (e.g., isLoading, error variables).

TypeScript Standards

    Strictly type all component props (e.g., interface ProfitSummaryProps).

    Validate API responses with Zod schemas during development.