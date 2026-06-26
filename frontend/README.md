# 🔍 CampusConnect — Lost & Found Platform

> A modern, full-stack Lost & Found platform designed for college campuses. Report lost items, discover found belongings, and reconnect with your campus community.

---

## ✨ Features

### Core Features
- 🔐 **User Authentication** — Secure registration and login with JWT tokens
- 📝 **Post Items** — Report lost or found items with title, description, category, location, and image
- 🔍 **Search & Filter** — Search items by title/category and filter by status (Lost / Found)
- ✋ **Claim System** — Submit claims on items with a message, item owners can accept or reject
- 📊 **Live Statistics** — Real-time counts of total, lost, found, and resolved items
- 📋 **Dashboard** — Personal dashboard to manage your posted items
- 📨 **Claim Management** — View and respond to incoming claim requests
- 🔔 **Notification Badge** — See pending claim count in the navbar

### UI/UX Highlights
- 🌙 **Dark Glassmorphism Theme** — Premium dark UI with frosted glass effects
- ✨ **Animated Gradients** — Beautiful purple accent gradient system
- 🎯 **Hero Section** — Engaging landing page with animated text and CTAs
- 🍞 **Toast Notifications** — Elegant, auto-dismissing notification system
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile devices
- 🎨 **Modern Design System** — CSS custom properties, Inter font, consistent spacing
- 🔄 **Loading Spinners** — Smooth animated loading states
- 🖼️ **Drag & Drop Upload** — Image upload with drag-and-drop and preview

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router v7, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **HTTP Client** | Axios |
| **Styling** | Vanilla CSS (Glassmorphism Design System) |
| **Image Upload** | Multer + Cloudinary |

---

## 📁 Project Structure

```
campusconnect/
├── frontend/                    # React Frontend (Vite)
│   ├── index.html               # HTML entry with SEO meta tags
│   ├── src/
│   │   ├── main.jsx             # App entry point with providers
│   │   ├── App.jsx              # Root component with routing
│   │   ├── App.css              # Component & layout styles
│   │   ├── index.css            # Design system & global styles
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation with mobile menu
│   │   │   ├── Footer.jsx       # Professional footer
│   │   │   ├── Toast.jsx        # Toast notification system
│   │   │   ├── LoadingSpinner.jsx # Animated loading spinner
│   │   │   ├── StatsBar.jsx     # Animated statistics bar
│   │   │   └── ProtectedRoute.jsx # Auth route guard
│   │   └── pages/
│   │       ├── Home.jsx         # Landing + item browse page
│   │       ├── Login.jsx        # Authentication - Sign In
│   │       ├── Register.jsx     # Authentication - Sign Up
│   │       ├── Dashboard.jsx    # User's item management
│   │       ├── CreateItem.jsx   # Create new item post
│   │       ├── EditItem.jsx     # Edit existing item
│   │       ├── ClaimRequests.jsx # Manage incoming claims
│   │       └── MyClaims.jsx     # Track submitted claims
│   └── package.json
│
├── backend/                     # Express Backend
│   ├── server.js                # Express app setup
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (register/login)
│   │   ├── itemController.js    # Item CRUD operations
│   │   └── claimController.js   # Claim management
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Item.js              # Item model
│   │   └── Claim.js             # Claim model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── itemRoutes.js        # Item endpoints
│   │   └── claimRoutes.js       # Claim endpoints
│   ├── middlewares/             # Auth middleware
│   └── package.json
│
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or above)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd campusconnect
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the app
Navigate to `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/my-items` | Get logged-in user's items |
| GET | `/api/items/:id` | Get single item |
| POST | `/api/items` | Create a new item (auth required) |
| PUT | `/api/items/:id` | Update an item (auth required) |
| DELETE | `/api/items/:id` | Delete an item (auth required) |

### Claims
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/claims` | Submit a claim request |
| GET | `/api/claims/my-claims` | Get claims on your items |
| GET | `/api/claims/my-submissions` | Get your submitted claims |
| GET | `/api/claims/pending-count` | Get pending claim count |
| PUT | `/api/claims/:id` | Accept or reject a claim |

---

## 🔮 Future Enhancements

- 📧 Email notifications when claims are accepted/rejected
- 💬 In-app messaging between item owner and claimant
- 🗺️ Map integration to show item locations
- 📸 Multiple image uploads per item
- 👑 Admin panel for campus authorities
- 📊 Analytics dashboard with charts
- 🔍 Advanced search with date range filters

---

## 👨‍💻 Author

**CampusConnect Team**

Built as a Full Stack Development College Project.

---

## 📄 License

This project is built for educational purposes as part of a college curriculum.
