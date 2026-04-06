import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProjectCard from "@/components/ProjectCard";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllProjects, getProjectsByCategory, getProjectsByStatus, Project } from "@/data/projects-unified";
import { Filter, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCodeNoticeId, setActiveCodeNoticeId] = useState<string | null>(null);
  const [activeLiveNoticeId, setActiveLiveNoticeId] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      console.log('🔍 Loading projects in Projects page...');
      const allProjects = await getAllProjects();
      console.log('🚀 Projects loaded:', allProjects);
      setProjects(allProjects);
      setFilteredProjects(allProjects);
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const filterProjects = async () => {
      let filtered = projects;

      if (selectedCategory !== "all") {
        filtered = await getProjectsByCategory(selectedCategory);
      }

      if (selectedStatus !== "all") {
        filtered = filtered.filter(project => project.status === selectedStatus);
      }

      setFilteredProjects(filtered);
    };
    filterProjects();
  }, [selectedCategory, selectedStatus, projects]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "ai", label: "AI & ML" },
    { value: "data-science", label: "Data Science" },
    { value: "other", label: "Other" }
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
    { value: "planned", label: "Planned" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "planned": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const showCodeNotice = (projectId: string) => {
    setActiveCodeNoticeId(projectId);
    window.setTimeout(() => {
      setActiveCodeNoticeId((currentId) =>
        currentId === projectId ? null : currentId
      );
    }, 5000);
  };

  const showLiveNotice = (projectId: string) => {
    setActiveLiveNoticeId(projectId);
    window.setTimeout(() => {
      setActiveLiveNoticeId((currentId) =>
        currentId === projectId ? null : currentId
      );
    }, 5000);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <SEO
        title="Products - Tanish Parsana"
        description="Explore my portfolio of web development, AI, and data science products. From fitness apps to construction management platforms, see how I build innovative solutions."
        keywords={["products", "portfolio", "web development", "AI", "React", "TypeScript", "Tanish Parsana"]}
        ogType="website"
      />
      <Navigation />
      <main className="min-h-screen">
        <AnimatedBackground />
        
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="text-center max-w-6xl space-y-6 z-10 flex items-center justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center w-full">
              <span className="font-mono">My Products</span>
            </h1>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="space-y-4 mb-8">
              {/* Filters */}
              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className="text-xs"
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <Button
                        key={status.value}
                        variant={selectedStatus === status.value ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedStatus(status.value)}
                        className="text-xs"
                      >
                        {status.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Projects Count */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} products
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid/List */}
        <section className="pb-20 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={cn(
                      "opacity-0 animate-fade-in",
                      { "animation-delay-100": index % 3 === 1 },
                      { "animation-delay-200": index % 3 === 2 }
                    )}
                  >
                    <ProjectCard {...project} className="h-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={cn(
                      "opacity-0 animate-fade-in bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300",
                      { "animation-delay-100": index % 2 === 1 }
                    )}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Project Details */}
                      <div className="md:col-span-2 space-y-3 md:space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2">{project.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status.replace("-", " ")}
                              </Badge>
                              <Badge variant="outline">{project.category}</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.tags.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {formatDate(project.startDate)}
                            {project.endDate && ` - ${formatDate(project.endDate)}`}
                          </div>
                          
                          <div className="relative flex gap-2">
                            {(project.githubUrl || project.codeNotice) && (
                              project.codeNotice ? (
                                <div className="relative">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => showCodeNotice(project.id)}
                                  >
                                    <Github className="h-4 w-4 mr-2" />
                                    Code
                                  </Button>

                                  {activeCodeNoticeId === project.id && (
                                    <div className="absolute bottom-[calc(100%+0.5rem)] right-0 z-20 w-72 rounded-xl border border-white/12 bg-black/85 px-3 py-2 text-left text-xs leading-relaxed text-white shadow-xl backdrop-blur-md">
                                      {project.codeNotice}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4 mr-2" />
                                    Code
                                  </a>
                                </Button>
                              )
                            )}
                            {(project.liveUrl || project.liveNotice) && (
                              project.liveNotice ? (
                                <div className="relative">
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => showLiveNotice(project.id)}
                                  >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Live Demo
                                  </Button>

                                  {activeLiveNoticeId === project.id && (
                                    <div className="absolute bottom-[calc(100%+0.5rem)] right-0 z-20 w-72 rounded-xl border border-white/12 bg-black/85 px-3 py-2 text-left text-xs leading-relaxed text-white shadow-xl backdrop-blur-md">
                                      {project.liveNotice}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Button size="sm" variant="default" asChild>
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Live Demo
                                  </a>
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Tanish Parsana. Building the future, one product at a time.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
};

export default Projects;
