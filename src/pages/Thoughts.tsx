import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEO from "@/components/SEO";
import { getBlogPostsByYear } from "@/data/blogs-unified";
import { Calendar, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const Thoughts = () => {
  const [postsByYear, setPostsByYear] = useState<Record<number, any[]>>({});
  const [years, setYears] = useState<number[]>([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const loadPosts = async () => {
      console.log('🔍 Loading blog posts in Thoughts page...');
      const posts = await getBlogPostsByYear();
      console.log('📝 Blog posts loaded:', posts);
      setPostsByYear(posts);
      setYears(Object.keys(posts).map(Number).sort((a, b) => b - a));
    };
    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <SEO
        title="Thoughts & Blog - Tanish Parsana"
        description="Personal thoughts, technical insights, and reactions on technology, development, AI, and innovation by Tanish Parsana."
        keywords={["blog", "thoughts", "technology", "AI", "development", "insights", "Tanish Parsana"]}
        ogType="website"
      />
      <Navigation />
      <main className="min-h-screen">
        <AnimatedBackground />
        
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="text-center max-w-6xl space-y-6 z-10 flex items-center justify-center min-h-[40vh] sm:min-h-[50vh]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center w-full">
              <span className="font-mono">Blogs, Thoughts And Reactions</span>
            </h1>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto max-w-4xl">
            {years.map((year) => (
              <div key={year} className="mb-16">
                {/* Year Header */}
                <div className="mb-8 md:mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 font-mono">
                    {year}
                  </h2>
                </div>

                {/* Posts for this year */}
                <div className="space-y-8">
                  {postsByYear[year].map((post, index) => (
                    <article
                      key={post.id}
                      className={cn(
                        "group cursor-pointer transition-all duration-300 hover:scale-[1.02]",
                        "opacity-0 animate-fade-in",
                        { "animation-delay-100": index % 3 === 1 },
                        { "animation-delay-200": index % 3 === 2 }
                      )}
                    >
                      <Link 
                        to={`/thoughts/${post.slug}`}
                        className="block"
                      >
                        <div className="border-b border-muted-foreground/20 pb-4 md:pb-6 group-hover:border-orange-400/50 transition-colors">
                          {/* Post Title */}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 md:mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Post Meta */}
                          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground mb-2 md:mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{post.readTime} min read</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{post.totalReads} reads</span>
                            </div>
                          </div>

                          {/* Post Excerpt */}
                          <p className="text-sm sm:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap items-center gap-1 md:gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full border border-orange-400/30 text-orange-400 bg-orange-400/10"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs rounded-full border border-orange-400/30 text-orange-400 bg-orange-400/10">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {years.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No thoughts shared yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Tanish Parsana. All thoughts and reactions.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
};

export default Thoughts;
