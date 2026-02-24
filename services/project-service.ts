// Project Storage Service
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project } from '@/types';

const PROJECTS_KEY = '@quran_shorts_projects';

export async function saveProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const projects = await getAllProjects();
  
  // Strip heavy data to avoid quota issues
  const lightVideoSource = project.videoSource ? {
    type: project.videoSource.type,
    pexelsId: project.videoSource.pexelsId,
    // Don't save large URIs or thumbnails
  } : undefined;
  
  const newProject: Project = {
    ...project,
    videoSource: lightVideoSource,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // Keep only last 20 projects to prevent quota issues
  projects.push(newProject);
  const limitedProjects = projects.slice(-20);
  
  try {
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(limitedProjects));
  } catch (error: any) {
    if (error.message?.includes('quota')) {
      // If still quota error, keep only last 10
      const minimalProjects = projects.slice(-10);
      await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(minimalProjects));
    } else {
      throw error;
    }
  }
  
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  const projects = await getAllProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index !== -1) {
    // Strip heavy data from updates
    const lightUpdates = { ...updates };
    if (lightUpdates.videoSource) {
      lightUpdates.videoSource = {
        type: lightUpdates.videoSource.type,
        pexelsId: lightUpdates.videoSource.pexelsId,
      };
    }
    
    projects[index] = {
      ...projects[index],
      ...lightUpdates,
      updatedAt: new Date().toISOString(),
    };
    
    try {
      await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error: any) {
      if (error.message?.includes('quota')) {
        // Keep only last 10 projects
        const limitedProjects = projects.slice(-10);
        await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(limitedProjects));
      } else {
        throw error;
      }
    }
  }
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getAllProjects();
  const filtered = projects.filter(p => p.id !== id);
  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
}

export async function duplicateProject(id: string): Promise<Project | null> {
  const projects = await getAllProjects();
  const original = projects.find(p => p.id === id);
  
  if (!original) return null;
  
  const duplicate: Project = {
    ...original,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  projects.push(duplicate);
  await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  
  return duplicate;
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const data = await AsyncStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(p => p.id === id) || null;
}
