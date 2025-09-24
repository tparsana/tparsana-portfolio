import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Save, Eye } from "lucide-react";
import { BlogPost, calculateReadTime } from "@/data/blogs";

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => void;
  onCancel: () => void;
}

const BlogEditor = ({ post, onSave, onCancel }: BlogEditorProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    tags: post?.tags?.join(", ") || "",
    publishedAt: post?.publishedAt || new Date().toISOString().split('T')[0],
    featured: post?.featured || false,
    metaTitle: post?.seo?.metaTitle || "",
    metaDescription: post?.seo?.metaDescription || "",
    keywords: post?.seo?.keywords?.join(", ") || "",
  });

  const [isPreview, setIsPreview] = useState(false);
  const [readTime, setReadTime] = useState(0);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !post) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, post]);

  // Calculate read time
  useEffect(() => {
    if (formData.content) {
      setReadTime(calculateReadTime(formData.content));
    }
  }, [formData.content]);

  // Auto-generate meta title and description
  useEffect(() => {
    if (formData.title && !formData.metaTitle) {
      setFormData(prev => ({
        ...prev,
        metaTitle: `${formData.title} - Tanish Parsana`
      }));
    }
    if (formData.excerpt && !formData.metaDescription) {
      setFormData(prev => ({
        ...prev,
        metaDescription: formData.excerpt.slice(0, 160)
      }));
    }
  }, [formData.title, formData.excerpt, formData.metaTitle, formData.metaDescription]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const keywordsArray = formData.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean);

    const blogPost: Partial<BlogPost> = {
      id: post?.id || generateId(),
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      publishedAt: formData.publishedAt,
      readTime,
      tags: tagsArray,
      totalReads: post?.totalReads || 0,
      featured: formData.featured,
      author: {
        name: "Tanish Parsana",
        avatar: "/IMG_1241.jpeg"
      },
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: keywordsArray
      }
    };

    onSave(blogPost);
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const formatContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold mb-4 mt-6 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold mb-3 mt-5">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold mb-2 mt-4">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={index} className="mb-2 ml-4">
            {line.replace(/^[•\-] /, '')}
          </li>
        );
      }
      if (line.trim()) {
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the blog post"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="blog, thoughts, technology"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="publishedAt">Publish Date</Label>
                <Input
                  id="publishedAt"
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="text-sm text-muted-foreground">
                Estimated read time: {readTime} minute{readTime !== 1 ? 's' : ''}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog post content here... Use # for headers, • for bullet points"
                rows={20}
                className="font-mono"
              />
            </CardContent>
          </Card>

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
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <h1 className="text-2xl font-bold mb-4">{formData.title || 'Blog Post Title'}</h1>
                
                <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                  <span>{new Date(formData.publishedAt).toLocaleDateString()}</span>
                  <span>{readTime} min read</span>
                </div>

                <div className="flex gap-2 mb-6">
                  {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <div className="mb-6 p-4 bg-muted rounded">
                  <strong>Excerpt:</strong> {formData.excerpt || 'No excerpt provided'}
                </div>

                <div className="space-y-4">
                  {formData.content ? formatContent(formData.content) : (
                    <p className="text-muted-foreground">Start writing to see preview...</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
