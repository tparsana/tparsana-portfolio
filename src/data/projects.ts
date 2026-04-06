export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  codeNotice?: string;
  liveUrl?: string;
  liveNotice?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "planned";
  startDate: string;
  endDate?: string;
  category: "web" | "mobile" | "ai" | "data-science" | "other";
  technologies: string[];
  challenges?: string[];
  learnings?: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Default projects (used as initial data)
const defaultProjects: Project[] = [
  {
    id: "samaya-group-website",
    title: "Samaya Group Website",
    slug: "samaya-group-real-estate-platform",
    description: "Built and deployed Samaya's official website, a high-conversion real estate platform with strong storytelling, SEO, lead capture, and backend CRM automation.",
    longDescription: "Samaya Group Website is the official digital platform built for Samaya's real estate presence, designed to combine brand storytelling with high-conversion lead capture. The site balances polished presentation with business performance, giving the company a strong digital front door while supporting practical sales and CRM workflows behind the scenes.\n\nThe product was built around clear narrative structure, search visibility, trust-building content, and conversion-focused page flows. Beyond the public-facing experience, the project also included backend CRM automation so inbound interest could move into a more structured operational pipeline.\n\nThis was not just a brochure site. It was built as a real estate growth platform where branding, performance, lead generation, and backend automation all worked together as one system.",
    image: "https://www.dropbox.com/scl/fi/6nabcson393sf6ml7f3bm/Samaya-Group-Website-Content.png?rlkey=wcad1qtdsdc1fa9lov62cgea5&st=i89h45gp&raw=1",
    tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "SEO", "CRM"],
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Full-Stack Development", "Web Development", "Search Engine Optimization (SEO)", "Customer Relationship Management (CRM)", "API Development", "UIX", "Cloudflare", "Optimizing Performance"],
    codeNotice: "I can't share the Samaya Group Website code because it is covered by NDA and client contract restrictions.",
    liveUrl: "https://samayagroup.in",
    featured: true,
    status: "completed",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
    category: "web",
    challenges: ["Balancing premium storytelling with conversion-focused real estate flows", "Implementing lead capture that connects cleanly into CRM automation", "Keeping a media-rich marketing site fast and SEO-strong"],
    learnings: ["How to build real estate websites around conversion architecture", "Connecting frontend lead flows into backend CRM processes", "Driving performance and SEO without sacrificing visual storytelling"],
    seo: {
      metaTitle: "Samaya Group Website - High-Conversion Real Estate Platform",
      metaDescription: "Official Samaya Group website built as a high-conversion real estate platform with storytelling, SEO, lead capture, and CRM automation.",
      keywords: ["Samaya Group", "real estate website", "Next.js", "SEO", "CRM automation", "lead capture", "web development"]
    }
  },
  {
    id: "tasked",
    title: "Tasked.",
    slug: "tasked-ai-productivity-platform",
    description: "An AI-powered productivity platform that transforms handwritten and unstructured inputs into organized tasks, planning tools, and actionable workflow insights.",
    longDescription: "Tasked. is an AI-powered productivity platform built to bridge the gap between messy human input and clear execution. It takes handwritten notes, rough planning fragments, and unstructured thoughts, then converts them into organized tasks, planning systems, and practical workflow insights users can actually act on.\n\nThe product combines OCR, large language models, and modern frontend workflows to turn scattered information into structure. Instead of forcing users into rigid forms first, Tasked. starts from the way people naturally think and capture ideas, then applies intelligence on top to make that information useful.\n\nAt its core, Tasked. is about reducing friction between thought and action. By combining input parsing, planning assistance, and task generation in one product, it makes productivity feel less manual and more intelligent.",
    image: "https://www.dropbox.com/scl/fi/kadxdfhulhapy8enm4u2q/Tasked.-Landing-Page.png?rlkey=7f2zwkplejps08imrpktt1ebz&st=nhfuc6xk&raw=1",
    tags: ["React.js", "TypeScript", "Google Gemini", "OCR", "LLMs", "AI Productivity"],
    technologies: ["React.js", "TypeScript", "Google Gemini", "Optical Character Recognition (OCR)", "LLMs", "Prompt Engineering", "Modern CSS"],
    githubUrl: "https://github.com/tparsana/Tasked.",
    liveUrl: "https://tasked.tanishparsana.com",
    featured: true,
    status: "completed",
    startDate: "2026-03-01",
    endDate: "2026-04-01",
    category: "ai",
    challenges: ["Turning unstructured handwritten input into reliable digital tasks", "Designing a workflow that feels fluid instead of rigid", "Combining OCR output with LLM reasoning cleanly"],
    learnings: ["Practical OCR integration patterns", "How to structure LLM-assisted productivity flows", "Designing AI UX around real user messiness instead of perfect input"],
    seo: {
      metaTitle: "Tasked. - AI Productivity Platform for Handwritten and Unstructured Input",
      metaDescription: "Tasked. transforms handwritten notes and messy inputs into organized tasks, planning tools, and actionable workflow insights using OCR and AI.",
      keywords: ["Tasked", "AI productivity", "OCR", "Google Gemini", "LLMs", "task management", "workflow automation"]
    }
  },
  {
    id: "actv",
    title: "ACTV",
    slug: "actv-ai-fitness-coach",
    description: "An AI-powered fitness & nutrition coach that builds adaptive workout routines and meal plans, using RAG-based guidance and progress tracking to deliver personalized recommendations that evolve with your goals.",
    longDescription: "ACTV is a comprehensive AI-powered fitness and nutrition platform that goes beyond traditional workout apps. Built with cutting-edge RAG (Retrieval-Augmented Generation) technology, it creates truly personalized fitness experiences that adapt to your goals, preferences, and progress.\n\nThe platform integrates multiple AI models to provide intelligent workout recommendations, meal planning, and progress tracking. Using vector databases and advanced embedding techniques, ACTV learns from your interactions and continuously improves its recommendations.\n\nKey features include adaptive workout generation, smart nutrition planning, progress visualization, and AI-powered coaching insights that help users achieve their fitness goals more effectively.",
    image: "https://images.unsplash.com/photo-1534146789009-76ed5060ec70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Node.js", "Python", "LangChain", "LLMs", "Vector DB", "OpenAI API", "Gemini API", "MongoDB"],
    technologies: ["React", "Node.js", "Python", "LangChain", "OpenAI API", "Gemini API", "MongoDB", "Pinecone", "FastAPI", "TypeScript"],
    githubUrl: "https://github.com/tparsana/ACTV",
    liveUrl: "https://example.com",
    liveNotice: "Deployed website has been turned off as of Strava API restrictions.",
    featured: true,
    status: "completed",
    startDate: "2024-06-01",
    endDate: "2024-09-15",
    category: "ai",
    challenges: ["Implementing RAG with multiple AI models", "Optimizing vector search performance", "Creating adaptive recommendation algorithms"],
    learnings: ["Advanced RAG implementation", "Vector database optimization", "AI model integration patterns"],
    seo: {
      metaTitle: "ACTV - AI-Powered Fitness & Nutrition Coach",
      metaDescription: "Discover ACTV, an innovative AI fitness coach built with RAG technology, LLMs, and vector databases for personalized workout and nutrition planning.",
      keywords: ["AI fitness", "RAG", "LangChain", "fitness coach", "nutrition planning", "machine learning", "OpenAI"]
    }
  },
  {
    id: "assigned",
    title: "Assigned",
    slug: "assigned-construction-management",
    description: "A streamlined project management platform tailored to construction teams, combining task tracking, scheduling, and collaboration tools, with upcoming WhatsApp integration to keep projects moving forward in real time.",
    longDescription: "Assigned is a specialized project management solution designed specifically for construction teams and project managers. Unlike generic project management tools, Assigned understands the unique challenges of construction workflows, from material tracking to subcontractor coordination.\n\nThe platform features intuitive task management, real-time collaboration tools, and seamless integration with popular construction workflows. The upcoming WhatsApp integration will enable instant communication and updates, ensuring that project teams stay connected regardless of their location on-site.\n\nBuilt with modern web technologies and a mobile-first approach, Assigned helps construction teams reduce project delays, improve communication, and deliver projects on time and within budget.",
    image: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["TypeScript", "React", "Firebase", "Supabase", "Tailwind", "Node.js", "Express.js", "MongoDB", "Redux", "Material-UI", "React Router", "Axios"],
    technologies: ["TypeScript", "React", "Firebase", "Supabase", "Node.js", "Express.js", "MongoDB", "Redux", "Material-UI", "Tailwind CSS"],
    githubUrl: "https://github.com/tparsana/buildtrack-constructify",
    liveUrl: "https://assigned-tasks.glide.page",
    featured: true,
    status: "completed",
    startDate: "2024-03-01",
    endDate: "2024-07-30",
    category: "web",
    challenges: ["Real-time collaboration implementation", "Mobile-responsive design for construction sites", "Complex permission system"],
    learnings: ["Firebase real-time features", "Construction industry workflows", "Mobile-first development"],
    seo: {
      metaTitle: "Assigned - Construction Project Management Platform",
      metaDescription: "Streamlined project management platform for construction teams with task tracking, scheduling, and WhatsApp integration.",
      keywords: ["construction management", "project management", "task tracking", "collaboration", "TypeScript", "React"]
    }
  },
  {
    id: "unionsky",
    title: "UnionSky",
    slug: "unionsky-flight-tracking",
    description: "A plane-spotting web app that streams live flight data from aircrafts outside my room window, displaying routes, airlines, and aircraft details in real time through a clean interface built for aviation enthusiasts.",
    longDescription: "UnionSky transforms plane spotting into an interactive digital experience by providing real-time flight data for aircraft visible from any location. Built for aviation enthusiasts and curious observers, the app connects to multiple aviation APIs to deliver comprehensive flight information.\n\nThe application features real-time flight tracking, detailed aircraft information, route visualization, and airline data. Users can see exactly which flights are passing overhead, where they're coming from, and where they're headed, all presented through a clean and intuitive interface.\n\nWhat makes UnionSky special is its focus on local plane spotting - it's designed for people who love to look up at the sky and wonder about the planes they see. The app brings that curiosity to life with rich, real-time data.",
    image: "https://images.unsplash.com/photo-1569839333583-7375336cde4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "TypeScript", "OpenSky API", "FlightRadar API", "REST API", "Requests", "React", "Real-time Data", "Data Visualization"],
    technologies: ["Python", "TypeScript", "React", "OpenSky API", "FlightRadar API", "FastAPI", "Requests", "Chart.js"],
    githubUrl: "https://github.com/tparsana/unionsky-website",
    liveUrl: "https://unionsky.tanishparsana.com",
    featured: false,
    status: "completed",
    startDate: "2024-01-15",
    endDate: "2024-03-20",
    category: "web",
    challenges: ["Real-time API integration", "Flight data visualization", "API rate limiting management"],
    learnings: ["Aviation APIs", "Real-time data streaming", "Data visualization techniques"],
    seo: {
      metaTitle: "UnionSky - Real-time Flight Tracking for Aviation Enthusiasts",
      metaDescription: "Live flight tracking web app showing real-time aircraft data, routes, and airline information for plane spotting enthusiasts.",
      keywords: ["flight tracking", "aviation", "plane spotting", "real-time data", "OpenSky API", "React"]
    }
  },
  {
    id: "latertube",
    title: "Curio",
    slug: "curio-youtube-management-platform",
    description: "Distraction and ad-free YouTube management platform that replaces passive scrolling with intentional content consumption through smart categorization, priority tagging, and custom watchlists.",
    longDescription: "Curio is a distraction and ad-free YouTube management platform built to make content consumption intentional instead of passive. Rather than letting users fall into endless algorithmic feeds, Curio creates a clean system for organizing, prioritizing, and returning to videos that actually matter.\n\nThe platform centers around smart categorization, priority tagging, and custom watchlists, giving users structure around what they want to watch and why. It turns YouTube from a reactive feed into a deliberate content management workflow.\n\nAt its core, Curio is about helping users consume with intent. By stripping away distractions and giving people control over categorization and priority, it creates a calmer, more focused experience around video-based learning and discovery.",
    image: "https://www.dropbox.com/scl/fi/n6ll95vcguhuxquzew1rl/Curio-Dashboard-Feed.png?rlkey=46464xul5sy7an1r9rusff8nm&st=grztawbu&raw=1",
    tags: ["React", "TypeScript", "YouTube Management", "Custom Watchlists", "Priority Tagging", "Productivity"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "YouTube Data API", "Custom Watchlists", "Priority Tagging", "Content Management"],
    githubUrl: "https://github.com/tparsana/curio",
    liveUrl: "https://curio.tanishparsana.com",
    featured: false,
    status: "completed",
    startDate: "2024-08-01",
    endDate: "2024-10-15",
    category: "web",
    challenges: ["Designing a YouTube workflow without passive-feed behavior", "Building clean organization patterns around saved video content", "Making categorization and priority feel lightweight instead of tedious"],
    learnings: ["How to turn media consumption into a more intentional product flow", "Designing productivity systems around content rather than tasks", "Balancing calm UX with powerful organization features"],
    seo: {
      metaTitle: "Curio - Distraction-Free YouTube Management Platform",
      metaDescription: "Curio replaces passive scrolling with intentional YouTube consumption through smart categorization, priority tagging, and custom watchlists.",
      keywords: ["Curio", "YouTube management", "watchlists", "priority tagging", "intentional content consumption", "productivity"]
    }
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    slug: "portfolio-website-react-typescript",
    description: "A modern, animated portfolio website built with React, TypeScript, and cutting-edge web technologies, featuring custom animations, blog system, and admin functionality.",
    longDescription: "This portfolio website represents the culmination of modern web development practices, showcasing both technical skills and design sensibility. Built with React and TypeScript, it features custom animations, a full blog management system, and sophisticated admin functionality.\n\nThe site includes advanced features like split-flap text animations, custom cursor implementation, theme switching, and a complete blog CMS with SEO optimization. Every interaction is carefully crafted to provide a smooth, engaging user experience while maintaining fast performance and accessibility.\n\nThe project demonstrates expertise in modern React patterns, TypeScript, responsive design, animation libraries, and full-stack thinking through its integrated admin and content management capabilities.",
    image: "https://www.dropbox.com/scl/fi/ejnc9id2fdesxxisrslmp/TParsana-Portfolio-Landing-Page.png?rlkey=ymg6eqvrqozr720cdki3fbl4g&st=5ap71o41&raw=1",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Custom Animations", "Blog System", "Admin Portal"],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Lucide Icons", "Framer Motion", "React Router"],
    githubUrl: "https://github.com/tparsana/tparsana-portfolio",
    liveUrl: "https://tanishparsana.com",
    featured: true,
    status: "in-progress",
    startDate: "2024-11-01",
    category: "web",
    challenges: ["Custom animation implementation", "Blog system architecture", "Admin authentication"],
    learnings: ["Advanced React patterns", "Custom animation techniques", "Full-stack thinking"],
    seo: {
      metaTitle: "Portfolio Website - Modern React & TypeScript Development",
      metaDescription: "A cutting-edge portfolio website showcasing modern React development with custom animations, blog system, and admin functionality.",
      keywords: ["React portfolio", "TypeScript", "web development", "custom animations", "blog system"]
    }
  }
];

