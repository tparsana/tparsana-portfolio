
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell
} from "recharts";
import { 
  Code, 
  Database, 
  Globe, 
  Cpu, 
  BrainCircuit, 
  Layout, 
  Bot,
  Cloud,
  LineChart
} from "lucide-react";

interface TechStackItem {
  name: string;
  proficiency: number;
  category: string;
  icon: React.ReactNode;
}

const TechStackChart = () => {
  const techStack: TechStackItem[] = [
    { name: "React", proficiency: 95, category: "Frontend", icon: <Layout size={16} /> },
    { name: "TypeScript", proficiency: 90, category: "Frontend", icon: <Code size={16} /> },
    { name: "JavaScript", proficiency: 95, category: "Frontend", icon: <Code size={16} /> },
    { name: "HTML/CSS", proficiency: 90, category: "Frontend", icon: <Globe size={16} /> },
    { name: "Node.js", proficiency: 85, category: "Backend", icon: <Cpu size={16} /> },
    { name: "Python", proficiency: 90, category: "Backend", icon: <Code size={16} /> },
    { name: "SQL", proficiency: 80, category: "Database", icon: <Database size={16} /> },
    { name: "MongoDB", proficiency: 75, category: "Database", icon: <Database size={16} /> },
    { name: "TensorFlow", proficiency: 85, category: "AI/ML", icon: <BrainCircuit size={16} /> },
    { name: "PyTorch", proficiency: 80, category: "AI/ML", icon: <BrainCircuit size={16} /> },
    { name: "NLP", proficiency: 85, category: "AI/ML", icon: <Bot size={16} /> },
    { name: "Docker", proficiency: 70, category: "DevOps", icon: <Cloud size={16} /> },
    { name: "Data Analysis", proficiency: 90, category: "Data Science", icon: <LineChart size={16} /> },
  ];

  // Sort by proficiency (descending)
  const sortedTechStack = [...techStack].sort((a, b) => b.proficiency - a.proficiency);

  // Colors for different categories
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "hsl(240, 5.9%, 10%)"; // primary
      case "Backend":
        return "hsl(262, 83%, 58%)";
      case "Database":
        return "hsl(221, 83%, 53%)";
      case "AI/ML":
        return "hsl(142, 71%, 45%)";
      case "DevOps":
        return "hsl(28, 100%, 64%)";
      case "Data Science":
        return "hsl(334, 86%, 67%)";
      default:
        return "hsl(217, 91%, 60%)";
    }
  };

  // Configuration for chart
  const chartConfig = {
    Frontend: { color: getCategoryColor("Frontend") },
    Backend: { color: getCategoryColor("Backend") },
    Database: { color: getCategoryColor("Database") },
    "AI/ML": { color: getCategoryColor("AI/ML") },
    DevOps: { color: getCategoryColor("DevOps") },
    "Data Science": { color: getCategoryColor("Data Science") },
  };

  return (
    <div className="w-full h-[500px] p-4 relative">
      <div className="absolute top-0 left-0 z-10 p-4 space-y-1">
        <h3 className="text-lg font-semibold">Tech Stack Proficiency</h3>
        <div className="flex flex-wrap gap-3">
          {Object.keys(chartConfig).map((category) => (
            <div key={category} className="flex items-center gap-1.5 text-xs">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: chartConfig[category as keyof typeof chartConfig].color }} 
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
      <ChartContainer
        className="mt-10"
        config={chartConfig}
      >
        <BarChart
          data={sortedTechStack}
          layout="vertical"
          margin={{ top: 50, right: 50, bottom: 20, left: 70 }}
          barCategoryGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickCount={6}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={70}
            tick={{ fontSize: 12 }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value, name, props) => {
                  const item = props.payload;
                  return (
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-mono">{value}%</span>
                    </div>
                  );
                }}
              />
            }
          />
          <Bar
            dataKey="proficiency"
            radius={[0, 4, 4, 0]}
            fill="url(#primaryGradient)"
          >
            <LabelList 
              dataKey="category" 
              position="insideRight" 
              fill="#fff" 
              fontSize={10}
              formatter={(value: string) => {
                const icon = techStack.find(tech => tech.category === value)?.icon;
                return React.cloneElement(icon as React.ReactElement, { className: "ml-2" });
              }}
            />
            {/* Category-based coloring */}
            {sortedTechStack.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default TechStackChart;
