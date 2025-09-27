import { useParams, Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import SplitFlapText from "@/components/SplitFlapText";
import SEO from "@/components/SEO";
import { getBlogPostBySlug, updateBlogPostReads } from "@/data/blogs-unified";
import { Calendar, Clock, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [hasIncrementedReads, setHasIncrementedReads] = useState(false);
  
  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        const foundPost = await getBlogPostBySlug(slug);
        setPost(foundPost);
        
        // Increment read counter only once per visit
        if (foundPost && !hasIncrementedReads) {
          await updateBlogPostReads(foundPost.id);
          setHasIncrementedReads(true);
          
          // Update the local post state with the new read count
          setTimeout(async () => {
            const updatedPost = await getBlogPostBySlug(slug);
            setPost(updatedPost);
          }, 100);
        }
      }
    };
    loadPost();
  }, [slug, hasIncrementedReads]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatContent = (content: string) => {
    // Split content by paragraphs and format
    const lines = content.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-bold mb-6 mt-8 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold mb-4 mt-6">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold mb-3 mt-5">
            {line.replace('### ', '')}
          </h3>
        );
      }

      // Code blocks
      if (line.startsWith('```')) {
        return null; // Handle these separately
      }

      // Lists
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={index} className="mb-2 ml-4">
            {line.replace(/^[•\-] /, '')}
          </li>
        );
      }

      // Bold text formatting
      const formatBoldText = (text: string) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      };

      // Regular paragraphs
      if (line.trim()) {
        return (
          <p 
            key={index} 
            className="mb-4 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: formatBoldText(line) }}
          />
        );
      }

      return null;
    }).filter(Boolean);
  };

  if (!post) {
    return (
      <ThemeProvider defaultTheme="dark">
        <Navigation />
        <main className="min-h-screen">
          <AnimatedBackground />
          <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-4xl space-y-6 z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Post Not Found
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link to="/thoughts">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Thoughts
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <SEO
        title={post.seo.metaTitle}
        description={post.seo.metaDescription}
        keywords={post.seo.keywords}
        ogImage={post.seo.ogImage || "/preview.png"}
        ogType="article"
        publishedTime={post.publishedAt}
        canonicalUrl={`${window.location.origin}/thoughts/${post.slug}`}
      />
      <Navigation />
      <main className="min-h-screen">
        <AnimatedBackground />
        
        {/* Back Navigation */}
        <section className="relative pt-24 pb-8 px-4">
          <div className="container mx-auto max-w-4xl z-10 relative">
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/thoughts" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                back to blog
              </Link>
            </Button>
          </div>
        </section>

        {/* Blog Post Header */}
        <section className="relative px-4 pb-12">
          <div className="container mx-auto max-w-4xl z-10 relative">
            <article>
              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <SplitFlapText
                  text={post.title}
                  className="font-mono"
                />
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-6 border-b border-muted-foreground/20">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.totalReads} total reads</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-12">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full border border-orange-400/30 text-orange-400 bg-orange-400/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Blog Content */}
        <section className="relative px-4 pb-20">
          <div className="container mx-auto max-w-4xl z-10 relative">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-4">
                {formatContent(post.content)}
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-16 pt-8 border-t border-muted-foreground/20">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Published on {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center">
              <Button asChild>
                <Link to="/thoughts" className="flex items-center gap-2 mx-auto">
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Thoughts
                </Link>
              </Button>
            </div>
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

export default BlogPost;
