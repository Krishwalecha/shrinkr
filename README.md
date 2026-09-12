# Shrinkr

A full-stack URL shortener with link analytics, built on the MERN stack (MongoDB, Express, React, Node.js).

**Live:** https://shrinkr.link
**Repo:** https://github.com/Krishwalecha/shrinkr

## Features

- Custom short links + aliases
- Link expiry & click-limit controls
- QR code generation per link
- Click analytics (device/browser breakdown via `ua-parser-js`)
- Dashboard: history, filters, batch delete, enable/disable, inline edit
- JWT auth (access + refresh tokens)

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS 4, shadcn/ui, Recharts, React Router
**Backend:** Node.js, Express 5, MongoDB (Mongoose)
**Auth:** JWT + bcrypt

## Setup

```bash
git clone https://github.com/Krishwalecha/shrinkr.git && cd shrinkr

# Server
cd server && npm install && cp .env.sample .env   # fill MONGODB_URI, JWT secrets, PORT
npm run dev

# Client (new terminal)
cd client && npm install && cp .env.sample .env   # set VITE_API_SERVER
npm run dev
```

Runs at `http://localhost:5173` (client) / `http://localhost:5000` (server).

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/urls` | Create short URL |
| GET | `/api/urls` | List user's URLs |
| GET | `/api/urls/:id` | Redirect to original URL |
| PATCH | `/api/urls/:id` | Update link |
| PATCH | `/api/urls/:id/status` | Enable/disable link |
| DELETE | `/api/urls/:id` | Delete link |
| DELETE | `/api/urls/batch` | Batch delete |
| GET | `/api/urls/:id/analytics` | Link analytics |
| GET | `/api/urls/analytics` | Account-wide analytics |
| GET | `/api/urls/overview` | Dashboard overview |

## License

ISC — **Krish Walecha** ([GitHub](https://github.com/Krishwalecha))
