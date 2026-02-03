# HireOB

A web-based job portal (HireOB) with a React + Vite frontend and a Node.js/Express backend. The frontend provides pages and components for job browsing, recent listings, and company information. The backend handles job, user, and application APIs, file upload (resumes), and integrations with MongoDB and Redis.

---

## Table of Contents

- [Demo / Preview](#demo--preview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Run Backend](#run-backend)
  - [Run Frontend](#run-frontend)
  - [Build & Production](#build--production)
- [Uploads & File Constraints](#uploads--file-constraints)
- [Code Quality & Linting](#code-quality--linting)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

## Demo / Preview

(If you have a deployed demo, link it here.)

---

## Features

- Job listings and browsing
- Recent jobs widget
- Browse categories and hero section
- Resume uploads (PDF)
- Backend APIs for authentication, jobs, and applications
- Redis-based rate limiting and cron job (job expiry) support

---

## Tech Stack

- Frontend: React, Vite, React Router, React Icons
- Backend: Node.js, Express
- Database: MongoDB
- Cache/Rate limiting: Redis
- File upload: Multer (disk storage for resumes)
- Linting: ESLint
- Tooling: npm (or yarn), Vite

---

## Project Structure

Root-level layout (abridged):

- frontend/
  - index.html
  - package.json
  - vite.config.js
  - src/
    - main.jsx
    - App.jsx
    - pages/
      - Home/
      - Jobs/
    - components/
      - NavBar/
      - Footer/
      - RecentJobs/
      - JobCard/
      - Hero Section/
      - BrowseCategory/
      - Adv/
- backend/
  - package.json
  - server.js
  - configs/
    - mongodb.js
    - redis.js
    - upload.js
  - controllers/
    - job.controller.js
    - user.controller.js
    - application.controller.js
  - middlewares/
    - auth.js
    - rateLimiter.js
    - redisRateLimiter.js
    - role.js
    - token.js
  - models/
    - Job.js
    - User.js
    - Application.js
  - routes/
    - job.routes.js
    - auth.routes.js
    - application.routes.js
  - cron/
    - JobExpiry.js
  - utils/
  - uploads/
    - resume/  (resume files stored here by multer)

(See backend/README.md and frontend/README.md inside the repo for more details on each side.)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or hosted)
- Redis (if using the Redis rate limiter)
- Optional: `serve` or a static-file host to preview frontend build

### Environment Variables

Create a `.env` (or use your environment) for the backend. Example `.env.example`:

```env
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hireob
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

Notes:
- The backend reads MongoDB and Redis connection details from configs (see `backend/configs/mongodb.js` and `backend/configs/redis.js`).
- Resume upload directory: `backend/uploads/resume` (created at runtime or ensure it exists and is writable).

### Run Backend

From the repository root or inside `backend/`:

```bash
cd backend
npm install
# If package.json has a dev script (nodemon), use:
npm run dev
# otherwise to start:
npm start
```

The backend server typically runs on the port specified in `PORT` (default 5000).

### Run Frontend

From the repository root or inside `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

Vite's dev server will run and print the local/dev URL (e.g. http://localhost:5173).

To view the app, open the browser to the frontend dev server (default Vite port) and ensure the backend is running for API calls.

### Build & Production

Frontend build:

```bash
cd frontend
npm run build
# preview the production build
npm run preview
```

Backend production:
- Use your process manager (pm2, systemd, Docker, etc.) to run `node server.js` or the appropriate start command.
- Ensure environment variables are set for production (MongoDB URI, JWT secret, Redis).

---

## Uploads & File Constraints

The backend uses Multer to accept resumes. Important constraints (see `backend/configs/upload.js`):

- Destination: `backend/uploads/resume`
- Allowed file type: PDF only (`application/pdf`)
- Max file size: 2 MB

If a user uploads a non-PDF or a file larger than 2 MB, the upload middleware will reject the request.

---

## Code Quality & Linting

- Frontend contains an ESLint configuration at `frontend/eslint.config.js`.
- Consider running lint and formatting checks before committing.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-change`
3. Make changes, add tests if applicable, run linters.
4. Open a Pull Request describing the change.

If you'd like, I can prepare a PR that adds this README into the repo — tell me which branch to target.

---

## Known Gaps & Next Improvements

- Add comprehensive backend API docs (Swagger/OpenAPI) for all routes.
- Add authentication and authorization examples in README (signup/login flow).
- Add unit and integration tests (Jest / Supertest for backend, React Testing Library for frontend).
- Add Dockerfile(s) and docker-compose for local development with MongoDB and Redis.

---

## License & Contact

Add your preferred license (e.g., MIT) and contact details:

- Author: repository owner
- Repo: https://github.com/bhanupratapvk06/HireOB

If you'd like, I can:
- Open a PR to add this README.md directly to the repository,
- Add a CI workflow to run lint/tests,
- Or generate a more detailed API reference based on the backend routes.
