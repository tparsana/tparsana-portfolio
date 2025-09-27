-- Supabase Database Schema for Portfolio
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    read_time INTEGER NOT NULL DEFAULT 5,
    total_reads INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    seo_title TEXT NOT NULL,
    seo_description TEXT NOT NULL,
    seo_keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    challenges TEXT[],
    learnings TEXT[],
    github_url TEXT,
    live_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status TEXT CHECK (status IN ('completed', 'in-progress', 'planned')) DEFAULT 'completed',
    start_date DATE NOT NULL,
    end_date DATE,
    category TEXT CHECK (category IN ('web', 'mobile', 'ai', 'data-science', 'other')) DEFAULT 'web',
    meta_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO blog_posts (title, slug, content, excerpt, read_time, tags, seo_title, seo_description, seo_keywords) VALUES
(
    'Welcome to My Blog',
    'welcome-to-my-blog',
    '# Welcome to My Blog!\n\nThis is my first blog post where I share my thoughts on technology, development, and life.\n\n## What You Can Expect\n\n- Technical insights and tutorials\n- Project showcases and case studies\n- Industry trends and analysis\n- Personal experiences and learnings\n\nStay tuned for more content!',
    'Welcome to my blog where I share insights on technology, development, and life.',
    3,
    ARRAY['welcome', 'introduction', 'blog'],
    'Welcome to My Blog - Tanish Parsana',
    'Welcome to my blog where I share insights on technology, development, and life.',
    ARRAY['welcome', 'introduction', 'blog', 'technology']
),
(
    'Building Modern Web Applications with React',
    'building-modern-web-applications-react',
    '# Building Modern Web Applications with React\n\nReact has revolutionized how we build user interfaces. In this post, I share my experience building modern web applications.\n\n## Key Concepts\n\n- Component-based architecture\n- State management\n- Performance optimization\n- Best practices\n\n## My Approach\n\nI focus on creating maintainable, scalable applications that provide excellent user experiences.',
    'Learn how to build modern web applications with React, covering architecture, state management, and best practices.',
    8,
    ARRAY['react', 'web-development', 'javascript', 'frontend'],
    'Building Modern Web Applications with React - Tanish Parsana',
    'Learn how to build modern web applications with React, covering architecture, state management, and best practices.',
    ARRAY['react', 'web-development', 'javascript', 'frontend', 'tutorial']
);

INSERT INTO projects (title, slug, description, long_description, image, tags, technologies, github_url, live_url, featured, status, start_date, end_date, category, meta_title, meta_description, meta_keywords) VALUES
(
    'ACTV - AI Fitness Coach',
    'actv-ai-fitness-coach',
    'An AI-powered fitness & nutrition coach that builds adaptive workout routines and meal plans, using RAG-based guidance and progress tracking to deliver personalized recommendations that evolve with your goals.',
    'ACTV is a comprehensive AI-powered fitness and nutrition platform that goes beyond traditional workout apps. Built with cutting-edge RAG (Retrieval-Augmented Generation) technology, it creates truly personalized fitness experiences that adapt to your goals, preferences, and progress.\n\nThe platform integrates multiple AI models to provide intelligent workout recommendations, meal planning, and progress tracking. Using vector databases and advanced embedding techniques, ACTV learns from your interactions and continuously improves its recommendations.\n\nKey features include adaptive workout generation, smart nutrition planning, progress visualization, and AI-powered coaching insights that help users achieve their fitness goals more effectively.',
    'https://images.unsplash.com/photo-1534146789009-76ed5060ec70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ARRAY['React', 'Node.js', 'Python', 'LangChain', 'LLMs', 'Vector DB', 'OpenAI API', 'Gemini API', 'MongoDB'],
    ARRAY['React', 'Node.js', 'Python', 'LangChain', 'OpenAI API', 'Gemini API', 'MongoDB', 'Pinecone', 'FastAPI', 'TypeScript'],
    'https://github.com/tparsana/ACTV',
    'https://example.com',
    true,
    'completed',
    '2024-06-01',
    '2024-09-15',
    'ai',
    'ACTV - AI-Powered Fitness & Nutrition Coach',
    'Discover ACTV, an innovative AI fitness coach built with RAG technology, LLMs, and vector databases for personalized workout and nutrition planning.',
    ARRAY['AI fitness', 'RAG', 'LangChain', 'fitness coach', 'nutrition planning', 'machine learning', 'OpenAI']
),
(
    'Assigned - Construction Management',
    'assigned-construction-management',
    'A streamlined project management platform tailored to construction teams, combining task tracking, scheduling, and collaboration tools, with upcoming WhatsApp integration to keep projects moving forward in real time.',
    'Assigned is a specialized project management solution designed specifically for construction teams and project managers. Unlike generic project management tools, Assigned understands the unique challenges of construction workflows, from material tracking to subcontractor coordination.\n\nThe platform features intuitive task management, real-time collaboration tools, and seamless integration with popular construction workflows. The upcoming WhatsApp integration will enable instant communication and updates, ensuring that project teams stay connected regardless of their location on-site.\n\nBuilt with modern web technologies and a mobile-first approach, Assigned helps construction teams reduce project delays, improve communication, and deliver projects on time and within budget.',
    'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ARRAY['TypeScript', 'React', 'Firebase', 'Supabase', 'Tailwind', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Material-UI', 'React Router', 'Axios'],
    ARRAY['TypeScript', 'React', 'Firebase', 'Supabase', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Material-UI', 'Tailwind CSS'],
    'https://github.com/tparsana/buildtrack-constructify',
    'https://assigned-tasks.glide.page',
    true,
    'completed',
    '2024-03-01',
    '2024-07-30',
    'web',
    'Assigned - Construction Project Management Platform',
    'Streamlined project management platform for construction teams with task tracking, scheduling, and WhatsApp integration.',
    ARRAY['construction management', 'project management', 'task tracking', 'collaboration', 'TypeScript', 'React']
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to blog_posts" ON blog_posts
    FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access to projects" ON projects
    FOR SELECT USING (true);

-- Note: For admin operations (INSERT, UPDATE, DELETE), you'll need to set up authentication
-- and create appropriate policies based on your auth system
