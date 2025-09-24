
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SplitFlapText from "./SplitFlapText";
import ResumeViewer from "./ResumeViewer";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  
  // Check if we're on the home page
  const isOnHomePage = location.pathname === '/';

  // Function to handle navigation to home page sections
  const handleSectionNavigation = (sectionId: string) => {
    if (isOnHomePage) {
      // If already on home page, just scroll to section
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page, then scroll to section
      navigate('/');
      // Use setTimeout to ensure page has loaded before scrolling
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      // Only update isHomePage state when actually on the home page
      if (isOnHomePage) {
        setIsHomePage(window.scrollY < window.innerHeight * 0.5);
      } else {
        setIsHomePage(false);
      }
    };

    // Set initial state based on current page
    if (!isOnHomePage) {
      setIsHomePage(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOnHomePage]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Thoughts", href: "/thoughts" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-mono font-bold text-lg split-flap-display px-2">
            {isOnHomePage ? (
              <span>{isHomePage ? "Portfolio" : "Tanish Parsana"}</span>
            ) : (
              <Link to="/" className="hover:text-primary transition-colors">
                Tanish Parsana
              </Link>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => {
              const linkClass = "px-3 py-2 text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center";
              
              // Handle React Router links (start with /)
              if (link.href.startsWith('/')) {
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={linkClass}
                  >
                    {link.name}
                  </Link>
                );
              }
              
              // Handle home page section links (start with #)
              if (link.href.startsWith('#')) {
                return (
                  <button
                    key={link.name}
                    onClick={() => handleSectionNavigation(link.href)}
                    className={linkClass}
                  >
                    {link.name}
                  </button>
                );
              }
              
              // Fallback for other types of links
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={linkClass}
                >
                  {link.name}
                </a>
              );
            })}
            <ResumeViewer />
          </nav>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const linkClass = "px-3 py-2 text-sm font-medium hover:text-primary flex items-center";
                
                // Handle React Router links (start with /)
                if (link.href.startsWith('/')) {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={linkClass}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                }
                
                // Handle home page section links (start with #)
                if (link.href.startsWith('#')) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleSectionNavigation(link.href)}
                      className={linkClass}
                    >
                      {link.name}
                    </button>
                  );
                }
                
                // Fallback for other types of links
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={linkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}
              <ResumeViewer triggerClassName="justify-start" />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
