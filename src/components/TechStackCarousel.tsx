
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SplitFlapText from "./SplitFlapText";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  proficiency: number;
  category: string;
  icon?: React.ReactNode;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Frontend":
      return "bg-indigo-500";
    case "Backend":
      return "bg-blue-500";
    case "Languages":
      return "bg-violet-500";
    case "Database":
      return "bg-cyan-500";
    case "Cloud":
      return "bg-emerald-500";
    case "DevOps":
      return "bg-amber-500";
    case "AI/ML":
      return "bg-green-500";
    case "Analytics":
      return "bg-rose-500";
    default:
      return "bg-gray-500";
  }
};

const TechStackCarousel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Skills data
  const skills: Skill[] = [
    { name: "React", proficiency: 95, category: "Frontend" },
    { name: "TypeScript", proficiency: 90, category: "Languages" },
    { name: "JavaScript", proficiency: 95, category: "Languages" },
    { name: "Node.js", proficiency: 85, category: "Backend" },
    { name: "Python", proficiency: 88, category: "Languages" },
    { name: "GraphQL", proficiency: 80, category: "API" },
    { name: "MongoDB", proficiency: 82, category: "Database" },
    { name: "PostgreSQL", proficiency: 78, category: "Database" },
    { name: "AWS", proficiency: 75, category: "Cloud" },
    { name: "Docker", proficiency: 72, category: "DevOps" },
    { name: "Tailwind CSS", proficiency: 92, category: "Frontend" },
    { name: "Data Science", proficiency: 85, category: "Analytics" },
    { name: "Machine Learning", proficiency: 80, category: "AI/ML" },
    { name: "TensorFlow", proficiency: 85, category: "AI/ML" },
    { name: "PyTorch", proficiency: 78, category: "AI/ML" },
    { name: "SQL", proficiency: 85, category: "Database" },
  ];

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(skills.map(skill => skill.category)))];

  // Filter skills based on active category
  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Group skills by category for the carousel display
  const groupedSkills = activeCategory === "All"
    ? categories.filter(cat => cat !== "All").map(category => ({
        category,
        skills: skills.filter(skill => skill.category === category),
      }))
    : [{ category: activeCategory, skills: filteredSkills }];

  return (
    <div className="w-full space-y-6">
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills carousels by category */}
      <div className="space-y-8">
        {groupedSkills.map(group => (
          <div key={group.category} className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{group.category}</h3>
              <div className={cn("w-2 h-2 rounded-full", getCategoryColor(group.category))}></div>
            </div>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {group.skills.map((skill, index) => (
                  <CarouselItem key={skill.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card className="overflow-hidden h-full">
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-md">
                            <SplitFlapText
                              text={skill.name}
                              delay={index * 50}
                            />
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", getCategoryColor(skill.category), "bg-opacity-10 text-foreground")}
                          >
                            {skill.proficiency}%
                          </Badge>
                        </div>
                        
                        <Progress 
                          value={skill.proficiency} 
                          className="h-2"
                          indicatorClassName={getCategoryColor(skill.category)}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackCarousel;
