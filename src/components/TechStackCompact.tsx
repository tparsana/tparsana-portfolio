
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TechStackCompact = () => {
  const techStacks = {
    "Frontend": [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "JavaFX",
      "HTML/CSS"
    ],
    "Backend": [
      "Node.js",
      "Python",
      "Express",
      "Django",
      "Flask",
      "Java",
      "C++",
      "C"
    ],
    "Database": [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Vector Databases",
      "Pinecone"
    ],
    "AI/ML": [
      "TensorFlow",
      "PyTorch",
      "NLP",
      "Computer Vision",
      "LangChain",
      "OpenAI API",
      "LLMs",
      "Machine Learning",
      "Data Science"
    ],
    "Cloud/DevOps": [
      "AWS",
      "AWS Lambda",
      "AWS S3",
      "AWS Glue",
      "Docker",
      "CI/CD",
      "Kubernetes",
      "Linux",
      "Bash"
    ],
    "Tools": [
      "Git",
      "VS Code",
      "Postman",
      "Figma",
      "PySpark",
      "Pandas",
      "Bezi (3D)",
      "Unity",
      "Adobe Suite",
      "Microsoft Office"
    ]
  };
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Frontend": return "bg-indigo-500/80";
      case "Backend": return "bg-blue-500/80";
      case "Database": return "bg-cyan-500/80";
      case "AI/ML": return "bg-green-500/80";
      case "Cloud/DevOps": return "bg-amber-500/80";
      case "Tools": return "bg-rose-500/80";
      default: return "bg-gray-500/80";
    }
  };

  const getCategoryHoverColor = (category: string): string => {
    switch (category) {
      case "Frontend": return "group-hover:bg-indigo-600";
      case "Backend": return "group-hover:bg-blue-600";
      case "Database": return "group-hover:bg-cyan-600";
      case "AI/ML": return "group-hover:bg-green-600";
      case "Cloud/DevOps": return "group-hover:bg-amber-600";
      case "Tools": return "group-hover:bg-rose-600";
      default: return "group-hover:bg-gray-600";
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(techStacks).map(([category, skills]) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">{category}</h3>
            <div className={cn("w-2 h-2 rounded-full", getCategoryColor(category))}></div>
          </div>
          
          <Card className="p-3 transition-all duration-300 hover:shadow-md">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className={cn(
                    "px-3 py-1 text-sm font-medium group transition-all duration-300",
                    "hover:scale-105 hover:shadow-sm cursor-pointer"
                  )}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{skill}</span>
                  <span className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md", 
                    getCategoryHoverColor(category)
                  )}></span>
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TechStackCompact;
