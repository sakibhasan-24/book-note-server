# 📒 Note Organizer App – Backend (MERN + TypeScript)

A scalable, modular backend API built using **Node.js**, **Express**, **TypeScript**, and **MongoDB** for a note-organizing application. Designed with best practices including **SOLID design principles**, proper **LLD**, and extensibility to handle features like authentication, image upload, and categorization.

---

## 🚀 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB Atlas** + **Mongoose**
- **Zod** – schema validation
- **Cloudinary** – for image uploads
- **Multer** – file handling middleware
- **dotenv**, **cors**

---

## ✅ Features (Backend)

- ✅ RESTful API (CRUD operations)
  - Create / Read / Update / Delete **Notes**
  - Manage **Note Categories**
  - User **Authentication** (Signup/Login)
- ✅ Image Upload to Cloudinary
- ✅ Filter Notes by Category
- ✅ Search Notes
- ✅ Autosave (planned)
- ✅ Pagination support
- ✅ Organized with SOLID principles
- ✅ Clean Low-Level Design (LLD) and scalable architecture

---

## 📁 Folder Structure

## 📁 Folder Structure

```bash
notebook-backend/
├── src/
│   ├── app.ts                   # Express app configuration
│   ├── server.ts                # Main server entry point
│   ├── config/                  # App-level config (DB, Cloudinary, etc.)
│   │   └── db.ts                # MongoDB connection logic
│   ├── modules/                 # Feature-based module folders
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── user.model.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.validator.ts
│   │   ├── note/
│   │   │   ├── note.controller.ts
│   │   │   ├── note.routes.ts
│   │   │   ├── note.model.ts
│   │   │   ├── note.service.ts
│   │   │   └── note.validator.ts
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.middleware.ts
│   │   └── category/
│   │       ├── category.controller.ts
│   │       ├── category.routes.ts
│   │       └── category.model.ts
│   ├── middlewares/             # Common middlewares (auth, errorHandler, etc.)
│   ├── utils/                   # Utility functions (logger, uploader, etc.)
│   ├── types/                   # Global & shared TypeScript types
├── .env                         # Environment variables
├── tsconfig.json                # TypeScript compiler config
└── package.json                 # Project metadata and dependencies
```


---



---

## 🚦 Running the App

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Run in Development

```bash
npm run dev
```

### 🛠 Build for Production

```bash
npm run build
```

---

## 📌 Current Modules to be Added

- `Note` Model & Controller
- `Category` Model & Controller
- `User` Authentication
- `Cloudinary` Integration
- `Note Filtering & Pagination`
- `Search & Autosave`
- `Tests` (Jest)

---

## 🔐 Auth Strategy (Planned)

- JWT-based login system
- Secure routes using middleware
- Password hashing with bcrypt

---

## 📈 Design Principles Applied

- ✅ **SOLID Principles**
- ✅ **Low-Level Design (LLD)**
- ✅ **Separation of Concerns**
- ✅ **Environment Agnostic Configuration**
- ✅ **Modular Route & Controller Setup**

---

## 🤝 Contributions

Want to help improve this boilerplate or add new features? Feel free to fork and submit a PR.

---

## 🧠 Author Note

This project was created as part of an advanced full-stack development challenge to demonstrate real-world MERN architecture and clean design — suitable for high-scale production.

---