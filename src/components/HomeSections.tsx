import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import SplitFlapText from "@/components/SplitFlapText";
import TechStackCompact from "@/components/TechStackCompact";
import TimelineItem from "@/components/TimelineItem";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects-unified";

const projects = [
  {
    title: "ACTV",
    description:
      "An AI-powered fitness & nutrition coach that builds adaptive workout routines and meal plans, using RAG-based guidance and progress tracking to deliver personalized recommendations that evolve with your goals.",
    image:
      "https://images.unsplash.com/photo-1534146789009-76ed5060ec70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: [
      "React",
      "Node.js",
      "Python",
      "LangChain",
      "LLMs",
      "Vector DB",
      "OpenAI API",
      "Gemini API",
      "MongoDB",
    ],
    githubUrl: "https://github.com/tparsana/ACTV",
    liveUrl: "https://example.com",
  },
  {
    title: "Assigned",
    description:
      "A streamlined project management platform tailored to construction teams, combining task tracking, scheduling, and collaboration tools, with upcoming WhatsApp integration to keep projects moving forward in real time.",
    image:
      "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: [
      "TypeScript",
      "React",
      "Firebase",
      "Supabase",
      "Tailwind",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux",
      "Material-UI",
      "React Router",
      "Axios",
    ],
    githubUrl: "https://github.com/tparsana/buildtrack-constructify",
    liveUrl: "https://assigned-tasks.glide.page",
  },
  {
    title: "UnionSky",
    description:
      "A plane-spotting web app that streams live flight data from aircrafts outside my room window, displaying routes, airlines, and aircraft details in real time through a clean interface built for aviation enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1569839333583-7375336cde4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: [
      "Python",
      "TypeScript",
      "OpenSky API",
      "FlightRadar API",
      "REST API",
      "Requests",
      "React",
      "Real-time Data",
      "Data Visualization",
    ],
    githubUrl: "https://github.com/tparsana/unionsky-website",
    liveUrl: "https://unionsky.vercel.app",
  },
  {
    title: "LaterTube",
    description:
      "A distraction-free YouTube watchlist that bypasses Youtube ad layer, lets you save and organize videos with tags and priorities to come back to later, and keeps everything in sync in real time with proper AUTH and DB.",
    image:
      "https://images.unsplash.com/photo-1625813948790-936f256faea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Supabase Auth",
      "Supabase Realtime",
      "PostgreSQL",
      "Youtube Data API",
    ],
    githubUrl: "https://github.com/tparsana/YourTube",
    liveUrl: "https://latertube.vercel.app",
  },
];

