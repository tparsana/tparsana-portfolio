import { createClient } from '@supabase/supabase-js';

// These will be set as environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          featured: boolean;
          published: boolean;
          read_time: number;
          total_reads: number;
          tags: string[];
          seo_title: string;
          seo_description: string;
          seo_keywords: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          featured?: boolean;
          published?: boolean;
          read_time: number;
          total_reads?: number;
          tags: string[];
          seo_title: string;
          seo_description: string;
          seo_keywords: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string;
          featured?: boolean;
          published?: boolean;
          read_time?: number;
          total_reads?: number;
          tags?: string[];
          seo_title?: string;
          seo_description?: string;
          seo_keywords?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          long_description: string | null;
          image: string;
          tags: string[];
          technologies: string[];
          challenges: string[] | null;
          learnings: string[] | null;
          github_url: string | null;
          live_url: string | null;
          featured: boolean;
          status: 'completed' | 'in-progress' | 'planned';
          start_date: string;
          end_date: string | null;
          category: 'web' | 'mobile' | 'ai' | 'data-science' | 'other';
          meta_title: string;
          meta_description: string;
          meta_keywords: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          long_description?: string | null;
          image: string;
          tags: string[];
          technologies: string[];
          challenges?: string[] | null;
          learnings?: string[] | null;
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          status: 'completed' | 'in-progress' | 'planned';
          start_date: string;
          end_date?: string | null;
          category: 'web' | 'mobile' | 'ai' | 'data-science' | 'other';
          meta_title: string;
          meta_description: string;
          meta_keywords: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          long_description?: string | null;
          image?: string;
          tags?: string[];
          technologies?: string[];
          challenges?: string[] | null;
          learnings?: string[] | null;
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          status?: 'completed' | 'in-progress' | 'planned';
          start_date?: string;
          end_date?: string | null;
          category?: 'web' | 'mobile' | 'ai' | 'data-science' | 'other';
          meta_title?: string;
          meta_description?: string;
          meta_keywords?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
