import { supabase } from '@/lib/supabase';
import { Project } from './projects';

// Convert Supabase row to Project
const mapSupabaseToProject = (row: any): Project => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  description: row.description,
  longDescription: row.long_description,
  image: row.image,
  tags: row.tags || [],
  technologies: row.technologies || [],
  challenges: row.challenges || undefined,
  learnings: row.learnings || undefined,
  githubUrl: row.github_url || undefined,
  liveUrl: row.live_url || undefined,
  featured: row.featured,
  status: row.status,
  startDate: row.start_date,
  endDate: row.end_date || undefined,
  category: row.category,
  seo: {
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    keywords: row.meta_keywords || []
  }
});

// Convert Project to Supabase insert/update format
const mapProjectToSupabase = (project: Project) => ({
  title: project.title,
  slug: project.slug,
  description: project.description,
  long_description: project.longDescription || null,
  image: project.image,
  tags: project.tags,
  technologies: project.technologies,
  challenges: project.challenges || null,
  learnings: project.learnings || null,
  github_url: project.githubUrl || null,
  live_url: project.liveUrl || null,
  featured: project.featured,
  status: project.status,
  start_date: project.startDate,
  end_date: project.endDate || null,
  category: project.category,
  meta_title: project.seo.metaTitle,
  meta_description: project.seo.metaDescription,
  meta_keywords: project.seo.keywords
});

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data.map(mapSupabaseToProject);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Get featured projects
export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }

    return data.map(mapSupabaseToProject);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Get projects by category
export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching projects by category:', error);
      return [];
    }

    return data.map(mapSupabaseToProject);
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
};

// Get projects by status
export const getProjectsByStatus = async (status: string): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', status)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching projects by status:', error);
      return [];
    }

    return data.map(mapSupabaseToProject);
  } catch (error) {
    console.error('Error fetching projects by status:', error);
    return [];
  }
};

// Get project by slug
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }

    return mapSupabaseToProject(data);
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

// Get home page projects (first 4)
export const getHomePageProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('start_date', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error fetching home page projects:', error);
      return [];
    }

    return data.map(mapSupabaseToProject);
  } catch (error) {
    console.error('Error fetching home page projects:', error);
    return [];
  }
};

// Save project (create or update)
export const saveProject = async (project: Project): Promise<boolean> => {
  try {
    const supabaseData = mapProjectToSupabase(project);
    
    let query = supabase.from('projects');
    
    if (project.id) {
      // Update existing project
      const { error } = await query
        .update(supabaseData)
        .eq('id', project.id);
      
      if (error) {
        console.error('Error updating project:', error);
        return false;
      }
    } else {
      // Create new project
      const { error } = await query.insert(supabaseData);
      
      if (error) {
        console.error('Error creating project:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error saving project:', error);
    return false;
  }
};

// Delete project
export const deleteProject = async (projectId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// Search projects
export const searchProjects = async (query: string): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,long_description.ilike.%${query}%`)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error searching projects:', error);
      return [];
    }

    return data.map(mapSupabaseToProject);
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
};

// Utility functions
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
