# SEO Marketplace Platform

A full-stack marketplace platform that connects website owners (clients) with SEO experts.

Clients can create SEO needs, browse experts, send collaboration requests, and start conversations.
Experts can create expert profiles, browse open needs, receive requests, and communicate after acceptance.

---

## Features

### Authentication

* Register as client or expert
* Login with JWT authentication
* Protected routes

---

### Client Features

* Create and manage SEO needs
* Browse experts
* View expert profiles
* Send relation requests
* Track request status
* Send messages after acceptance

---

### Expert Features

* Create expert profile
* Browse client needs
* Send requests to clients
* Accept or reject requests
* Message clients after acceptance

---

### Shared Features

* Dashboard
* Profile management
* Relation status filters (pending / accepted / rejected)
* Messaging system
* Mobile-first responsive UI

---

## Tech Stack

### Frontend

* React
* React Router
* CSS (mobile-first)

### Backend

* Node.js
* Express
* Sequelize
* PostgreSQL
* JWT Authentication
* Zod validation

---

## Project Structure

```
frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
    styles/

backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routers/
    schemas/
```

---

## Installation

### 1. Clone repository

```bash
git clone <your-repository-url>
cd seo-marketplace-platform
```

---

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

---

### 3. Create PostgreSQL database

```sql
CREATE DATABASE seo_marketplace;
```

---

### 4. Configure environment variables

Create a `.env` file inside `/backend`:

```
PORT=3000
DB_NAME=seo_marketplace
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
JWT_SECRET=your_secret_key
```

---

### 5. Start backend

```bash
cd backend
npm run dev
```

---

### 6. Start frontend

```bash
cd frontend
npm run dev
```

---

## Demo Flow

### Client

1. Register as client
2. Create profile
3. Create a need
4. Browse experts
5. Send a request
6. Track relation status
7. Start messaging after acceptance

---

### Expert

1. Register as expert
2. Create profile + expert profile
3. Browse needs
4. Send or receive requests
5. Accept or reject requests
6. Start messaging after acceptance

---

## API Overview

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Profiles

* POST /api/profiles
* GET /api/profiles/me

### Expert Profiles

* POST /api/expert-profiles
* GET /api/expert-profiles/me
* GET /api/expert-profiles/:id

### Needs

* POST /api/needs
* GET /api/needs/me
* GET /api/needs

### Relations

* POST /api/relations
* GET /api/relations/me
* PATCH /api/relations/:id/accept
* PATCH /api/relations/:id/reject

### Messages

* POST /api/messages
* GET /api/messages/:relationId

### Users

* GET /api/users/experts

---

## Current Status

This project is an MVP+ full-stack application with:

* authentication system
* role-based logic (client / expert)
* needs and expert browsing
* relation requests and status handling
* messaging system for accepted relations
* responsive frontend

---

## Future Improvements

* search and filters for experts
* pagination
* reviews and ratings
* real-time chat
* notifications
* deployment

---

## Author

Levan Batmanishvili
