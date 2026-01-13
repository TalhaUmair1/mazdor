# Google OAuth Fix Guide

## 🚨 Problem: `redirect_uri_mismatch` Error

The error occurs because the redirect URI in your Google Cloud Console doesn't match what our app is sending.

## 🔍 Current App Redirect URI:
`http://localhost:3002/api/auth/google`

## ⚙️ Solution: Update Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" → "Credentials"

### Step 2: Edit OAuth 2.0 Client ID
1. Find your Google OAuth 2.0 Client ID
2. Click the edit (pencil) icon
3. Scroll down to "Authorized redirect URIs"

### Step 3: Add Correct Redirect URIs
Add these exact URIs (add all to handle different ports):
```
http://localhost:3000/api/auth/google
http://localhost:3001/api/auth/google  
http://localhost:3002/api/auth/google
http://localhost:3003/api/auth/google
```

### Step 4: Save Changes
1. Click "Save" at the bottom
2. Wait a few minutes for changes to take effect

## 🚀 Alternative: Force Port 3000

If you want to force port 3000, close other apps using it and restart:

```bash
# Stop current server (Ctrl+C)
npm run dev
```

The app will try port 3000 first.

## 📱 Test the Fix

1. Restart your app after updating Google Console
2. Try Google login again
3. Should work without redirect_uri_mismatch error

## 🔑 Facebook OAuth Setup

For Facebook, add these URIs in Facebook Developers:
```
http://localhost:3000/api/auth/facebook
http://localhost:3001/api/auth/facebook
http://localhost:3002/api/auth/facebook
```

## ✅ Verification

After fixing, you should see:
- Google OAuth redirects to your app
- User gets created in database
- Redirected to homepage with logged in session

## 📞 If Still Issues

1. Clear browser cache/cookies
2. Double-check URI spelling (no trailing slashes)
3. Ensure your app is running on the port you configured
4. Check Google Console has the right project selected

The OAuth endpoints are correctly coded - this is just a configuration issue! 🔧