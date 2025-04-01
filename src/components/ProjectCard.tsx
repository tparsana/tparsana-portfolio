
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group rounded-lg overflow-hidden bg-card border shadow-sm transition-all duration-300",
        "hover:shadow-md transform perspective-[800px]",
        isHovered ? "scale-[1.01]" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 transform",
            isHovered ? "scale-105" : "scale-100"
          )}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          {githubUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" variant="default" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
