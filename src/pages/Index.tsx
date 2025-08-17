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
import TechStackCompact from "@/components/TechStackCompact";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import AnimatedBackground from "@/components/AnimatedBackground";

const projects = [
  {
    title: "ACTV",
    description: "A RAG based Dynamic and Personalized Fitness and Nutrition Coach to suggest Customized Workout and Meal Plans.",
    image: "https://images.unsplash.com/photo-1534146789009-76ed5060ec70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["React", "Node.js", "Python", "LangChain", "LLMs", "Vector DB", "OpenAI API", "Gemini API", "MongoDB"],
    githubUrl: "https://github.com/tparsana/ACTV",
    liveUrl: "https://example.com",
  },
  {
    title: "Assigned",
    description: "A super easy to use Project Management App focuing on construction project (with WhatsApp integration upcoming).",
    image: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["TypeScript", "React", "Firebase", "Supabase", "Tailwind", "Node.js", "Express.js", "MongoDB", "Redux", "Material-UI", "React Router", "Axios"],
    githubUrl: "https://github.com/tparsana/buildtrack-constructify",
    liveUrl: "https://assigned-tasks.glide.page",
  },
  {
    title: "UnionSky",
    description: "Plane-spotting web app for displaying the information of all the flights that fly outside my window.",
    image: "https://images.unsplash.com/photo-1569839333583-7375336cde4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "TypeScript", "OpenSky API", "FlightRadar API", "REST API", "Requests", "React", "Real-time Data", "Data Visualization"],
    githubUrl: "https://github.com/tparsana/unionsky-website",
    liveUrl: "https://unionsky.vercel.app", 
  },
  {
    title: "LaterTube",
    description: "A distraction-free YouTube watchlist that bypasses ads, lets you save and organize videos with tags and priorities, and keeps everything in sync in real time.",
    image: "https://images.unsplash.com/photo-1625813948790-936f256faea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Supabase Auth", "Supabase Realtime", "PostgreSQL", "Youtube Data API"],
    githubUrl: "https://github.com/tparsana/YourTube",
    liveUrl: "https://latertube.vercel.app",
  },
];

