import { useEffect, useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ResumeViewer from "./ResumeViewer";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(true);

  const isOnHomePage = location.pathname === "/";

  const navLinks = useMemo(
    () => [
      { name: "About", href: "#about" },
      { name: "Experience", href: "#experience" },
      { name: "Products", href: "#projects" },
      { name: "Thoughts", href: "/thoughts" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  const handleSectionNavigation = (sectionId: string) => {
    if (isOnHomePage) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${sectionId}`);
    }

    setMobileMenuOpen(false);
  };

  const handleBrandNavigation = () => {
    if (isOnHomePage) {
      const homeSection = document.querySelector("#home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
      return;
    }

    navigate("/");
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOnHomePage) {
      setIsHeroActive(false);
      return;
    }

    const homeSection = document.getElementById("home");
    if (!homeSection) {
      setIsHeroActive(window.scrollY < window.innerHeight * 0.55);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroActive(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75],
        rootMargin: "-72px 0px 0px 0px",
      }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, [isOnHomePage]);

  const brandLabel = isOnHomePage && isHeroActive ? "Portfolio" : "Tanish Parsana";
  const linkClassName =
    "nav-link-button rounded-full px-3.5 py-1.5 text-sm font-medium text-white/78 transition-all duration-300 hover:bg-white/6 hover:text-white";
  const mobileLinkClassName =
    "nav-link-button flex w-full items-center justify-center rounded-full px-4 py-3 text-base font-medium text-center text-white/84 transition-all duration-300 hover:bg-white/6 hover:text-white";
  const iconButtonClassName =
    "h-9 w-9 rounded-full border border-white/12 bg-white/[0.025] text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.05] hover:text-white";

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-5 pointer-events-none">
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "nav-island pointer-events-auto hidden items-center gap-3 rounded-[32px] px-4 py-2 md:grid md:grid-cols-[minmax(0,220px)_1fr_auto]",
            isScrolled ? "translate-y-0 shadow-[0_30px_80px_rgba(0,0,0,0.48)]" : "shadow-[0_20px_60px_rgba(0,0,0,0.34)]"
          )}
        >
          <button
            type="button"
            onClick={handleBrandNavigation}
            className="group relative flex h-9 items-center rounded-full px-3.5 text-left transition-colors duration-300 hover:bg-white/6"
          >
            <span className="nav-brand-text min-w-[13ch] text-[1.02rem]">
              {brandLabel}
            </span>
          </button>

          <nav className="flex items-center justify-center gap-1.5">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.name} to={link.href} className={linkClassName}>
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleSectionNavigation(link.href)}
                  className={linkClassName}
                >
                  {link.name}
                </button>
              )
            )}
          </nav>

          <div className="flex items-center justify-end gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={iconButtonClassName}
            >
              {theme === "dark" ? (
                <Sun className="h-[1.05rem] w-[1.05rem]" />
              ) : (
                <Moon className="h-[1.05rem] w-[1.05rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <ResumeViewer triggerVariant="pill" />
          </div>
        </div>

        <div className="nav-island pointer-events-auto flex items-center justify-between gap-3 rounded-[28px] px-3.5 py-2 md:hidden">
          <button
            type="button"
            onClick={handleBrandNavigation}
            className="flex min-w-0 items-center rounded-full px-2 py-1 text-left"
          >
            <span className="nav-brand-text truncate text-base">
              {brandLabel}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={iconButtonClassName}
            >
              {theme === "dark" ? (
                <Sun className="h-[1.05rem] w-[1.05rem]" />
              ) : (
                <Moon className="h-[1.05rem] w-[1.05rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={iconButtonClassName}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
                <X className="h-[1.1rem] w-[1.1rem]" />
              ) : (
                <Menu className="h-[1.1rem] w-[1.1rem]" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="nav-mobile-panel pointer-events-auto mt-3 rounded-[28px] px-4 py-4 md:hidden">
            <nav className="flex flex-col items-stretch gap-2">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={mobileLinkClassName}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleSectionNavigation(link.href)}
                    className={mobileLinkClassName}
                  >
                    {link.name}
                  </button>
                )
              )}

              <div className="pt-2">
                <ResumeViewer
                  triggerVariant="pill"
                  triggerClassName="w-full justify-center"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
