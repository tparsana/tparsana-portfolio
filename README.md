# Tanish Parsana - Portfolio Website

A modern, animated portfolio website built with React, TypeScript, and cutting-edge web technologies. Features a complete blog system, project showcase, and admin portal with real-time data persistence.

## 🚀 **Live Demo**

Visit the live website: [tanishparsana.com](https://tanishparsana.com)

## ✨ **Features**

### **🎨 Modern Design**
- **Custom animations** with SplitFlapText and WordByWordText
- **Animated background** with particle effects
- **Custom cursor** implementation
- **Responsive design** for all devices
- **Dark theme** with smooth transitions

### **📝 Blog System**
- **Full CMS** with rich text editor
- **SEO optimized** for better search rankings
- **Real-time read tracking** and analytics
- **Tag-based organization** and search
- **Featured posts** and categorization

### **💼 Project Showcase**
- **Interactive project cards** with hover effects
- **Category filtering** (Web, Mobile, AI, Data Science)
- **Status tracking** (Completed, In Progress, Planned)
- **Image support** with multiple upload methods
- **Detailed project pages** with full descriptions

### **🔧 Admin Portal**
- **Password protected** admin access
- **Full CRUD operations** for blogs and projects
- **Image management** with URL, Unsplash, and file upload
- **SEO optimization** tools
- **Real-time data persistence**

### **🗄️ Data Persistence**
- **Supabase integration** for production
- **localStorage fallback** for development
- **Automatic data synchronization**
- **Real-time updates** across all users

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn UI** for components
- **React Router** for navigation
- **Lucide React** for icons

### **Backend & Database**
- **Supabase** for production database
- **PostgreSQL** with real-time capabilities
- **Row Level Security** for data protection
- **RESTful API** with automatic TypeScript types

### **Development Tools**
- **ESLint** for code linting
- **TypeScript** for type safety
- **Vite** for fast builds
- **Hot Module Replacement** for development

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account (for production)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanishparsana/tparsana-portfolio.git
   cd tparsana-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_DATA_SOURCE=supabase
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL from `supabase-schema.sql` in the SQL Editor
   - See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Main site: `http://localhost:8080`
   - Admin portal: `http://localhost:8080/admin` (password: `4265`)

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── AdminAuth.tsx   # Admin authentication
│   ├── BlogEditor.tsx  # Rich text editor
│   ├── ProjectEditor.tsx # Project management
│   └── ...
├── pages/              # Main application pages
│   ├── Index.tsx       # Home page
│   ├── Thoughts.tsx    # Blog listing
│   ├── BlogPost.tsx    # Individual blog post
│   ├── Projects.tsx    # Project showcase
│   ├── Admin.tsx       # Blog admin
│   └── ProjectsAdmin.tsx # Project admin
├── data/               # Data layer
│   ├── blogs-unified.ts    # Unified blog data
│   ├── projects-unified.ts # Unified project data
│   ├── blogs-supabase.ts   # Supabase blog functions
│   └── projects-supabase.ts # Supabase project functions
├── lib/                # Utilities and configurations
│   └── supabase.ts     # Supabase client
└── config/             # App configuration
    └── data-source.ts  # Data source switching
```

## 🔧 **Configuration**

### **Data Source Switching**
The app automatically switches between data sources based on environment variables:

- **Development**: Uses localStorage (no backend needed)
- **Production**: Uses Supabase (real database)

### **Environment Variables**
```bash
# Required for Supabase
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Data source selection
VITE_DATA_SOURCE=supabase  # or 'localStorage'

# Optional
VITE_ADMIN_PASSWORD=4265
VITE_DEBUG=true
```

## 📝 **Content Management**

### **Adding Blog Posts**
1. Go to `/admin` (password: `4265`)
2. Click "New Post"
3. Fill in the form with:
   - Title and slug
   - Content (Markdown supported)
   - SEO metadata
   - Tags and categories
4. Save and publish

### **Adding Projects**
1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in project details:
   - Basic information
   - Image (URL, Unsplash, or upload)
   - Technical details
   - Links and metadata
4. Save and feature if desired

## 🚀 **Deployment**

### **Netlify (Recommended)**
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### **Vercel**
1. Connect your GitHub repository
2. Vercel will auto-detect Vite
3. Add environment variables
4. Deploy!

### **Other Platforms**
- See `DEPLOYMENT.md` for platform-specific instructions
- Ensure environment variables are set
- The `_redirects` and `vercel.json` files handle routing

## 🧪 **Testing**

### **Local Testing**
```bash
# Development server
npm run dev

# Production build test
npm run test:build

# Lint code
npm run lint
```

### **Admin Portal Testing**
1. Visit `/admin`
2. Enter password: `4265`
3. Test creating/editing content
4. Verify content appears on public pages

## 📊 **Analytics & Monitoring**

### **Built-in Analytics**
- Blog post read counts
- Project view tracking
- Admin activity monitoring

### **Supabase Dashboard**
- Real-time database monitoring
- API usage analytics
- Error tracking and logs

## 🔐 **Security**

### **Data Protection**
- Row Level Security (RLS) enabled
- Public read access for published content
- Admin operations require authentication
- API keys secured in environment variables

### **Best Practices**
- Never commit `.env.local` to version control
- Use different keys for development/production
- Regular security updates
- Monitor for suspicious activity

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Shadcn UI** for beautiful components
- **Supabase** for the amazing backend
- **Vite** for the fast development experience
- **React** community for excellent libraries

## 📞 **Contact**

- **Website**: [tanishparsana.com](https://tanishparsana.com)
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **LinkedIn**: [linkedin.com/in/tanishparsana](https://linkedin.com/in/tanishparsana)
- **GitHub**: [github.com/tanishparsana](https://github.com/tanishparsana)

---

**Built with ❤️ by Tanish Parsana**