import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import SplitFlapText from "@/components/SplitFlapText";
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
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const allProjects = await getAllProjects();
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

  return (
    <ThemeProvider defaultTheme="dark">
      <SEO
        title="Projects - Tanish Parsana"
        description="Explore my portfolio of web development, AI, and data science projects. From fitness apps to construction management platforms, see how I build innovative solutions."
        keywords={["projects", "portfolio", "web development", "AI", "React", "TypeScript", "Tanish Parsana"]}
        ogType="website"
      />
      <Navigation />
      <main className="min-h-screen">
        <AnimatedBackground />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="text-center max-w-6xl space-y-6 z-10 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center w-full">
              <div className="flex justify-center items-center">
                <SplitFlapText
                  text="My Projects"
                  className="font-mono text-center"
                  onComplete={() => setIntroComplete(true)}
                />
              </div>
            </h1>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status.value}
                      variant={selectedStatus === status.value ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedStatus(status.value)}
                    >
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
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

            {/* Projects Count */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid/List */}
        <section className="pb-20 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Project Details */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status.replace("-", " ")}
                              </Badge>
                              <Badge variant="outline">{project.category}</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 6).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 6 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.tags.length - 6} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {formatDate(project.startDate)}
                            {project.endDate && ` - ${formatDate(project.endDate)}`}
                          </div>
                          
                          <div className="flex gap-2">
                            {project.githubUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4 mr-2" />
                                  Code
                                </a>
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button size="sm" variant="default" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <Filter className="h-4 w-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
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
                  No projects found matching your filters.
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
                © {new Date().getFullYear()} Tanish Parsana. Building the future, one project at a time.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
};

export default Projects;
