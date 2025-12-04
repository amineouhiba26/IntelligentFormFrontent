# 🚀 Deployment Guide: Nexus Connected Form

This guide will help you deploy your full-stack application for **FREE** using industry-standard platforms.

## 🏗 Architecture
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free Web Service)
- **Database**: MongoDB Atlas (Free M0 Sandbox)

---

## 1️⃣ Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up.
2. Create a new project and build a **Database**.
3. Select **M0 Sandbox** (Free Tier).
4. Create a database user (username/password) - **Save these!**
5. In "Network Access", allow access from **Anywhere (0.0.0.0/0)** (required for Render).
6. Go to "Database" > "Connect" > "Drivers" and copy your **Connection String**.
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password.

---

## 2️⃣ Backend Deployment (Render)
1. Push your code to **GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** > **Web Service**.
4. Connect your GitHub repository.
5. Render should detect the `render.yaml` file automatically.
6. **Environment Variables**:
   You will need to add these in the Render dashboard under "Environment":
   - `MONGODB_URL`: Paste your MongoDB connection string from Step 1.
   - `GROQ_API_KEY`: Your Groq API key (if you have one).
   - `FRONTEND_ORIGIN`: `https://your-vercel-app-name.vercel.app` (You'll update this after deploying frontend).

   *Note: The free tier on Render spins down after inactivity. The first request might take ~50 seconds.*

---

## 3️⃣ Frontend Deployment (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com/).
2. Click **Add New...** > **Project**.
3. Import your GitHub repository.
4. Vercel will auto-detect "Vite".
5. **Environment Variables**:
   Add the following variable:
   - `VITE_API_URL`: The URL of your Render backend (e.g., `https://nexus-backend.onrender.com/api`).
     *Note: Make sure to add `/api` at the end!*
6. Click **Deploy**.

---

## 4️⃣ Final Connection
1. Once Vercel deploys, copy your new frontend URL (e.g., `https://form-moderne.vercel.app`).
2. Go back to **Render Dashboard** > **Environment**.
3. Update `FRONTEND_ORIGIN` with this URL.
4. Redeploy the backend (or wait for auto-deploy).

🎉 **Done! Your app is live!**
