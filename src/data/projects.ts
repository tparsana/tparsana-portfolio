export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
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
    liveUrl: "https://unionsky.vercel.app",
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
    title: "LaterTube",
    slug: "latertube-youtube-watchlist",
    description: "A distraction-free YouTube watchlist that bypasses Youtube ad layer, lets you save and organize videos with tags and priorities to come back to later, and keeps everything in sync in real time with proper AUTH and DB.",
    longDescription: "LaterTube addresses the common problem of YouTube's distracting interface by providing a clean, focused environment for managing your video watchlist. The platform allows users to save videos for later viewing, organize them with custom tags and priorities, and access them through a distraction-free interface.\n\nBuilt with Next.js and Supabase, LaterTube features real-time synchronization across devices, user authentication, and a clean PostgreSQL database design. The application bypasses YouTube's advertising and recommendation algorithms, letting users focus on the content they actually want to watch.\n\nKey features include video bookmarking, tag-based organization, priority queues, cross-device sync, and a minimal, distraction-free viewing interface that helps users be more intentional with their video consumption.",
    image: "https://images.unsplash.com/photo-1625813948790-936f256faea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Supabase Auth", "Supabase Realtime", "PostgreSQL", "Youtube Data API"],
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "YouTube Data API", "Tailwind CSS"],
    githubUrl: "https://github.com/tparsana/YourTube",
    liveUrl: "https://latertube.vercel.app",
    featured: false,
    status: "completed",
    startDate: "2024-08-01",
    endDate: "2024-10-15",
    category: "web",
    challenges: ["YouTube API integration", "Real-time data synchronization", "Distraction-free UI design"],
    learnings: ["Next.js app router", "Supabase real-time features", "YouTube API optimization"],
    seo: {
      metaTitle: "LaterTube - Distraction-Free YouTube Watchlist Manager",
      metaDescription: "A clean, focused YouTube watchlist app with tagging, priorities, and real-time sync. Bypass distractions and focus on content that matters.",
      keywords: ["YouTube", "watchlist", "productivity", "Next.js", "Supabase", "video management"]
    }
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    slug: "portfolio-website-react-typescript",
    description: "A modern, animated portfolio website built with React, TypeScript, and cutting-edge web technologies, featuring custom animations, blog system, and admin functionality.",
    longDescription: "This portfolio website represents the culmination of modern web development practices, showcasing both technical skills and design sensibility. Built with React and TypeScript, it features custom animations, a full blog management system, and sophisticated admin functionality.\n\nThe site includes advanced features like split-flap text animations, custom cursor implementation, theme switching, and a complete blog CMS with SEO optimization. Every interaction is carefully crafted to provide a smooth, engaging user experience while maintaining fast performance and accessibility.\n\nThe project demonstrates expertise in modern React patterns, TypeScript, responsive design, animation libraries, and full-stack thinking through its integrated admin and content management capabilities.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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

// Get projects from localStorage or use defaults
const getProjectsFromStorage = (): Project[] => {
  if (typeof window === 'undefined') return defaultProjects;
  
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProjects;
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
  }
  
  return defaultProjects;
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

// Initialize projects from storage
let projects = getProjectsFromStorage();

// If localStorage is empty, save the default projects
if (typeof window !== 'undefined' && !localStorage.getItem(PROJECTS_KEY)) {
  saveProjectsToStorage(defaultProjects);
}

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
  // Return first 4 projects for home page display
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
