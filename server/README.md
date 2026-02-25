## NoteForge Server

**Tech stack**: Node.js, Express, MongoDB (Mongoose), JWT auth.

### Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file in `server` based on `.env.sample`:

- `MONGODB_URL` – your Mongo connection string
- `PORT` – server port (default `5001`)
- `JWT_SECRET` – long random string used to sign JWTs
- `JWT_EXPIRES_IN` – token lifetime (e.g. `7d`)
- `CLIENT_ORIGIN` – frontend origin for CORS (e.g. `http://localhost:5173`)

3. Run the server:

```bash
npm run dev
```

### REST API

Base URL (dev): `http://localhost:5001`

#### Auth

- `POST /api/auth/signup` – body: `{ name, email, password }`
  - returns `{ token, user }`
- `POST /api/auth/login` – body: `{ email, password }`
  - returns `{ token, user }`
- `GET /api/auth/me` – header: `Authorization: Bearer <token>`
  - returns the authenticated user (without password)

#### Notes

All responses are JSON.

- `GET /api/notes` – list notes (if a user is attached via auth middleware, this can be scoped to that user)
- `POST /api/notes` – body: `{ title, content }` (and optional auth user)
- `GET /api/notes/:id` – get a single note
- `PUT /api/notes/:id` – update a note (any of `{ title, content }`)
- `DELETE /api/notes/:id` – delete a note

