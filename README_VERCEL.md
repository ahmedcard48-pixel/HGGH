# Deployment to Vercel

This project is prepared for deployment on Vercel.

## Important Note: Database (SQLite)
This project currently uses `better-sqlite3` with a local file (`economine.db`). 
**Vercel's filesystem is read-only and stateless.** This means:
1. You can read the database if it's included in your repository.
2. **You cannot save new data** (registrations, logins, ideas) permanently. Any changes will be lost when the serverless function restarts.

### Recommendation
For a production deployment on Vercel, you should switch to a hosted database:
- **PostgreSQL:** [Neon](https://neon.tech/) (Recommended)
- **MongoDB:** [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Firebase:** [Firestore](https://firebase.google.com/products/firestore)

## Environment Variables
You must set the following environment variable in your Vercel Project Settings:
- `GEMINI_API_KEY`: Your Google Gemini API Key.

## How to Deploy
1. Push your code to GitHub (Done).
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **"Add New"** > **"Project"**.
4. Import your repository.
5. Vercel should automatically detect the settings.
6. Add the `GEMINI_API_KEY` in the "Environment Variables" section.
7. Click **"Deploy"**.