const experiences = [
  {
    date: "Apr 2025 - Present",
    title: "Vice President - Industry Relations",
    subtitle: "DevLabs Club at ASU",
    description:
      "As Vice President at DevLabs, ASU’s student-run startup incubator and innovation community, I led venture partnerships, startup support, and large-scale programming. I structured venture pipelines, mentorship programs, sponsorship strategies, and founder support frameworks that helped over a dozen early-stage student startups refine go-to-market strategies, validate product-market fit, and raise over $70K in funding. I also led the execution of large-scale hackathons, startup accelerators, and industry events with over 2,000+ participants, building long-term partnerships with venture capital firms, founders, and corporate leaders to create a strong campus-to-industry innovation pipeline.",
    location: "Tempe, AZ, USA",
    logo: "https://se-images.campuslabs.com/clink/images/6a2c4d9c-80b5-43ff-8fa5-a52d88b6f87c7e6dae53-2d5e-48ad-ba03-a59bd359a9b3.jpeg?preset=med-sq",
  },
  {
    date: "Aug 2024 - Apr 2025",
    title: "Officer of Industry Relations",
    subtitle: "DevLabs Club at ASU",
    description:
      "Before stepping into VP, I served as an Industry Relations Officer at DevLabs, where I focused on building relationships between students and the tech/startup ecosystem. I worked with founders, investors, and industry professionals to secure sponsorships, bring in speakers and mentors, and create meaningful opportunities for students to engage with real-world innovation. I helped organize networking events, startup showcases, and workshops that connected students with companies, enabling career opportunities, internships, and early exposure to the startup ecosystem.",
    location: "Tempe, AZ, USA",
    logo: "https://se-images.campuslabs.com/clink/images/6a2c4d9c-80b5-43ff-8fa5-a52d88b6f87c7e6dae53-2d5e-48ad-ba03-a59bd359a9b3.jpeg?preset=med-sq",
  },
  {
    date: "Aug 2025 - Present",
    title: "Senior Creative Technology Consultant",
    subtitle: "Zoom Innovation Lab at Enterprise Technology - ASU",
    description:
      "After being promoted into a leadership role at the ASU × Zoom Innovation Lab, I led technical operations for a team managing high-volume podcasting, streaming, and digital production studios. Beyond supporting creative production environments, I focused heavily on building internal systems to improve how the organization operates. I designed and deployed web-based tools including an asset tracking system for production equipment, a lightweight ERP and employee management platform, and workforce scheduling and automation workflows using Google Apps Script, Power Automate, Zapier, and custom integrations. These systems reduced manual overhead, improved operational efficiency, and allowed the team to scale support for both internal university users and external partners.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "Aug 2023 - Aug 2025",
    title: "Technology Consultant",
    subtitle: "Tech Hub at Enterprise Technology - ASU",
    description:
      "In my role as a Technology Consultant at ASU Enterprise Technology, I provided enterprise-level technical support across hardware, software, and network systems for over 1,000 students, staff, and faculty. While resolving complex system issues and improving resolution times, I also identified recurring failure patterns and built preventive solutions to reduce repeated support requests. I later designed and deployed an LLM-backed RAG web application using OpenAI APIs and ASU’s internal knowledge base to create a self-service technical support agent. This tool helped users troubleshoot issues independently through a chat interface and reduced repetitive support tickets by over 25%, improving both user experience and operational efficiency.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "May 2024 - Aug 2024",
    title: "Data Science & AI Intern",
    subtitle: "York IE",
    description:
      "At York IE, I worked on the data science and AI team building intelligence systems for Fuel, a VC-backed SaaS analytics platform. I engineered and deployed a production Retrieval-Augmented Generation (RAG) system using AWS Bedrock, OpenAI GPT APIs, and Pinecone to power semantic search and cross-entity relationship mapping across millions of SaaS company records. The system helped surface hidden connections between companies, founders, and investors, enabling deeper market analysis and decision-making. I also built scalable embedding and vector search pipelines with optimized preprocessing, feature engineering, and retrieval evaluation, improving search relevance and query performance by 45% in production..",
    location: "Manchester, NH, USA",
    logo: "https://avatars.slack-edge.com/2021-06-16/2178256167170_381b8dc0864c2ff691e3_512.png",
  },
  {
    date: "May 2023 - Aug 2023",
    title: "Data Science Intern",
    subtitle: "York IE",
    description:
      "During my first summer at York IE, I built production-scale data infrastructure to support pricing intelligence for their SaaS analytics product. I engineered a large-scale web scraping and data ingestion pipeline that processed over 3 million company records, extracting subscription and pricing data across the web. Using AWS services like S3, Glue, and Lambda, I designed scalable ETL workflows to clean, normalize, and integrate this data directly into the Fuel platform. My work significantly expanded pricing intelligence coverage and enabled more accurate benchmarking for SaaS companies, while ensuring the pipeline was reliable, efficient, and production-ready.",
    location: "Manchester, NH, USA",
    logo: "https://avatars.slack-edge.com/2021-06-16/2178256167170_381b8dc0864c2ff691e3_512.png",
  },
];

const education = [
  {
    date: "2022 - 2026",
    title: "Bachelor of Science in Computer Science, Minor in Business",
    subtitle: "Arizona State University",
    description:
      "Focused on software engineering, web development, data science and user experience design.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "2010 - 2022",
    title: "High School Diploma",
    subtitle: "St. Kabir School",
    description:
      "Completed CBSE schooling with strong academic foundation and holistic development focus.",
    location: "Ahmedabad, GJ, India",
    logo: "https://stkabir.com/wp-content/uploads/2024/12/logo.png",
  },
];

const extracurricular = [
  {
    date: "2025",
    title: "Ironman Arizona Triathlon",
    subtitle: "Endurance Athletics",
    description:
      "Competed and Finished the Ironman Arizona triathlon, in November 2025. The preparation involves rigorous swimming, cycling, and running regimens, along with nutrition planning and mental conditioning for this ultimate test of endurance. Race includes Swim - 2.4 miles, Bike - 112 miles, and Run - 26.2 miles. Finish time - 14:22:34 hrs.",
    location: "Tempe, AZ, USA",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_mTtApPEGx_zR-2hiGgDKuI8jlbrhiTngwOY4wveB5-cxA=s900-c-k-c0x00ffffff-no-rj",
  },
];

const facts = [
  "Finished Ironman Arizona 2025, Yougest from the State of Gujarat, India.",
  "Accidentally became the tech support for family’s real estate biz.",
  "Believes “just one more API” is always the solution.",
  "I contribute to open-source projects in my free time",
  "I've completed 14 half-marathons",
  "Has more Notion dashboards than real-life responsibilities (almost).",
  "I enjoy filmmaking - currently shooting a Documentary.",
  "Trains for Ironmans but cries cycling up small hills.",
];

