import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProjectEditor from "@/components/ProjectEditor";
import AdminAuth, { useAdminAuth } from "@/components/AdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllProjects, saveProject, deleteProject, Project } from "@/data/projects";
import { Plus, Edit, Trash2, Eye, RefreshCw, LogOut, ExternalLink, Github } from "lucide-react";

const ProjectsAdmin = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects from localStorage on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const loadProjects = () => {
        const allProjects = getAllProjects();
        setProjects(allProjects);
        setIsLoading(false);
      };
      loadProjects();
    }
  }, [isAuthenticated]);

  const refreshProjects = () => {
    const allProjects = getAllProjects();
    setProjects(allProjects);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      setCurrentView('list');
      setEditingProject(undefined);
    }
  };

  const handleCreateNew = () => {
    setEditingProject(undefined);
    setCurrentView('create');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentView('edit');
  };

  const handleSaveProject = (projectData: Partial<Project>) => {
    try {
      const fullProject = {
        ...projectData,
        id: projectData.id || editingProject?.id || Math.random().toString(36).substr(2, 9),
      } as Project;
      
      // Save to localStorage
      saveProject(fullProject);
      
      // Refresh local state
      refreshProjects();
      
      // Navigate back to list
      setCurrentView('list');
      setEditingProject(undefined);
      
      console.log('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        deleteProject(projectId);
        refreshProjects();
        console.log('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingProject(undefined);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "planned": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider defaultTheme="dark">
        <AdminAuth onAuthenticated={() => window.location.reload()} />
      </ThemeProvider>
    );
  }

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <ThemeProvider defaultTheme="dark">
        <Navigation />
        <main className="min-h-screen pt-24">
          <AnimatedBackground />
          <div className="relative z-10">
            <ProjectEditor
              project={editingProject}
              onSave={handleSaveProject}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </ThemeProvider>
    );
  }

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="dark">
        <Navigation />
        <main className="min-h-screen pt-24">
          <AnimatedBackground />
          <section className="relative z-10 px-4 py-8">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading projects...</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <Navigation />
      <main className="min-h-screen pt-24">
        <AnimatedBackground />
        
        <section className="relative z-10 px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Projects Admin</h1>
                <p className="text-muted-foreground">Manage your project portfolio</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={refreshProjects}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
                <Button variant="outline" onClick={handleLogout} className="text-red-400 hover:text-red-300">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.status === "completed").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.status === "in-progress").length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {projects.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Featured</div>
                </CardContent>
              </Card>
            </div>

            {/* Projects List */}
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 border border-muted rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Project Image */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.replace("-", " ")}
                            </Badge>
                            <Badge variant="outline">{project.category}</Badge>
                            {project.featured && (
                              <Badge variant="default" className="bg-orange-400/20 text-orange-400">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formatDate(project.startDate)}</span>
                            {project.endDate && <span>- {formatDate(project.endDate)}</span>}
                            <span>•</span>
                            <span>{project.tags.length} tags</span>
                            <div className="flex gap-1">
                              {project.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-4">
                        {project.liveUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {projects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No projects yet</p>
                    <Button onClick={handleCreateNew}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create your first project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
};

export default ProjectsAdmin;
