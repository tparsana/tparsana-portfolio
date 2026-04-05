
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();
const Thoughts = lazy(() => import("./pages/Thoughts"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Projects = lazy(() => import("./pages/Projects"));
const Admin = lazy(() => import("./pages/Admin"));
const ProjectsAdmin = lazy(() => import("./pages/ProjectsAdmin"));
const TestData = lazy(() => import("./pages/TestData"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
