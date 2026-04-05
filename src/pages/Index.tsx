import { Suspense, lazy, startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import DeferredAnimatedBackground from "@/components/DeferredAnimatedBackground";

const HomeSections = lazy(() => import("@/components/HomeSections"));

const Index = () => {
  const [shouldRenderHomeSections, setShouldRenderHomeSections] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;

    const revealSections = () => {
      startTransition(() => {
        setShouldRenderHomeSections(true);
      });
    };

    const queueReveal = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(revealSections, {
          timeout: 900,
        });
      } else {
        timeoutId = window.setTimeout(revealSections, 180);
      }
    };

    rafId = window.requestAnimationFrame(queueReveal);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (idleCallbackId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    let timeoutId: number | null = null;

    const handleHashNavigation = () => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      startTransition(() => {
        setShouldRenderHomeSections(true);
      });

      let attempts = 0;
      const scrollToHash = () => {
        const element = document.querySelector(hash);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }

        if (attempts < 25) {
          attempts += 1;
          timeoutId = window.setTimeout(scrollToHash, 80);
        }
      };

      timeoutId = window.setTimeout(scrollToHash, 60);
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.removeEventListener("hashchange", handleHashNavigation);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <Navigation />
      <main className="min-h-screen">
            <DeferredAnimatedBackground />
            
            <section
              id="home"
              className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
            >
              <div className="text-center max-w-4xl space-y-6 z-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span
                    className="font-elegant-display inline-block opacity-0 animate-hero-fade-in"
                  >
                    Tanish Parsana
                  </span>
                </h1>

                <div
                  className="opacity-0 animate-hero-fade-in"
                  style={{ animationDelay: "120ms" }}
                >
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                    Full Stack Developer, Data Science & AI Engineer
                  </p>
                </div>

                <div
                  className="opacity-0 animate-hero-fade-in"
                  style={{ animationDelay: "220ms" }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                    <Button asChild>
                      <a href="#projects">View My Work</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="#contact">Get In Touch</a>
                    </Button>
                  </div>
                </div>

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

            {shouldRenderHomeSections ? (
              <Suspense fallback={null}>
                <HomeSections />
              </Suspense>
            ) : null}
          </main>
    </ThemeProvider>
  );
};

export default Index;