const experiences = [
  {
    date: "Apr 2025 - Present",
    title: "Vice President - Industry Relations",
    subtitle: "DevLabs Club at ASU",
    description: "Promoted from Officer to Vice President to lead DevLabs' external partnerships with startups, venture capital firms, and industry leaders. Managing and mentoring the Industry Team to drive strategic outreach, secure sponsorships, and bring real-world connections to student-led projects. Spearheading initiatives that connect student founders with the broader tech ecosystem to build, launch, and scale impactful innovations.",
    location: "Tempe, AZ, USA",
    logo: "https://se-images.campuslabs.com/clink/images/6a2c4d9c-80b5-43ff-8fa5-a52d88b6f87c7e6dae53-2d5e-48ad-ba03-a59bd359a9b3.jpeg?preset=med-sq",
  },
  {
    date: "Aug 2024 - Apr 2025",
    title: "Officer of Industry Relations",
    subtitle: "DevLabs Club at ASU",
    description: "As an Industry Relations Officer at DevLabs at ASU, I focus on building strong relationships with tech companies and industry professionals. My role involves organizing networking events, securing sponsorships, and connecting club members with valuable industry opportunities. I act as a bridge between our passionate student community and the tech industry, helping peers advance their careers and gain real-world insights.",
    location: "Tempe, AZ, USA",
    logo: "https://se-images.campuslabs.com/clink/images/6a2c4d9c-80b5-43ff-8fa5-a52d88b6f87c7e6dae53-2d5e-48ad-ba03-a59bd359a9b3.jpeg?preset=med-sq",
  },
  {
    date: "Aug 2025 - Present",
    title: "Senior Technology Consultant",
    subtitle: "Zoom Innovation Lab at Enterprise Technology - ASU",
    description: "Promoted to Senior Tech Consultant at Arizona State University’s Zoom Innovation Lab and Tech Hub, where I get to lead an incredible team of consultants and help bring ideas to life through technology. My role blends hands-on problem solving with big-picture leadership — from making sure our recording and production equipment runs seamlessly, to troubleshooting challenges, to building strong relationships with clients and collaborators. What I love most is driving innovation and teamwork at both the ZIL and Tech Hub, creating spaces where creativity and technology come together to make an impact.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "Aug 2023 - Aug 2025",
    title: "Technology Consultant",
    subtitle: "Tech Hub at Enterprise Technology - ASU",
    description: "As a Tech Consultant at ASU, I play a pivotal role in driving technological efficiency across the university. I provide high-level support to students and faculty, optimising system performance, streamlining software deployments, and resolving complex technical challenges. In addition to troubleshooting, I lead training initiatives to enhance digital literacy and ensure smooth operations across diverse departments, contributing to the university's digital transformation efforts.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "May 2024 - Aug 2024",
    title: "Data Science & AI Intern",
    subtitle: "York IE",
    description: "Built and deployed a Retrieval-Augmented Generation (RAG) model using LLMs such as AWS Bedrock and OpenAI GPT 4o, strategically balancing cost and speed for embedding generation and text processing for an internal research tool for the firm’s vast database. Developed an efficient pipeline for creating embeddings from database, leveraging AWS Services and integrating Vector Databases (Pinecone) to enhance retrieval capabilities. Designed and optimized AI API schemas to streamline data processing workflows, carefully evaluating solutions like embeddings and large-scale inference models to ensure scalability, minimize costs, and optimize resource utilization.",
    location: "Manchester, NH, USA",
    logo: "https://avatars.slack-edge.com/2021-06-16/2178256167170_381b8dc0864c2ff691e3_512.png",
  },
  {
    date: "May 2023 - Aug 2023",
    title: "Data Science Intern",
    subtitle: "York IE",
    description: "Developed data collection and preprocessing initiatives, enhancing data analysis capabilities through effective scraping and sorting techniques. Engineered and integrated schemas for AI APIs, significantly improving data processing efficiency from voluminous datasets. Implemented AWS S3, Lambda, and Batch, along with Docker containers, streamlining data storage, access, and processing, ensuring system independence. Contributed to the development lifecycle by actively participating in code reviews, embracing, and implementing feedback to refine and optimize code quality.",
    location: "Manchester, NH, USA",
    logo: "https://avatars.slack-edge.com/2021-06-16/2178256167170_381b8dc0864c2ff691e3_512.png",
  },
];

const education = [
  {
    date: "2022 - 2026",
    title: "Bachelor of Science in Computer Science, Minor in Business",
    subtitle: "Arizona State University",
    description: "Focused on software engineering, web development, data science and user experience design.",
    location: "Tempe, AZ, USA",
  },
  {
    date: "2010 - 2022",
    title: "High School Diploma",
    subtitle: "St. Kabir School",
    description: "Completed CBSE schooling with strong academic foundation and holistic development focus.",
    location: "Ahmedabad, GJ, India",
  },
];

const extracurricular = [
  {
    date: "2025",
    title: "Ironman Arizona Triathlon",
    subtitle: "Endurance Athletics",
    description: "Currently training for the Ironman Arizona triathlon. The preparation involves rigorous swimming, cycling, and running regimens, along with nutrition planning and mental conditioning for this ultimate test of endurance.",
    location: "Tempe, AZ, USA",
  }
];

