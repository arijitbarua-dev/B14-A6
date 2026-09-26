# FitLog - Gym & Workout Tracker

FitLog is a dark-themed, modern, and high-performance gym companion web application designed for fitness enthusiasts to discover exercises, structure daily workout plans, and track training sessions with intent.

---

## 📖 Description

FitLog provides a sleek, distraction-free environment for organizing workout routines. Users can explore a comprehensive library of exercises covering major muscle groups, review detailed step-by-step instructions and metrics, lock up to 5 target exercises into today's active plan, save workouts for later reference, and keep track of daily session metrics like total time and estimated calorie burn.

---

## 🛠️ Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
- **State & Data Persistence**: Browser `localStorage` with custom window event dispatching (`fitlog-storage-update`) for real-time reactivity
- **Data Fetching**: REST API integration with Next.js Server Components and revalidation strategies
- **Fonts & Design System**: Next.js `geist/font` with modern dark UI color palette

---

## ✨ Features

1. **🏋️ Comprehensive Workout Library**: Browse a rich catalog of workouts categorized by muscle groups (e.g., Chest, Back, Legs, Core), equipment required, duration, calories burned, and user ratings.
2. **📋 Detailed Exercise Guides**: Dedicated page for each workout containing step-by-step execution instructions, difficulty rating, targeted sets and reps, and equipment requirements.
3. **📅 Daily Routine Planner ("Today's Plan")**: Add up to 5 target exercises to your active daily plan to keep workouts focused, structured, and achievable.
4. **🔖 Saved Workouts Bookmark System**: Easily bookmark exercises into a "Saved" collection for quick access in future sessions.
5. **📊 Live Session Analytics Dashboard**: Real-time statistics calculating total planned exercises, accumulated workout duration (in minutes), and total estimated calorie burn.
6. **🔀 Dynamic Sorting Options**: Sort planned and saved workouts on the fly by **Duration**, **Calories Burned**, or **Rating**.
7. **⚡ Real-time Navigation & Multi-Tab Sync**: Dynamic navbar counters for plan and saved counts that auto-update across components and active browser tabs without page reloads.
8. **✅ Mark as Done & Quick Management**: Mark exercises as completed with a single click, removing them from today's plan while updating session stats in real time.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint code quality checks.

