import * as localStorageProjects from './projects';
import { Project } from './projects';

// Unified projects data layer backed by local storage only.
export const getAllProjects = async (): Promise<Project[]> =>
  localStorageProjects.getAllProjects();

export const getFeaturedProjects = async (): Promise<Project[]> =>
  localStorageProjects.getFeaturedProjects();

export const getProjectsByCategory = async (
  category: string
): Promise<Project[]> => localStorageProjects.getProjectsByCategory(category);

export const getProjectsByStatus = async (
  status: string
): Promise<Project[]> => localStorageProjects.getProjectsByStatus(status);

export const getProjectBySlug = async (
  slug: string
): Promise<Project | null> => localStorageProjects.getProjectBySlug(slug);

export const getHomePageProjects = async (): Promise<Project[]> =>
  localStorageProjects.getHomePageProjects();

export const saveProject = async (project: Project): Promise<boolean> => {
  localStorageProjects.saveProject(project);
  return true;
};

export const deleteProject = async (projectId: string): Promise<boolean> => {
  localStorageProjects.deleteProject(projectId);
  return true;
};

export const searchProjects = async (query: string): Promise<Project[]> => {
  const allProjects = localStorageProjects.getAllProjects();

  return allProjects.filter((project) =>
    project.title.toLowerCase().includes(query.toLowerCase()) ||
    project.description.toLowerCase().includes(query.toLowerCase()) ||
    (project.longDescription &&
      project.longDescription.toLowerCase().includes(query.toLowerCase()))
  );
};

export const generateProjectSlug = (title: string): string =>
  localStorageProjects.generateProjectSlug(title);

export const validateProjectData = (project: Partial<Project>): string[] =>
  localStorageProjects.validateProjectData(project);
