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
├── frontend/             # React application (UI)
│   ├── src/
│   │   ├── components/   # React UI components (Login, StudentList, etc.)
│   │   └── App.tsx       # Main React entry component
├── src/                  # Express Node.js backend
│   ├── configuration/    # Database connection setup
│   ├── controllers/      # API route handlers & logic
│   ├── database/         # SQL schema & seed files
│   └── index.ts          # Server entry point
└── README.md
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
