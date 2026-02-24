import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Project } from '@/types';
import * as ProjectService from '@/services/project-service';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  saveProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Project>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<Project | null>;
  refreshProjects: () => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const loaded = await ProjectService.getAllProjects();
      setProjects(loaded.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const saveProject = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProject = await ProjectService.saveProject(data);
      await loadProjects();
      return newProject;
    } catch (error: any) {
      console.error('Error saving project:', error);
      throw new Error('Failed to save project. Storage may be full. Try deleting old projects.');
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    await ProjectService.updateProject(id, updates);
    await loadProjects();
  };

  const deleteProject = async (id: string) => {
    await ProjectService.deleteProject(id);
    await loadProjects();
  };

  const duplicateProject = async (id: string) => {
    const duplicate = await ProjectService.duplicateProject(id);
    await loadProjects();
    return duplicate;
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        saveProject,
        updateProject,
        deleteProject,
        duplicateProject,
        refreshProjects: loadProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
