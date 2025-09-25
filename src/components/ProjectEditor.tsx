import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, Eye, Upload, Link2, Image } from "lucide-react";
import { Project, generateProjectSlug, validateProjectData } from "@/data/projects";

interface ProjectEditorProps {
  project?: Project;
  onSave: (project: Partial<Project>) => void;
  onCancel: () => void;
}

const ProjectEditor = ({ project, onSave, onCancel }: ProjectEditorProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    longDescription: project?.longDescription || "",
    image: project?.image || "",
    tags: project?.tags?.join(", ") || "",
    technologies: project?.technologies?.join(", ") || "",
    challenges: project?.challenges?.join(", ") || "",
    learnings: project?.learnings?.join(", ") || "",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    category: project?.category || "web",
    status: project?.status || "completed",
    startDate: project?.startDate || new Date().toISOString().split('T')[0],
    endDate: project?.endDate || "",
    featured: project?.featured || false,
    metaTitle: project?.seo?.metaTitle || "",
    metaDescription: project?.seo?.metaDescription || "",
    keywords: project?.seo?.keywords?.join(", ") || "",
  });

  const [imageUploadMode, setImageUploadMode] = useState<"url" | "unsplash" | "upload">("url");
  const [unsplashQuery, setUnsplashQuery] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !project) {
      const generatedSlug = generateProjectSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, project]);

  // Auto-generate meta title and description
  useEffect(() => {
    if (formData.title && !formData.metaTitle) {
      setFormData(prev => ({
        ...prev,
        metaTitle: `${formData.title} - Tanish Parsana Project`
      }));
    }
    if (formData.description && !formData.metaDescription) {
      setFormData(prev => ({
        ...prev,
        metaDescription: formData.description.slice(0, 160)
      }));
    }
  }, [formData.title, formData.description, formData.metaTitle, formData.metaDescription]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo purposes, we'll use a placeholder. In production, you'd upload to a cloud service
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, image: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateUnsplashUrl = () => {
    if (unsplashQuery.trim()) {
      const baseUrl = "https://images.unsplash.com/photo-";
      const query = unsplashQuery.trim().replace(/\s+/g, '-');
      const unsplashId = `unsplash-${Date.now()}`;
      const url = `https://images.unsplash.com/photo-${unsplashId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&q=${query}`;
      
      // For demo, use a search-based URL
      const searchUrl = `https://source.unsplash.com/1000x600/?${query}`;
      setFormData(prev => ({ ...prev, image: searchUrl }));
      setUnsplashQuery("");
    }
  };

  const handleSave = () => {
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const technologiesArray = formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean);
    const challengesArray = formData.challenges.split(',').map(challenge => challenge.trim()).filter(Boolean);
    const learningsArray = formData.learnings.split(',').map(learning => learning.trim()).filter(Boolean);
    const keywordsArray = formData.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean);

    const projectData: Partial<Project> = {
      id: project?.id || generateId(),
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      longDescription: formData.longDescription,
      image: formData.image,
      tags: tagsArray,
      technologies: technologiesArray,
      challenges: challengesArray.length > 0 ? challengesArray : undefined,
      learnings: learningsArray.length > 0 ? learningsArray : undefined,
      githubUrl: formData.githubUrl || undefined,
      liveUrl: formData.liveUrl || undefined,
      category: formData.category as Project["category"],
      status: formData.status as Project["status"],
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      featured: formData.featured,
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: keywordsArray
      }
    };

    const validationErrors = validateProjectData(projectData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(projectData);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {project ? 'Edit Project' : 'Create New Project'}
        </h1>
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Project
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="p-4">
            <div className="text-red-400">
              <p className="font-semibold mb-2">Please fix the following errors:</p>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Apps</SelectItem>
                      <SelectItem value="ai">AI & ML</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description for project cards"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="longDescription">Detailed Description (Optional)</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange('longDescription', e.target.value)}
                  placeholder="Detailed project description for project pages"
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Project Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant={imageUploadMode === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageUploadMode("url")}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageUploadMode === "unsplash" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageUploadMode("unsplash")}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Unsplash
                </Button>
                <Button
                  type="button"
                  variant={imageUploadMode === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageUploadMode("upload")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>

              {imageUploadMode === "url" && (
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}

              {imageUploadMode === "unsplash" && (
                <div className="space-y-2">
                  <Label>Search Unsplash</Label>
                  <div className="flex gap-2">
                    <Input
                      value={unsplashQuery}
                      onChange={(e) => setUnsplashQuery(e.target.value)}
                      placeholder="Search for images (e.g., technology, coding, ai)"
                    />
                    <Button onClick={generateUnsplashUrl}>
                      <Image className="h-4 w-4 mr-2" />
                      Get Image
                    </Button>
                  </div>
                </div>
              )}

              {imageUploadMode === "upload" && (
                <div>
                  <Label htmlFor="imageFile">Upload Image</Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: In production, files would be uploaded to cloud storage
                  </p>
                </div>
              )}

              {formData.image && (
                <div>
                  <Label>Preview</Label>
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={formData.image}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="React, TypeScript, Node.js, MongoDB"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="Detailed tech stack"
                />
              </div>

              <div>
                <Label htmlFor="challenges">Challenges (comma separated, optional)</Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges}
                  onChange={(e) => handleInputChange('challenges', e.target.value)}
                  placeholder="Technical challenges faced during development"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="learnings">Key Learnings (comma separated, optional)</Label>
                <Textarea
                  id="learnings"
                  value={formData.learnings}
                  onChange={(e) => handleInputChange('learnings', e.target.value)}
                  placeholder="What you learned from this project"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Links, Dates, SEO */}
        <div className="space-y-6">
          {/* Project Links */}
          <Card>
            <CardHeader>
              <CardTitle>Project Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <Label htmlFor="liveUrl">Live Demo URL (optional)</Label>
                <Input
                  id="liveUrl"
                  value={formData.liveUrl}
                  onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                  placeholder="https://yourproject.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date (optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="SEO description (160 characters max)"
                  rows={3}
                />
                <div className="text-sm text-muted-foreground mt-1">
                  {formData.metaDescription.length}/160 characters
                </div>
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="SEO keywords"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.image && (
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold">{formData.title || 'Project Title'}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge className={
                      formData.status === "completed" ? "bg-green-500/20 text-green-400" :
                      formData.status === "in-progress" ? "bg-blue-500/20 text-blue-400" :
                      "bg-orange-500/20 text-orange-400"
                    }>
                      {formData.status.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline">{formData.category}</Badge>
                    {formData.featured && <Badge variant="default">Featured</Badge>}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {formData.description || 'Project description will appear here...'}
                </p>

                <div className="flex flex-wrap gap-1">
                  {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).slice(0, 5).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
