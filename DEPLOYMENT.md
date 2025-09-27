# Deployment Guide

This React Router application requires special configuration to handle client-side routing properly.

## The Problem
When you navigate to `/admin` or any other route directly (or refresh the page), the server looks for a physical file at that path. Since this is a Single Page Application (SPA), all routes should serve the `index.html` file and let React Router handle the routing.

## Solution Files Included

### 1. Netlify (`public/_redirects`)
```
/*    /index.html   200
```

### 2. Vercel (`vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. Apache (`.htaccess`)
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### 4. Nginx (`nginx.conf`)
```
location / {
    try_files $uri $uri/ /index.html;
}
```

## Platform-Specific Instructions

### Netlify
1. Deploy normally - the `_redirects` file will be automatically detected
2. All routes will work correctly

### Vercel
1. Deploy normally - the `vercel.json` file will be automatically detected
2. All routes will work correctly

### GitHub Pages
1. Add this to your `package.json` scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Run `npm run build && npm run deploy`

### Apache Server
1. Upload the `dist` folder contents to your web root
2. Ensure `.htaccess` is uploaded and enabled
3. All routes will work correctly

### Nginx Server
1. Use the provided `nginx.conf` configuration
2. Place your built files in `/usr/share/nginx/html`
3. All routes will work correctly

## Testing After Deployment

1. Visit your main page: `https://yoursite.com/`
2. Navigate to admin: `https://yoursite.com/admin`
3. Try refreshing the admin page - it should work
4. Test direct URL access: `https://yoursite.com/admin/projects`

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Troubleshooting

If routes still don't work after deployment:

1. **Check if the redirect file was uploaded** - Some platforms require specific file names
2. **Verify server configuration** - Ensure your server supports the redirect rules
3. **Test with browser dev tools** - Check Network tab for 404 errors
4. **Try different platforms** - Netlify and Vercel have excellent SPA support

## Admin Access

- **URL**: `/admin` or `/admin/projects`
- **Password**: `4265`
- **Features**: Full CRUD for both blog posts and projects
