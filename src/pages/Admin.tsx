import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import BlogEditor from "@/components/BlogEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts, saveBlogPost, deleteBlogPost, BlogPost } from "@/data/blogs";
import { Plus, Edit, Trash2, Eye, RefreshCw } from "lucide-react";

const Admin = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const loadPosts = () => {
      const allPosts = getAllBlogPosts();
      setPosts(allPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const refreshPosts = () => {
    const allPosts = getAllBlogPosts();
    setPosts(allPosts);
  };

  const handleCreateNew = () => {
    setEditingPost(undefined);
    setCurrentView('create');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleSavePost = (postData: Partial<BlogPost>) => {
    try {
      const fullPost = {
        ...postData,
        id: postData.id || editingPost?.id || Math.random().toString(36).substr(2, 9),
        totalReads: editingPost?.totalReads || 0,
        author: {
          name: "Tanish Parsana",
          avatar: "/IMG_1241.jpeg"
        }
      } as BlogPost;
      
      // Save to localStorage
      saveBlogPost(fullPost);
      
      // Refresh local state
      refreshPosts();
      
      // Navigate back to list
      setCurrentView('list');
      setEditingPost(undefined);
      
      // Show success message
      console.log('Blog post saved successfully!');
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post. Please try again.');
    }
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        // Delete from localStorage
        deleteBlogPost(postId);
        
        // Refresh local state
        refreshPosts();
        
        console.log('Blog post deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Error deleting blog post. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingPost(undefined);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <ThemeProvider defaultTheme="dark">
        <Navigation />
        <main className="min-h-screen pt-24">
          <AnimatedBackground />
          <div className="relative z-10">
            <BlogEditor
              post={editingPost}
              onSave={handleSavePost}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </ThemeProvider>
    );
  }

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="dark">
        <Navigation />
        <main className="min-h-screen pt-24">
          <AnimatedBackground />
          <section className="relative z-10 px-4 py-8">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading blog posts...</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <Navigation />
      <main className="min-h-screen pt-24">
        <AnimatedBackground />
        
        <section className="relative z-10 px-4 py-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Blog Admin</h1>
                <p className="text-muted-foreground">Manage your blog posts and thoughts</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={refreshPosts}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{posts.length}</div>
                  <div className="text-sm text-muted-foreground">Total Posts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {posts.reduce((sum, post) => sum + post.totalReads, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Reads</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {posts.filter(post => post.featured).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Featured Posts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {Math.round(posts.reduce((sum, post) => sum + post.readTime, 0) / posts.length || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Read Time</div>
                </CardContent>
              </Card>
            </div>

            {/* Posts List */}
            <Card>
              <CardHeader>
                <CardTitle>All Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 border border-muted rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          {post.featured && (
                            <span className="px-2 py-1 text-xs bg-orange-400/20 text-orange-400 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>{post.readTime} min read</span>
                          <span>{post.totalReads} reads</span>
                          <div className="flex gap-1">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-muted rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/thoughts/${post.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No posts yet</p>
                    <Button onClick={handleCreateNew}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create your first post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
};

export default Admin;
