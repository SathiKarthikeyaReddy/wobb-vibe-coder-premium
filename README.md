# Wobb Vibe Coder Assignment - Premium Redesign

This repository contains the completed frontend take-home assignment for the Vibe Coder Intern role at Wobb. The objective was to fix existing bugs, migrate state management, and overhaul the UI/UX. I decided to elevate the project to a **professional-grade, premium standard**, incorporating modern design paradigms like glassmorphism, fluid animations, and a responsive dark theme.

## 🚀 Live Repository
https://github.com/SathiKarthikeyaReddy/wobb-vibe-coder-premium

## ✨ What Was Changed?

1. **Bug Fixes & Refactoring**
   - **Search Logic**: Fixed the case-sensitive filtering bug in `dataHelpers.ts` to ensure robust searches.
   - **Data Calculation**: Corrected the engagement rate formatting error in the profile details (changing the multiplier from `* 10000` to `* 100`).
   - **Optimization**: Removed unnecessary `clickCount` state in the search page that was causing redundant re-renders.

2. **State Management Migration**
   - Completely replaced the standard prop-drilling/Context setup with **Zustand**. 
   - Created `useListStore` to manage the "Shortlisted Profiles" feature.
   - Implemented Zustand's `persist` middleware to ensure the shortlist is saved to `localStorage` and persists across page reloads.

3. **Premium UI/UX Redesign**
   - **Design System**: Built a modern, sleek interface using **Tailwind CSS v4** featuring glassmorphism (`backdrop-blur`), carefully calibrated typography (Inter font), and an 8pt spacing grid.
   - **Micro-Interactions**: Used **Framer Motion** to add fluid enter/exit animations to the shortlist sidebar and animated segmented tabs for platform filtering.
   - **Dark Mode**: Integrated full dark mode support across the entire application using CSS variables and Tailwind's `dark:` variant, complete with a manual theme toggle.
   - **User Feedback**: Replaced generic alerts with professional toast notifications using **Sonner**.

4. **Component Architecture**
   - Rebuilt `Layout.tsx` to include a sticky navigation bar with a dynamic shortlist badge.
   - Introduced `ShortlistSidebar.tsx` as a sleek slide-out drawer for managing the selected profiles.
   - Redesigned `ProfileCard.tsx` and `ProfileDetailPage.tsx` to resemble premium dashboard analytics views.

## 📦 Libraries Added

- **`zustand`**: For lightweight, scalable, and persistent global state management.
- **`framer-motion`**: For layout transitions, spring animations, and micro-interactions.
- **`lucide-react`**: For clean, modern, and consistent iconography.
- **`sonner`**: For highly customizable and beautiful toast notifications.
- **`usehooks-ts`**: Specifically used for `useDebounceValue` (optimizing search) and `useDarkMode`.
- **`clsx` & `tailwind-merge`**: For robust, conditional utility class management.

## 🤔 Assumptions Made
- The prompt mentioned "Replace React Context with Zustand". Since no React Context existed in the starter code, I assumed this meant implementing the new global state (the Shortlist) strictly using Zustand to demonstrate state management competency.
- Assumed the target audience prefers a modern "dashboard-like" aesthetic, leaning into clean metrics displays and immediate feedback.

## ⚖️ Trade-offs
- **Bundle Size vs. UX**: Adding libraries like `framer-motion` increases the initial bundle size. However, the trade-off was deemed acceptable for a "Vibe Coder" role where a premium user experience and "wow" factor are heavily prioritized.
- **Local Storage**: For the shortlist persistence, I used standard browser `localStorage`. In a real production application with user authentication, this state would ideally be synced with a remote database.

## 🔮 Remaining Improvements
- **Code Splitting**: Implementing `React.lazy` and `Suspense` for the `ProfileDetailPage` to further optimize the initial load time.
- **Virtualization**: If the JSON profile list grows to thousands of entries, a library like `react-window` or `@tanstack/react-virtual` should be used to render the `ProfileList` efficiently.
- **Testing**: Adding a test suite using `Vitest` and `React Testing Library` to unit test the Zustand store and component rendering.

## 🛠️ Running Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev

# Build for production
npm run build
```
