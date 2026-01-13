# Setup Instructions

## 🚀 How to Start the App

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:3000** (or 3001, 3002 if 3000 is busy)

## 🔧 OAuth Login Setup

To enable Google/Facebook login, you need to:

### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your redirect URI: `http://localhost:3000/api/auth/google`
6. Copy Client ID and Secret to your `.env` file

### Facebook OAuth:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Add your redirect URI: `http://localhost:3000/api/auth/facebook`
5. Copy App ID and Secret to your `.env` file

### Environment Variables (.env file):
```env
NUXT_OAUTH_GOOGLE_CLIENT_ID=your-google-client-id
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret
NUXT_OAUTH_FACEBOOK_CLIENT_ID=your-facebook-app-id
NUXT_OAUTH_FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
NUXT_SESSION_PASSWORD=any-random-string
```

## ✅ Current Status

### Fixed Issues:
- ✅ **Profile Pictures**: Now showing correctly from avatar URLs
- ✅ **Service Icons**: Displaying properly using v-html
- ✅ **Locations API**: Working with search and pagination
- ✅ **Database**: SQLite with comprehensive dummy data

### Database Data:
- **Users**: 5 sample users with avatars
- **Services**: 6 services with SVG icons
- **Profiles**: 6 professional service providers
- **Locations**: NYC and LA areas

### Current App Features:
- ✅ Browse services with icons
- ✅ View service provider profiles
- ✅ Search functionality
- ✅ Responsive design
- ⚠️ OAuth login (requires setup above)

## 🎯 Next Steps
1. Set up OAuth credentials to enable social login
2. Add more dummy data if needed
3. Test all features thoroughly

The app is fully functional for browsing and testing! 🎉