// localStorage key for projects
const PROJECTS_KEY = 'tanish-portfolio-projects';

const clearStoredProjects = () => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(PROJECTS_KEY);
  } catch (error) {
    console.error('Error clearing projects from localStorage:', error);
  }
};

// Save projects to localStorage
const saveProjectsToStorage = (projects: Project[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

clearStoredProjects();

// Initialize projects from the source-defined defaults only.
let projects = [...defaultProjects];

// Project management functions
export const getAllProjects = (): Project[] => {
  return [...projects].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
};

export const saveProject = (project: Project): void => {
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex !== -1) {
    // Update existing project
    projects[existingIndex] = project;
  } else {
    // Add new project
    projects = [project, ...projects];
  }
  
  saveProjectsToStorage(projects);
};

export const deleteProject = (projectId: string): void => {
  projects = projects.filter(p => p.id !== projectId);
  saveProjectsToStorage(projects);
};

// Helper functions
export const getFeaturedProjects = () => {
  const currentProjects = getAllProjects();
  return currentProjects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string) => {
  const currentProjects = getAllProjects();
  return currentProjects.filter(project => project.category === category);
};

export const getProjectsByStatus = (status: string) => {
  const currentProjects = getAllProjects();
  return currentProjects.filter(project => project.status === status);
};

export const getProjectBySlug = (slug: string) => {
  const currentProjects = getAllProjects();
  return currentProjects.find(project => project.slug === slug);
};

export const getHomePageProjects = () => {
  const currentProjects = getAllProjects();
  const preferredHomeProjectIds = [
    "samaya-group-website",
    "tasked",
    "latertube",
    "portfolio-website",
  ];

  const preferredProjects = preferredHomeProjectIds
    .map((projectId) =>
      currentProjects.find((project) => project.id === projectId)
    )
    .filter((project): project is Project => Boolean(project));

  if (preferredProjects.length > 0) {
    return preferredProjects;
  }

  return currentProjects.slice(0, 4);
};

// Reset to default projects (useful for development)
export const resetToDefaultProjects = () => {
  projects = [...defaultProjects];
  saveProjectsToStorage(projects);
};

// Utility functions for project management
export const generateProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const validateProjectData = (project: Partial<Project>): string[] => {
  const errors: string[] = [];
  
  if (!project.title?.trim()) errors.push("Title is required");
  if (!project.description?.trim()) errors.push("Description is required");
  if (!project.image?.trim()) errors.push("Image is required");
  if (!project.startDate) errors.push("Start date is required");
  if (!project.category) errors.push("Category is required");
  if (!project.status) errors.push("Status is required");
  if (!project.tags?.length) errors.push("At least one tag is required");
  
  return errors;
};
