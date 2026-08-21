# Student & Teacher Management System

A full-stack web application designed for school administration to manage student records and handle secure teacher authentication.

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** Node.js, Express, TypeScript
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens), Bcrypt

## Key Features

* **Teacher Authentication:** Secure login for authorized teachers using email and password.
* **First-Time Password Setup:** Pre-authorized teachers can set up their password on their initial login.
* **Student Record Management:** View and display student information (Name, Age, Email).
* **Database Seeding:** Automatic schema generation and seed scripts for initial data setup.

## Project Structure

```text
students/
├── frontend/                   # React Frontend Client
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard.tsx   # Dashboard view for managed data
│   │   │   └── Login.tsx       # Authentication interface
│   │   ├── App.tsx             # Root application component
│   │   ├── main.tsx            # Entry point for React DOM
│   │   ├── index.css           # Global frontend styles
│   │   └── vite-env.d.ts       # Vite environment types
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   └── vite.config.ts          # Vite bundler configuration
│
├── src/                        # Node.js / Express Backend API
│   ├── configuration/          # DB connection setup (database.ts)
│   ├── controllers/            # Route handlers (authController, studentController)
│   ├── database/               # SQL schema (schema.sql) & seed script (seed.ts)
│   ├── middlewares/            # Custom JWT & error handling middlewares
│   ├── models/                 # Data interfaces & TypeScript definitions
│   ├── repositories/           # Database access layer (queries & persistence)
│   ├── routes/                 # API endpoint routing declarations
│   └── index.ts                # Main Express server entry point
│
├── .env                        # Environment variables configuration
├── package.json                # Backend dependencies & run scripts
└── README.md                   # Project documentation
```

## Setup and Installation
1. Prerequisites
- Node.js (v18+)
- PostgreSQL server running locally

2. Backend Setup
**Install dependencies:**
```bash
npm install
```

**Configure your environment variables or database connection in `src/configuration/database.ts`.**

**Run the database seed script to set up tables and initial data:**
```bash
npx tsx src/database/seed.ts
```

**Start the `backend` development server:**
```bash
npm run dev
```

3. Frontend Setup
**Navigate to the `frontend` directory:**
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```
**Start the Vite development server:**
```bash
npm run dev
```

## How Authentication Works
- **Pre-Authorization:** Teachers' emails are pre-seeded in the database by an administrator without a password (`NULL`).
- **First Login / Registration:** When a teacher enters their authorized email for the first time, they can set up their own personal password.
- **Login:** Once configured, teachers authenticate using their email and newly created password to obtain a JWT token for secure API access.
