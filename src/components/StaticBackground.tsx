import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const StaticBackground = () => {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncResolvedTheme = () => {
      setResolvedTheme(
        theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme
      );
    };

    syncResolvedTheme();
    mediaQuery.addEventListener("change", syncResolvedTheme);

    return () => mediaQuery.removeEventListener("change", syncResolvedTheme);
  }, [theme]);

  const blobPalette =
    resolvedTheme === "light"
      ? ["#2bc48a", "#0d1b2a", "#0d1b2a"]
      : ["#1d6c5c", "#5b7961", "#e1d5b5"];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute top-[-50px] left-[-100px] h-[600px] w-[600px] opacity-30 blur-[80px] md:left-1/2 md:top-1/2 md:h-[820px] md:w-[820px] md:-translate-x-1/2 md:-translate-y-1/2 md:blur-[120px] lg:h-[980px] lg:w-[980px] lg:blur-[150px]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={blobPalette[0]}
            d="M45.7,-58.2C58.9,-47.6,69.3,-32.6,74.8,-15.2C80.3,2.2,80.9,22,73,37.8C65.1,53.6,48.8,65.2,30.7,71.3C12.7,77.3,-7.1,77.8,-24.9,71.7C-42.7,65.6,-58.5,52.9,-67.4,36.1C-76.3,19.3,-78.2,-1.6,-72.6,-19.6C-67.1,-37.6,-54,-52.6,-39.1,-62.9C-24.2,-73.2,-7.5,-78.7,8.1,-88.3C23.7,-97.9,47.4,-111.7,62.3,-105.1C77.2,-98.6,83.3,-71.6,45.7,-58.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="absolute bottom-[-100px] right-[-150px] h-[700px] w-[700px] opacity-20 blur-[100px] md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:h-[960px] md:w-[960px] md:-translate-x-1/2 md:-translate-y-1/2 md:blur-[140px] lg:h-[1120px] lg:w-[1120px] lg:blur-[170px]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={blobPalette[1]}
            d="M38.5,-51.6C49.6,-39.1,57.9,-26.2,62.4,-11.1C66.9,4,67.7,21.4,60.2,34.6C52.6,47.8,36.8,56.9,19.7,64.8C2.7,72.7,-15.6,79.3,-31.9,75.2C-48.2,71.2,-62.5,56.3,-70.8,38.7C-79.1,21.1,-81.3,0.7,-76,-16.8C-70.7,-34.3,-57.8,-49,-43,-59.4C-28.3,-69.9,-11.7,-76.1,1.9,-78.3C15.4,-80.4,30.8,-78.4,38.5,-51.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="absolute top-[30%] right-[-50px] h-[500px] w-[500px] opacity-25 blur-[70px] md:left-1/2 md:right-auto md:top-1/2 md:h-[680px] md:w-[680px] md:-translate-x-1/2 md:-translate-y-1/2 md:blur-[110px] lg:h-[820px] lg:w-[820px] lg:blur-[135px]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={blobPalette[2]}
            d="M42.7,-69.9C55.9,-61.7,67.8,-50.8,75.1,-37.1C82.5,-23.4,85.4,-6.9,83.1,9C80.9,24.9,73.4,40.2,62.3,52.2C51.1,64.2,36.1,72.9,19.7,78.2C3.2,83.6,-14.8,85.5,-31,80.7C-47.2,75.9,-61.6,64.3,-70.8,49.5C-80,34.7,-83.9,16.8,-83.6,-0.5C-83.2,-17.8,-78.5,-34.9,-68.6,-47.9C-58.7,-60.8,-43.6,-69.5,-28.8,-76.6C-14,-83.7,0.6,-89.2,14.3,-85.4C28,-81.5,40.8,-68.3,42.7,-69.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default StaticBackground;
