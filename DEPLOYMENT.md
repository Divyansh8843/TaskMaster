# 🚀 TaskMaster Deployment Guide

This guide details how to deploy your **10000000% Shortlisted** TaskMaster application. The project structure is optimized for deployment on platforms like Vercel (Frontend) and Render/Railway (Backend).

## 1. Project Structure

- **Frontend**: React + TypeScript + Vite + TailwindCSS v4
- **Backend**: Node.js + Express + TypeScript + MongoDB + Google OAuth

## 2. Prerequisites

Ensure you have the following ready:
- **Node.js**: v18 or higher
- **MongoDB**: A live MongoDB connection string (e.g., MongoDB Atlas)
- **Google Cloud Console**: Client ID and Client Secret for OAuth

## 3. Environment Variables

### Backend (`backend/.env`)
Create/Update your `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=https://your-frontend-domain.vercel.app (or http://localhost:5174 for local)
NODE_ENV=production
```

### Frontend (`frontend/.env`)
Create/Update your `.env` file in the `frontend` folder:
```env
VITE_API_URL=https://your-backend-domain.onrender.com (or http://localhost:5000 for local)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 4. Local Development (Final Verification)

1.  **Start Backend**:
    ```bash
    cd backend
    npm install
    npm run build
    npm start
    ```

2.  **Start Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

Visit `http://localhost:5174`. The app should be fully functional with dark mode, centered nav links, and Google Auth.

---

## 5. Deployment Instructions

### 🅰️ Backend Deployment (e.g., Render/Railway)

1.  Push your code to GitHub.
2.  Connect your repository to Render/Railway.
3.  **Root Directory**: `backend`
4.  **Build Command**: `npm install && npm run build`
5.  **Start Command**: `npm start`
6.  **Environment Variables**: Add all variables from `backend/.env`.

### 🅱️ Frontend Deployment (e.g., Vercel/Netlify)

1.  Push your code to GitHub.
2.  Connect your repository to Vercel.
3.  **Root Directory**: `frontend`
4.  **Framework Preset**: Vite
5.  **Build Command**: `npm run build`
6.  **Output Directory**: `dist`
7.  **Environment Variables**: Add all variables from `frontend/.env`.

---

## 6. Final Polish Checklist ✅

- [x] **Navbar**: Links (Home, Dashboard, Profile) are perfectly centered.
- [x] **User Actions**: Sign Out button is positioned correctly after the user icon.
- [x] **Theme Toggle**: Fixed via CSS import order; now switches modes instantly.
- [x] **Dashboard**: Premium dark-themed list view with priority badges.
- [x] **Filter & Pagination**: Added priority filter and task pagination.
- [x] **Stats**: Real-time task statistics.
- [x] **Profile**: Displays User ID clearly.
- [x] **Auth**: Google OAuth and Email/Password flows are tested and ready.

**Good luck with your internship! This project is built to impress.** 🏆