const terminalCommands = {
  joke: [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
    "Why do Java developers wear glasses? Because they don't C#!",
    "How do you comfort a JavaScript bug? You console it!",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why did the developer go broke? Because he used up all his cache!",
    "What's a programmer's favorite hangout place? The Foo Bar!",
    "Why don't programmers like nature? It has too many bugs and no debugging tool."
  ],
  ascii: {
    execute: (text: string) => {
      const largeText = text.split('').join('  ');
      return `
 #####  #####  #####  #####  #####
${largeText.toUpperCase()}
#####  #####  #####  #####  #####`;
    }
  },
  matrix: {
    description: "Activates a Matrix-like screen effect"
  },
  rickroll: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  music: {
    tracks: [
      { name: "Chill Lofi Beat", url: "https://example.com/lofi1.mp3" },
      { name: "Synthwave Cruisin'", url: "https://example.com/synth1.mp3" },
      { name: "Coding Focus", url: "https://example.com/ambient1.mp3" }
    ]
  }
};

const facts = [
  "Triathlete-in-training aiming for Ironman; logs everything on Notion.",
  "Accidentally became the tech support for family’s real estate biz.",
  "Believes “just one more API” is always the solution.",
  "I contribute to open-source projects in my free time",
  "I've completed 8 half-marathons",
  "Has more Notion dashboards than real-life responsibilities (almost).",
  "I enjoy rock climbing and hiking",
  "Trains for Ironman but cries cycling up small hills.",
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
            <AnimatedBackground />
            
            <section
              id="home"
              className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
            >
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
                      I'm a creative and ambitious developer with a strong foundation in full-stack development, AI
                      integration, and modern web technologies. My work blends practical design with powerful
                      functionality, using tools like React, Python, cloud platforms, React, TypeScript, and modern CSS frameworks to build smart, user-centered
                      applications.
                    </p>
                    <p className="text-lg">
                      When I'm not coding, you can find me training for an Ironman, or exploring new technologies,
                      contributing to open-source projects, or enjoying outdoor activities.
                      I believe in continuous learning and staying updated with the latest
                      trends in technology.
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
                                setTimeout(() => {
                                  const element = e.currentTarget.closest('.relative') as HTMLElement;
                                  if (element) {
                                    element.click();
                                  }
                                }, 300);
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
                        src="/IMG_1241.jpeg"
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

            <section
              id="tech-stack"
              className="py-20 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <SplitFlapText text="Tech Stack" className="font-mono" />
                </h2>
                
                <div className="bg-card shadow-lg rounded-xl p-6">
                  <TechStackCompact />
                </div>
              </div>
            </section>

            <section
              id="projects"
              className="py-20 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-16 text-center">
                  <SplitFlapText text="My Projects" className="font-mono" />
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={index}
                      {...project}
                      className={cn(
                        "opacity-0",
                        "animate-fade-in",
                        { "animation-delay-100": index % 4 === 1 },
                        { "animation-delay-200": index % 4 === 2 },
                        { "animation-delay-300": index % 4 === 3 }
                      )}
                    />
                  ))}
                </div>
              </div>
            </section>

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

                <div className="mb-16">
                  {education.map((edu, index) => (
                    <TimelineItem key={index} {...edu} />
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold mb-8 text-center">
                  <SplitFlapText text="Interests" className="font-mono" />
                </h3>

                <div>
                  {extracurricular.map((item, index) => (
                    <TimelineItem key={index} {...item} />
                  ))}
                </div>
              </div>
            </section>

            <section
              id="contact"
              className="py-20 px-4"
            >
              <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold mb-16 text-center">
                  <SplitFlapText text="Get In Touch" className="font-mono" />
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
                    <p className="mb-6">
                      I'm currently available for freelance work and internship positions.
                      If you have a project that needs some creative touches or
                      if you're looking to add a developer to your team, I'd love to hear from you.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                          {siteConfig.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Github className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href={siteConfig.urls.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {siteConfig.urls.github.replace("https://", "")}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Linkedin className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href={siteConfig.urls.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {siteConfig.urls.linkedin.replace("https://", "")}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Twitter className="h-5 w-5 mr-3 text-muted-foreground" />
                        <a href={siteConfig.urls.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {siteConfig.urls.twitter.replace("https://", "")}
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
                      <a href={siteConfig.urls.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={siteConfig.urls.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={siteConfig.urls.twitter} target="_blank" rel="noopener noreferrer">
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
