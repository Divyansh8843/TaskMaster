# Secure TaskMaster - MERN Stack Assignment

This project is a scalable, secure, and modern web application built as part of the Frontend/Backend Developer Intern assignment. It features a complete authentication system (Google OAuth2 + JWT), a responsive dashboard, and full CRUD capabilities for task management.

![TaskMaster Dashboard](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3)

## 🚀 Features

### Frontend (React + Vite + TailwindCSS)
- **Modern UI/UX**: Designed with Glassmorphism, Gradients, and smooth animations using Framer Motion.
- **Responsive Design**: Fully responsive layout optimized for Mobile, Tablet, and Desktop.
- **Authentication**: 
  - Google OAuth2 Integration
  - Email/Password Login & Registration
  - Protected Routes & Persistent Sessions (HTTP-Only Cookies)
- **Dashboard**:
  - Real-time Task Statistics
  - Task Management (Create, Read, Update, Delete)
  - Search & Filtering
  - Dynamic Status Badges

### Backend (Node.js + Express + MongoDB)
- **Security**:
  - BCrypt Password Hashing
  - JWT Access & Refresh Tokens
  - HTTP-Only Cookies (XSS Protection)
  - Helmet for Security Headers
- **API**:
  - RESTful Endpoints
  - Role-Based Access Control (RBAC foundation)
  - Input Validation
- **Database**:
  - MongoDB with Mongoose Schemas
  - Data Relations (Users <-> Tasks)

## 🛠 Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Framer Motion, Axios, Lucide React
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, JWT, Google Auth Library
- **Tools**: Vite, PostCSS, ESLint

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI or Local MongoDB

### 1. Clone the Repository
```bash
git clone <repository-url>
cd oauth-assignment
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (see `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmaster
JWT_SECRET=supersecretkey123
JWT_REFRESH_SECRET=refreshsecretkey123
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (see `.env.example`):
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

## 📚 Documentation

- **[API Documentation](API_DOCS.md)**: Detailed list of all API endpoints.
- **[Scalability Strategy](SCALABILITY.md)**: Thoughts on scaling the frontend-backend integration.

## 🎨 Design Decisions

- **TailwindCSS**: Chosen for rapid development and highly customizable utility-first styling.
- **Framer Motion**: Used to add "impactful" entrance animations and smooth layout transitions for a premium feel.
- **TypeScript**: Used across the full stack for type safety and better developer experience.
- **Component Architecture**: Modular components (`TaskCard`, `TaskModal`, `Navbar`) for maintainability.

---

**Developed for Prime Trade AI Assignment**
