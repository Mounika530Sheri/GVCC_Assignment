# Product Showcase & Enquiry - Starter Project

This ZIP contains a full-stack starter project implementing the "Product Showcase & Enquiry" assignment.

## Structure
- backend/ - Node.js + Express server using SQLite (schema.sql + seed.js)
- frontend/ - React app scaffolded for Vite (src, public)

## Quick Start (local)
1. Backend
   - `cd backend`
   - `npm install`
   - `npm run seed`   # creates data.sqlite with sample products
   - `npm start`      # starts server on port 3001

2. Frontend
   - `cd frontend`
   - `npm install`
   - Open `package.json` and run `npm run dev` to start Vite dev server on port 3000.
   - The frontend expects the backend API at `/api/*` so configure a proxy if necessary, or run both and use absolute URLs.

Notes:
- The frontend is configured to call `/api/products`. For development you can set a proxy in `frontend/package.json` or use a browser extension.
- Place images into `backend/public/images` and `frontend/public/images` to show real pictures.
- This is a starter project: extend per assignment requirements (auth, tests, file uploads as bonus).