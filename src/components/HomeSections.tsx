import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import TechStackCompact from "@/components/TechStackCompact";
import TimelineItem from "@/components/TimelineItem";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects-unified";

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
    title: "Senior AI Tech Consultant",
    subtitle: "Enterprise Technology, ASU",
    description:
      "Promoted to lead a team of 5 engineers building internal AI workflow automation and operations tools, including asset management, ERP systems, and workforce scheduling applications using Python, SQL, and Azure workflows for a 50-person team. Contributed to CreateAI backend systems across model routing, document ingestion, retrieval, vector search, and access control, enabling configurable RAG workflows where users select LLMs, add knowledge bases, and generate document-grounded AI agents.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "Aug 2023 - Aug 2025",
    title: "AI Tech Consultant",
    subtitle: "Enterprise Technology, ASU",
    description:
      "Built and deployed a full-stack AI support application using enterprise knowledge indexing, OpenAI APIs, Python, and vector embedding and search to deliver self-service troubleshooting, automate ticket deflection, and reduce repetitive support tickets by 40%. Developed backend retrieval and orchestration for ASU CreateAI Chat, supporting multi-model, prompt-configured workflows with knowledge-base ingestion, embeddings, and API integration for a university AI platform used by 10,000+ unique users.",
    location: "Tempe, AZ, USA",
    logo: "https://aci.az.gov/sites/default/files/media/ASU-logo.png",
  },
  {
    date: "May 2024 - Aug 2024",
    title: "AI Engineering Intern",
    subtitle: "York IE",
    description:
      "At York IE, I worked on the data science and AI team building intelligence systems for Fuel, a VC-backed SaaS analytics platform. I engineered and deployed a production Retrieval-Augmented Generation (RAG) system using AWS Bedrock, OpenAI GPT APIs, and Pinecone to power semantic search and cross-entity relationship mapping across millions of SaaS company records. The system helped surface hidden connections between companies, founders, and investors, enabling deeper market analysis and decision-making. I also built scalable embedding and vector search pipelines with optimized preprocessing, feature engineering, and retrieval evaluation, improving search relevance and query performance by 45% in production..",
    location: "Manchester, NH, USA",
    logo: "https://avatars.slack-edge.com/2021-06-16/2178256167170_381b8dc0864c2ff691e3_512.png",
  },
  {
    date: "May 2023 - Aug 2023",
    title: "Data Science & AI Intern",
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
  "Finished Ironman Arizona 2025, Youngest from the State of Gujarat, India.",
  "I provide SaaS to my family real estate businesses.",
  "Can romanticize both - startup chaos and 5 am long runs.",
  "Hosted 4 Hackathons with 500+ participants each.",
  "Has completed 22 half-marathons.",
  "Has more Notion dashboards than real-life responsibilities (almost).",
  "I enjoy filmmaking - currently shooting a Documentary.",
  "Believes great products, great stories, and great races are all won in the boring middle.",
];

const aboutImages = [
  "https://www.dropbox.com/scl/fi/5wocl6h65l6nigijs1mzl/Tanish-Parsana.png?rlkey=eawemru440kd7aa9skuz6zpik&st=ytmukp9h&raw=1",
  "https://www.dropbox.com/scl/fi/kmfdrs0k39tadtgsd3e35/IM-Finish.JPG?rlkey=oanonj2wp7jgl6fbmz40bvsp5&st=oyvrmnb7&raw=1",
  "https://www.dropbox.com/scl/fi/7osklrppw74rb3cctl5l1/Cycling-cropped.png?rlkey=wevs4d6paxpe9r5kfaxjdejvu&st=1cl1i9pb&raw=1",
  "https://www.dropbox.com/scl/fi/th1rfnvlrx8hc6s2hyvry/Landscape.HEIC?rlkey=nerplofhtfgr54m89ddyzkck7&st=vwfraxyh&raw=1",
  "https://www.dropbox.com/scl/fi/trn96mbsirtswrgttnvs7/YorkIE-cropped.JPG?rlkey=098xl1zno7j5ajyl9yyj9wtme&st=jy7ocg1t&raw=1",
  "https://www.dropbox.com/scl/fi/q6rf6vg3a76ckhc5pt1fo/IM-Run-cropped.JPG?rlkey=hnk144ijnvqku1khyefm68a01&st=4wn263vg&raw=1",
  "https://www.dropbox.com/scl/fi/mhlptmpqkauzdjvfah56a/TParsana-headshot.jpg?rlkey=nt8nznyuxbxom38ybw0bborvg&st=1zx0tag9&raw=1",
];

const HomeSections = () => {
  const [randomFact, setRandomFact] = useState(facts[0]);
  const [homeProjects, setHomeProjects] = useState<Project[]>([]);
  const [activeAboutImageIndex, setActiveAboutImageIndex] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const loadHomeProjects = async () => {
      const { getHomePageProjects } = await import("@/data/projects-unified");
      const homePageProjects = await getHomePageProjects();

      if (isCancelled) return;

      setHomeProjects(homePageProjects);
    };

    loadHomeProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (aboutImages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveAboutImageIndex((currentIndex) =>
        (currentIndex + 1) % aboutImages.length
      );
    }, 4200);

    return () => window.clearInterval(intervalId);
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
            <span className="font-mono">About Me</span>
          </h2>

          <div className="grid items-start gap-8 md:grid-cols-2 md:items-stretch md:gap-10">
            <div className="flex h-full flex-col justify-between gap-6 md:gap-8">
              <div className="space-y-5 md:space-y-6">
                <p className="text-lg leading-[1.7]">
                  I&apos;m an unusually strong problem solver with a very high pain tolerance for hard
                  things, and that shows up in both my work and my life. While training 25 hours a
                  week for Ironman Arizona, I was also building and shipping real products, leading
                  a 2,000+ student entrepreneur community through DevLabs. Helped incubate, mentor and support 25 student-led
                  startups, and raise $70K in pre-seed funding, partnering on events with giants like Google DeepMind
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
              <div className="relative aspect-square h-full overflow-hidden rounded-2xl split-flap-display bg-muted/20">
                {aboutImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt="Tanish Parsana"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "low"}
                    aria-hidden={index !== activeAboutImageIndex}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover object-center [object-position:center_30%] transition-opacity duration-1000 ease-in-out",
                      index === activeAboutImageIndex ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <span className="font-mono">Experience</span>
          </h2>

          <div className="mb-16">
            {experiences.map((experience, index) => (
              <TimelineItem key={index} {...experience} />
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="font-mono">Education</span>
          </h3>

          <div className="mb-16">
            {education.map((edu, index) => (
              <TimelineItem key={index} {...edu} />
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="font-mono">Interests</span>
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
            <span className="font-mono">My Products</span>
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
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="font-mono">Tech Stack</span>
          </h2>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <TechStackCompact />
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-16 text-center">
            <span className="font-mono">Get In Touch</span>
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
