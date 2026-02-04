# St. Matthias Youth Valentine 2025

A **fun, interactive Valentine web app for the St. Matthias Youth Ministry**, built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.  
This app encourages participants to engage in **acts of love and faith-based challenges** while visually tracking their impact on a growing love chain. It’s mobile-friendly, lightweight, and entirely Christ-centered.

---

## 🎯 Features

- **Love Challenge Spinner**
  - Spin to receive a **daily love challenge** inspired by Biblical principles.
  - Examples: pray for someone, encourage a friend, forgive an offense.
  - Each completed challenge is tracked and visualized.

- **Love Chain**
  - Visual representation of all completed acts of love.
  - Hearts appear dynamically for each action completed.
  - Encourages **collective reflection** and participation.

- **Verse Card**
  - Displays a short **Scripture verse (AMP)** after completing a challenge.
  - Provides inspiration and reinforces **faith in action**.

- **Mobile-First Design**
  - Fully responsive and optimized for smartphones.
  - Designed for **youth participation** without complex login.

- **Clean, Church-Appropriate UI**
  - Soft Valentine color palette
  - Elegant typography and subtle animations
  - No romance-only content; focused on **love in action**

---

## 🛠 Technology Stack

- **Frontend Framework:** Next.js (React)  
- **Styling:** Tailwind CSS  
- **Animation:** Framer Motion  
- **Icons:** Lucide Icons  
- **State Management:** `useState` + `useEffect` (localStorage for persistence)  
- **Deployment (optional):** Vercel  

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Chijioke-larryson/-valentin-app.git
cd -valentin-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### 🌐 Build for Production
```bash
npm run build
npm run start
```

Or deploy directly to Vercel for free with:

```bash
vercel
```

---

## 📁 Project Structure

```
app/
 ├─ page.tsx           # Main page with Spinner + Love Chain
 ├─ layout.tsx         # Global layout
 └─ globals.css        # Tailwind + global styles

components/
 ├─ LoveSpinner.tsx    # Spinner component
 ├─ LoveChain.tsx      # Heart chain visualization
 ├─ VerseCard.tsx      # Displays scripture after challenges
 └─ Header.tsx         # Hero section with header & tagline

lib/
 ├─ challenges.ts      # Array of challenges
 └─ verses.ts          # Array of Bible verses (AMP)

public/
 └─ assets/            # Images, icons, background graphics
```
