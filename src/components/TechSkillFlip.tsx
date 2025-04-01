
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SplitFlapText from "./SplitFlapText";

interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: string;
}

const skills: Skill[] = [
  { name: "React", proficiency: 95, category: "Frontend" },
  { name: "TypeScript", proficiency: 90, category: "Languages" },
  { name: "Node.js", proficiency: 85, category: "Backend" },
  { name: "Python", proficiency: 88, category: "Languages" },
  { name: "GraphQL", proficiency: 80, category: "API" },
  { name: "MongoDB", proficiency: 82, category: "Database" },
  { name: "PostgreSQL", proficiency: 78, category: "Database" },
  { name: "AWS", proficiency: 75, category: "Cloud" },
  { name: "Docker", proficiency: 72, category: "DevOps" },
  { name: "Tailwind CSS", proficiency: 92, category: "Frontend" },
  { name: "Data Science", proficiency: 85, category: "Analytics" },
  { name: "Machine Learning", proficiency: 80, category: "AI" },
];

const categories = Array.from(new Set(skills.map(skill => skill.category)));

const TechSkillFlip: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>(skills);
  const [currentDisplay, setCurrentDisplay] = useState<Skill[]>([]);

  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleSkills(skills);
    } else {
      setVisibleSkills(skills.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    // Create staggered effect for skills display
    const showSkills = async () => {
      setCurrentDisplay([]);
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      for (let i = 0; i < visibleSkills.length; i++) {
        await delay(150);
        setCurrentDisplay(prev => [...prev, visibleSkills[i]]);
      }
    };
    
    showSkills();
  }, [visibleSkills]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          className={cn(
            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
            activeCategory === "All"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
          onClick={() => setActiveCategory("All")}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDisplay.map((skill, index) => (
          <div 
            key={skill.name} 
            className="bg-card p-4 rounded-lg border shadow-sm transform transition-all duration-300 hover:shadow-md"
          >
            <h3 className="font-mono text-lg mb-2">
              <SplitFlapText 
                text={skill.name} 
                delay={index * 100}
              />
            </h3>
            
            <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `0%`,
                  animation: `growWidth 1.5s ease-out forwards ${index * 0.1}s`
                }}
              />
            </div>
            
            <div className="text-right mt-1 font-mono text-sm split-flap-display py-1 px-2 inline-block ml-auto">
              <SplitFlapText 
                text={`${skill.proficiency}%`}
                delay={index * 100 + 500}
              />
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              {skill.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSkillFlip;
