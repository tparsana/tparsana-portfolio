import { isUsingSupabase } from '@/config/data-source';
import * as localStorageProjects from './projects';
import * as supabaseProjects from './projects-supabase';
import { Project } from './projects';

// Unified projects data layer that automatically switches between localStorage and Supabase
export const getAllProjects = async (): Promise<Project[]> => {
  if (isUsingSupabase) {
    return await supabaseProjects.getAllProjects();
  } else {
    return localStorageProjects.getAllProjects();
  }
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  if (isUsingSupabase) {
    return await supabaseProjects.getFeaturedProjects();
  } else {
    return localStorageProjects.getFeaturedProjects();
  }
};

export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
  if (isUsingSupabase) {
    return await supabaseProjects.getProjectsByCategory(category);
  } else {
    return localStorageProjects.getProjectsByCategory(category);
  }
};

export const getProjectsByStatus = async (status: string): Promise<Project[]> => {
  if (isUsingSupabase) {
    return await supabaseProjects.getProjectsByStatus(status);
  } else {
    return localStorageProjects.getProjectsByStatus(status);
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  if (isUsingSupabase) {
    return await supabaseProjects.getProjectBySlug(slug);
  } else {
    return localStorageProjects.getProjectBySlug(slug);
  }
};

export const getHomePageProjects = async (): Promise<Project[]> => {
  if (isUsingSupabase) {
    return await supabaseProjects.getHomePageProjects();
  } else {
    return localStorageProjects.getHomePageProjects();
  }
};

export const saveProject = async (project: Project): Promise<boolean> => {
  if (isUsingSupabase) {
    return await supabaseProjects.saveProject(project);
  } else {
    localStorageProjects.saveProject(project);
    return true;
  }
};

export const deleteProject = async (projectId: string): Promise<boolean> => {
  if (isUsingSupabase) {
    return await supabaseProjects.deleteProject(projectId);
  } else {
    localStorageProjects.deleteProject(projectId);
    return true;
  }
};

export const searchProjects = async (query: string): Promise<Project[]> => {
  if (isUsingSupabase) {
    return await supabaseProjects.searchProjects(query);
  } else {
    // For localStorage, implement simple search
    const allProjects = localStorageProjects.getAllProjects();
    return allProjects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      (project.longDescription && project.longDescription.toLowerCase().includes(query.toLowerCase()))
    );
  }
};

// Utility functions
export const generateProjectSlug = (title: string): string => {
  if (isUsingSupabase) {
    return supabaseProjects.generateProjectSlug(title);
  } else {
    return localStorageProjects.generateProjectSlug(title);
  }
};

export const validateProjectData = (project: Partial<Project>): string[] => {
  if (isUsingSupabase) {
    return supabaseProjects.validateProjectData(project);
  } else {
    return localStorageProjects.validateProjectData(project);
  }
};
