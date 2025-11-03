# MERN Blog Starter (Advanced)

This is a full-stack MERN starter project (React + Vite frontend, Express + MongoDB backend).
It includes authentication (JWT), posts CRUD, and a basic frontend to interact with the API.

## Quick start (local)
- Install dependencies:
  - Frontend: `cd client && npm install`
  - Backend: `cd server && npm install`
- Create `.env` in `server/`:
  ```
  MONGODB_URI=<your mongo uri>
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```
- Run backend: `cd server && npm run dev`
- Run frontend: `cd client && npm run dev`

## Structure
- client/ - Vite + React + Tailwind starter
- server/ - Express API with auth and posts
