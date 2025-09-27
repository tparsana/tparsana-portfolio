# Supabase Setup Guide

This guide will help you set up Supabase as your backend for the portfolio website, replacing localStorage with a real database that works for all users.

## 🚀 **Quick Setup (5 minutes)**

### **Step 1: Create Supabase Account**
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub (recommended)
3. Create a new project
4. Choose a region close to your users
5. Set a strong database password

### **Step 2: Get Your API Keys**
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Create a `.env.local` file in your project root:

```bash
# .env.local
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_DATA_SOURCE=supabase
```

### **Step 3: Set Up Database**
1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create tables and sample data

### **Step 4: Test Your Setup**
1. Run `npm run dev`
2. Visit your admin portal: `http://localhost:8080/admin`
3. Try creating a blog post or project
4. Check if it appears for other users

## 🔧 **Detailed Configuration**

### **Environment Variables**

Create `.env.local` file:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Data Source (supabase or localStorage)
VITE_DATA_SOURCE=supabase

# Optional: Admin password
VITE_ADMIN_PASSWORD=4265
```

### **Database Schema**

The `supabase-schema.sql` file includes:
- **blog_posts** table with all necessary fields
- **projects** table with full project data
- **Indexes** for better performance
- **Row Level Security** for public read access
- **Sample data** to get you started

### **Security Settings**

1. **Row Level Security (RLS)** is enabled
2. **Public read access** for published content
3. **Admin operations** require authentication (to be implemented)

## 📊 **What This Gives You**

### **✅ Benefits Over localStorage:**
- **Global visibility** - All users see the same content
- **Real-time updates** - Changes appear instantly
- **Data persistence** - Content survives browser clears
- **Scalability** - Handles thousands of users
- **Backup & recovery** - Automatic data backups
- **Analytics** - Track read counts and engagement

### **🔄 Automatic Fallback:**
- If Supabase is unavailable, falls back to localStorage
- Seamless switching between data sources
- No code changes needed for different environments

## 🚀 **Deployment**

### **For Netlify/Vercel:**
1. Add environment variables in your deployment settings
2. Deploy normally - the app will automatically use Supabase

### **Environment Variables to Set:**
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_DATA_SOURCE=supabase
```

## 🧪 **Testing Your Setup**

### **1. Local Testing:**
```bash
# Start development server
npm run dev

# Test admin portal
open http://localhost:8080/admin

# Create a blog post
# Check if it appears on /thoughts page
```

### **2. Production Testing:**
1. Deploy your site
2. Visit admin portal on production
3. Create content
4. Verify it appears for all users

## 🔍 **Troubleshooting**

### **Common Issues:**

#### **"Failed to fetch" errors:**
- Check your Supabase URL and API key
- Ensure your project is not paused
- Verify CORS settings in Supabase

#### **Data not appearing:**
- Check if RLS policies are correct
- Verify data was inserted properly
- Check browser console for errors

#### **Admin operations failing:**
- Ensure you're using the correct API keys
- Check Supabase logs for errors
- Verify table permissions

### **Debug Mode:**
Add this to your `.env.local` for detailed logging:
```bash
VITE_DEBUG=true
```

## 📈 **Monitoring & Analytics**

### **Supabase Dashboard:**
- **Table Editor** - View and edit data directly
- **Logs** - Monitor API calls and errors
- **Analytics** - Track usage and performance

### **Built-in Analytics:**
- Blog post read counts
- Project view tracking
- Admin activity monitoring

## 🔐 **Security Best Practices**

### **API Keys:**
- Never commit `.env.local` to version control
- Use different keys for development/production
- Rotate keys regularly

### **Database:**
- Keep RLS policies up to date
- Monitor for suspicious activity
- Regular backups

## 🎯 **Next Steps**

1. **Set up authentication** for admin operations
2. **Add image upload** to Supabase Storage
3. **Implement real-time subscriptions** for live updates
4. **Add analytics dashboard** for content insights

## 💡 **Pro Tips**

- **Use Supabase Studio** for easy data management
- **Set up webhooks** for automated backups
- **Monitor usage** to stay within free tier limits
- **Use Supabase CLI** for local development

---

**Need Help?** Check the [Supabase Documentation](https://supabase.com/docs) or create an issue in your repository.
