# Deployment Guide

This guide shows how to deploy your Crypto Price API to free hosting platforms.

## Option 1: Render (Recommended) 🚀

Render offers a generous free tier perfect for APIs like this one.

### Steps:

1. **Push to GitHub** (if not already done):

   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Connect to Render**:

   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account
   - Click "New +" → "Web Service"
   - Connect your `craw-crypto` repository

3. **Configure the Service**:

   - **Name**: `crypto-api` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. **Environment Variables**:

   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render's default)

5. **Deploy**: Click "Create Web Service"

Your API will be available at: `https://your-app-name.onrender.com`

### Features on Render:

- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ 512MB RAM, 0.1 CPU
- ✅ 500 build hours/month
- ✅ Custom domains (paid plan)

---

## Option 2: Railway 🚄

Railway also offers a good free tier for Node.js apps.

### Steps:

1. **Connect to Railway**:

   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `craw-crypto` repository

2. **Configure**:

   - Railway auto-detects Node.js
   - It will automatically run `npm install` and `npm start`

3. **Environment Variables**:
   - Add `NODE_ENV`: `production`

Your API will be available at: `https://your-app-name.up.railway.app`

---

## Option 3: Vercel (Serverless) ⚡

Vercel requires some modifications for Express apps.

### Steps:

1. **Create `vercel.json`**:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/app.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/src/app.js"
       }
     ]
   }
   ```

2. **Deploy**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy

---

## Post-Deployment

### 1. Test Your Deployed API:

```bash
# Replace YOUR_DEPLOYED_URL with your actual URL
curl https://your-app-name.onrender.com/health

# Test crypto endpoint
curl https://your-app-name.onrender.com/api/crypto/ethusdt
```

### 2. Update Documentation:

Update your `README.md` with the live API URL:

```markdown
## Live API

- **Base URL**: https://your-app-name.onrender.com
- **Documentation**: https://your-app-name.onrender.com/api-docs
- **Health Check**: https://your-app-name.onrender.com/health
```

### 3. Monitor Your API:

- **Render**: Check logs in the Render dashboard
- **Railway**: Monitor in Railway dashboard
- **Vercel**: Check function logs in Vercel dashboard

---

## Free Tier Limitations

| Platform | RAM    | CPU | Bandwidth   | Sleep                  |
| -------- | ------ | --- | ----------- | ---------------------- |
| Render   | 512MB  | 0.1 | 100GB/month | After 15min inactivity |
| Railway  | 512MB  | 0.1 | 100GB/month | No sleep on free tier  |
| Vercel   | 1024MB | 1.0 | 100GB/month | Serverless (no sleep)  |

---

## Recommended: Render

For your crypto API, **Render** is recommended because:

- ✅ Perfect for Express APIs
- ✅ Easy GitHub integration
- ✅ Good free tier limits
- ✅ Automatic HTTPS
- ✅ Health check monitoring

---

## Next Steps

1. Choose a platform (Render recommended)
2. Deploy your API
3. Test all endpoints
4. Update your documentation with the live URL
5. Share your API! 🎉