const HomeSections = () => {
  const [randomFact, setRandomFact] = useState(facts[0]);
  const [homeProjects, setHomeProjects] = useState<Project[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const loadHomeProjects = async () => {
      const { getHomePageProjects } = await import("@/data/projects-unified");
      const dynamicProjects = await getHomePageProjects();

      if (isCancelled) return;

      if (dynamicProjects.length > 0) {
        setHomeProjects(dynamicProjects);
        return;
      }

      const fallbackProjects: Project[] = projects.slice(0, 4).map((project, index) => ({
        id: `static-${index}`,
        slug: project.title.toLowerCase().replace(/\s+/g, "-"),
        longDescription: project.description,
        featured: index < 2,
        status: "completed" as const,
        startDate: "2024-01-01",
        category: "web" as const,
        technologies: project.tags,
        seo: {
          metaTitle: `${project.title} - Tanish Parsana`,
          metaDescription: project.description.slice(0, 160),
          keywords: project.tags,
        },
        ...project,
      }));

      setHomeProjects(fallbackProjects);
    };

    loadHomeProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  const changeRandomFact = () => {
    let nextFact = facts[Math.floor(Math.random() * facts.length)];

    while (nextFact === randomFact) {
      nextFact = facts[Math.floor(Math.random() * facts.length)];
    }

    setRandomFact(nextFact);
  };

  return (
    <>
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <SplitFlapText text="About Me" className="font-mono" />
          </h2>

          <div className="grid items-start gap-8 md:grid-cols-2 md:items-stretch md:gap-10">
            <div className="flex h-full flex-col justify-between gap-6 md:gap-8">
              <div className="space-y-5 md:space-y-6">
                <p className="text-lg leading-[1.7]">
                  I&apos;m an unusually strong problem solver with a very high pain tolerance for hard
                  things, and that shows up in both my work and my life. While training 25 hours a
                  week for Ironman Arizona, I was also building and shipping real products, helping
                  lead a 2,000+ student startup community through DevLabs, supporting 25 student-led
                  startups and $70K raised, partnering on events with groups like Google DeepMind
                  and Cloudflare, working in technical roles at ASU, and staying on top of a
                  full-time CS degree with a business minor.
                  <br />
                  <br />
                  I do not quit easily, I do not need to be micromanaged, and when something
                  matters, I will outwork, outlearn, and outlast most people in the room.
                </p>
              </div>

              <div className="pt-2 md:pt-0">
                <div
                  className="min-h-[132px] w-full cursor-pointer rounded-lg border bg-card p-5 shadow transition-all duration-300 hover:scale-[1.02] hover:shadow-lg md:min-h-[118px]"
                  onClick={changeRandomFact}
                >
                  <div className="flex h-full flex-col items-center justify-center">
                    <p className="mb-2 text-lg font-semibold">Fun Fact:</p>
                    <p className="text-center text-muted-foreground">{randomFact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full">
              <div className="aspect-square h-full overflow-hidden rounded-2xl split-flap-display bg-muted/20">
                <img
                  src="https://www.dropbox.com/scl/fi/za6ckhateobx7oqg3sqoa/IMG_0081.heic?rlkey=n5txakao498pldtybrih3dldn&st=zcgudw35&&raw=1"
                  alt="Tanish Parsana"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="h-full w-full object-cover object-center [object-position:center_30%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4">
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

      <section id="projects" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <SplitFlapText text="My Projects" className="font-mono" />
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {homeProjects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
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

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects" className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <SplitFlapText text="Tech Stack" className="font-mono" />
          </h2>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <TechStackCompact />
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <SplitFlapText text="Get In Touch" className="font-mono" />
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
              <p className="mb-6">
                I&apos;m currently available for full-time and co-op positions. If you have a
                project that needs some creative touches or if you&apos;re looking to add a developer
                to your team, I&apos;d love to hear from you.
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
                  <a
                    href={siteConfig.urls.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {siteConfig.urls.github.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <a
                    href={siteConfig.urls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {siteConfig.urls.linkedin.replace("https://", "")}
                  </a>
                </div>
                <div className="flex items-center">
                  <Twitter className="h-5 w-5 mr-3 text-muted-foreground" />
                  <a
                    href={siteConfig.urls.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
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
          <div className="flex flex-col items-center justify-between md:flex-row">
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
    </>
  );
};

export default HomeSections;
