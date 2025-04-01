
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import SplitFlapText from "@/components/SplitFlapText";
import FlipCard from "@/components/FlipCard";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import ContactForm from "@/components/ContactForm";
import PreLoader from "@/components/PreLoader";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with cart, payments, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Task Management App",
    description: "A Kanban-style task management application with drag and drop functionality.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["TypeScript", "React", "Firebase", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather forecasting app with interactive maps and alerts.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "OpenWeather API", "Chart.js", "PWA"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing projects and skills.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Framer Motion", "Tailwind", "Vite"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const experiences = [
  {
    date: "2022 - Present",
    title: "Senior Frontend Developer",
    subtitle: "Tech Innovation Inc.",
    description: "Leading the frontend team in developing cutting-edge web applications using React, TypeScript, and modern CSS frameworks.",
    logo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    date: "2019 - 2022",
    title: "Full Stack Developer",
    subtitle: "Digital Solutions Agency",
    description: "Developed and maintained full-stack applications, with a focus on responsive design, performance optimization, and accessibility.",
    logo: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    date: "May 2023 - May 2023",
    title: "Data Science and AI Intern",
    subtitle: "York IE",
    description: "Built and deployed a Retrieval-Augmented Generation (RAG) model using LLMs such as AWS Bedrock and OpenAI GPT 4o, strategically balancing cost and speed for embedding generation and text processing for an internal research tool for the firm’s vast database. Developed an efficient pipeline for creating embeddings from database, leveraging AWS Services and integrating Vector Databases (Pinecone) to enhance retrieval capabilities. Designed and optimized AI API schemas to streamline data processing workflows, carefully evaluating solutions like embeddings and large-scale inference models to ensure scalability, minimize costs, and optimize resource utilization",
    logo: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const education = [
  {
    date: "2012 - 2016",
    title: "Bachelor of Science in Computer Science",
    subtitle: "University of Technology",
    description: "Focused on software engineering, web development, and user experience design. Graduated with honors.",
  },
  {
    date: "2018",
    title: "Advanced React & Redux Certification",
    subtitle: "Frontend Masters",
    description: "Intensive course covering advanced React patterns, Redux state management, and modern frontend development practices.",
  },
];

const facts = [
  "I've visited over 20 countries",
  "I play guitar in a local band",
  "I'm a coffee enthusiast with my own espresso machine",
  "I contribute to open-source projects in my free time",
  "I've completed three marathons",
  "I'm learning Japanese as a third language",
  "I enjoy rock climbing and hiking",
  "I collect vintage programming books",
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [randomFact, setRandomFact] = useState(facts[0]);

  const changeRandomFact = () => {
    const newFact = facts[Math.floor(Math.random() * facts.length)];
    if (newFact !== randomFact) {
      setRandomFact(newFact);
    } else {
      changeRandomFact();
    }
  };

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsLoading(false);
      setIntroComplete(true);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      {isLoading ? (
        <PreLoader onLoadComplete={handleLoadComplete} />
      ) : (
        <>
          <Navigation />
          <main className="min-h-screen">
            {/* Hero Section */}
            <section
              id="home"
              className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden geometric-bg"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute h-48 w-48 rounded-full bg-primary/5 top-1/4 left-1/4 -translate-x-1/2 animate-pulse" style={{ animationDuration: '15s' }} />
                <div className="absolute h-64 w-64 rounded-full bg-primary/5 bottom-1/4 right-1/4 translate-x-1/2 animate-pulse" style={{ animationDuration: '20s' }} />
              </div>

              <div className="text-center max-w-4xl space-y-6 z-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <SplitFlapText
                    text="Tanish Parsana"
                    className="font-mono"
                    onComplete={() => setIntroComplete(true)}
                  />
                </h1>

                {introComplete && (
                  <div className="animate-slide-up">
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                      <SplitFlapText
                        text="Full Stack Developer, Data Science & AI Engineer"
                        delay={200}
                        className="font-mono"
                      />
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                      <Button asChild>
                        <a href="#projects">View My Work</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="#contact">Get In Touch</a>
                      </Button>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a href="#about">
                      <ChevronDown className="h-6 w-6" />
                      <span className="sr-only">Scroll Down</span>
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section
              id="about"
              className="py-20 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-16 text-center">
                  <SplitFlapText text="About Me" className="font-mono" />
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <p className="text-lg">
                      I'm a passionate frontend developer with over 6 years of experience
                      creating engaging, responsive, and accessible web applications.
                      I specialize in React, TypeScript, and modern CSS frameworks,
                      with a focus on creating performant and visually appealing user interfaces.
                    </p>
                    <p className="text-lg">
                      When I'm not coding, you can find me exploring new technologies,
                      contributing to open-source projects, or enjoying outdoor activities.
                      I believe in continuous learning and staying updated with the latest
                      trends in web development.
                    </p>

                    <div className="pt-4">
                      <FlipCard
                        className="h-40"
                        frontContent={
                          <div className="flex flex-col h-full items-center justify-center">
                            <p className="text-lg font-semibold mb-2">Did you know?</p>
                            <p className="text-center text-muted-foreground">
                              {randomFact}
                            </p>
                          </div>
                        }
                        backContent={
                          <div className="flex flex-col h-full items-center justify-center">
                            <p className="text-lg font-semibold mb-2">Another fact</p>
                            <Button 
                              variant="ghost" 
                              onClick={(e) => {
                                e.stopPropagation();
                                changeRandomFact();
                              }}
                            >
                              Show me more
                            </Button>
                          </div>
                        }
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-square rounded-2xl overflow-hidden split-flap-display bg-muted/20">
                      <img
                        src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Tanish Parsana"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-card p-4 rounded-lg shadow-lg max-w-[80%]">
                      <p className="font-mono text-sm">
                        "I build things for the web that people love to use."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              className="py-20 px-4 bg-muted/20"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-16 text-center">
                  <SplitFlapText text="My Projects" className="font-mono" />
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={index}
                      {...project}
                      className={cn(
                        "opacity-0",
                        "animate-fade-in",
                        { "animation-delay-100": index % 2 === 1 },
                        { "animation-delay-200": index >= 2 }
                      )}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="py-20 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-16 text-center">
                  <SplitFlapText text="Experience" className="font-mono" />
                </h2>

                <div className="mb-16">
                  {experiences.map((experience, index) => (
                    <TimelineItem key={index} {...experience} />
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-8 text-center">
                  <SplitFlapText text="Education" className="font-mono" />
                </h3>

                <div>
                  {education.map((edu, index) => (
                    <TimelineItem key={index} {...edu} />
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section
              id="contact"
              className="py-20 px-4 bg-muted/20"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-16 text-center">
                  <SplitFlapText text="Get In Touch" className="font-mono" />
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
                    <p className="mb-6">
                      I'm currently available for freelance work and full-time positions.
                      If you have a project that needs some creative touches or
                      if you're looking to add a developer to your team, I'd love to hear from you.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href="mailto:hello@example.com" className="hover:text-primary transition-colors">
                          hello@example.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Github className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          github.com/johndoe
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Linkedin className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          linkedin.com/in/johndoe
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t">
              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} Tanish Parsana. All rights reserved.
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="icon" asChild>
                      <a href="https://github.com/tparsana" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="https://www.linkedin.com/in/tanish-parsana/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </>
      )}
    </ThemeProvider>
  );
};

export default Index;
