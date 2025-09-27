
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Thoughts from "./pages/Thoughts";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import Admin from "./pages/Admin";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import TestData from "./pages/TestData";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/thoughts/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route path="/test-data" element={<TestData />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
