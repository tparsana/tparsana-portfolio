import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import SplitFlapText from "@/components/SplitFlapText";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <Navigation />
      <main className="min-h-screen">
        <AnimatedBackground />
        
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="text-center max-w-4xl space-y-6 z-10">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-red-400">
              <SplitFlapText text="404" className="font-mono" />
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              <SplitFlapText text="Page Not Found" className="font-mono" />
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, even the best developers encounter 404s!
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-12 text-sm text-muted-foreground">
              <p>Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link to="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
                <Link to="/thoughts" className="hover:text-primary transition-colors">
                  Thoughts
                </Link>
                <Link to="/#about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/#contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
};

export default NotFound;