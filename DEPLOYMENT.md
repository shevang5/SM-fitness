# Deployment Instructions

Follow these steps to deploy your Gym Tracker application.

## 1. Environment Variables

You will need to set the following environment variables on your hosting platform (e.g., Render, Railway, etc.).

### Backend Variables (.env)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/gym` |
| `JWT_SECRET` | A secret key for signing tokens | `your_random_secret_string` |
| `FRONTEND_URL` | The URL where your frontend is hosted | `https://gym-tracker-frontend.vercel.app` |
| `PORT` | The port your server listens on (optional, defaults to 5000) | `5000` |
| `NODE_ENV` | Set to `production` for static file serving | `production` |

### Frontend Variables (.env)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | The URL of your deployed backend API | `https://gym-tracker-api.onrender.com/api` |

---

## 2. Deployment Steps

### Frontend (Vite)
1. Set the override build command if needed: `npm run build`.
2. Ensure `VITE_API_URL` is set **during build time** if your platform separates build and runtime environments.

### Backend (Node/Express)
1. Start command: `node server.js`.
2. Ensure all backend environment variables are set in the platform dashboard.

---

## 3. Local Production Test
To test the production build locally:
1. In `client/`, run `npm run build`.
2. In `server/`, set `NODE_ENV=production` in `.env`.
3. Start the server with `node server.js`.
4. Your frontend will be served by the backend at `http://localhost:5000`.
