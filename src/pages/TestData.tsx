import { useState, useEffect } from 'react';
import { getAllBlogPosts, getAllProjects } from '@/data/blogs-unified';
import { getAllProjects as getAllProjectsUnified } from '@/data/projects-unified';
import { createClient } from '@supabase/supabase-js';

const TestData = () => {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [envInfo, setEnvInfo] = useState({});

  useEffect(() => {
    const loadData = async () => {
      console.log('🔍 Testing data loading in browser...');
      
      // Check environment variables
      const envData = {
        VITE_DATA_SOURCE: import.meta.env.VITE_DATA_SOURCE,
        VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
        VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
        NODE_ENV: import.meta.env.NODE_ENV,
        MODE: import.meta.env.MODE
      };
      setEnvInfo(envData);
      console.log('Environment:', envData);

      try {
        // Test direct Supabase connection
        console.log('Testing direct Supabase connection...');
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );
        
        const { data: directBlogs, error: directBlogError } = await supabase
          .from('blog_posts')
          .select('*')
          .limit(5);
        
        console.log('Direct Supabase blogs:', directBlogs);
        console.log('Direct Supabase blog error:', directBlogError);

        // Load blogs using unified layer
        console.log('Loading blogs via unified layer...');
        const blogData = await getAllBlogPosts();
        console.log('Blogs loaded:', blogData);
        console.log('Blog data type:', typeof blogData);
        console.log('Blog data length:', blogData?.length);
        setBlogs(blogData);

        // Load projects
        console.log('Loading projects...');
        const projectData = await getAllProjectsUnified();
        console.log('Projects loaded:', projectData);
        console.log('Project data type:', typeof projectData);
        console.log('Project data length:', projectData?.length);
        setProjects(projectData);

        // Test saving a blog post
        console.log('\n🧪 Testing blog post save...');
        try {
          const testBlog = {
            title: 'Test Blog Post',
            slug: 'test-blog-' + Date.now(),
            content: 'This is a test blog post content.',
            excerpt: 'This is a test excerpt.',
            seo_title: 'Test Blog Post - Tanish Parsana',
            seo_description: 'This is a test blog post for debugging.',
            seo_keywords: ['test', 'debug']
          };
          
          const { data: saveResult, error: saveError } = await supabase
            .from('blog_posts')
            .insert(testBlog)
            .select();
          
          console.log('Save result:', saveResult);
          console.log('Save error:', saveError);
          
          if (saveResult && saveResult.length > 0) {
            console.log('✅ Test blog post saved successfully!');
            // Clean up test data
            await supabase
              .from('blog_posts')
              .delete()
              .eq('id', saveResult[0].id);
            console.log('🧹 Test data cleaned up');
          }
        } catch (saveTestError) {
          console.error('❌ Save test failed:', saveTestError);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        console.error('Error details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading test data...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Data Loading Test</h1>
      
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <pre className="text-sm">{JSON.stringify(envInfo, null, 2)}</pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Blog Posts ({blogs.length})</h2>
        {blogs.length > 0 ? (
          <ul className="space-y-2">
            {blogs.map((blog, index) => (
              <li key={index} className="p-2 bg-blue-50 rounded">
                <strong>{blog.title}</strong> - {blog.slug}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No blog posts found</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects ({projects.length})</h2>
        {projects.length > 0 ? (
          <ul className="space-y-2">
            {projects.map((project, index) => (
              <li key={index} className="p-2 bg-green-50 rounded">
                <strong>{project.title}</strong> - {project.slug}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects found</p>
        )}
      </div>
    </div>
  );
};

export default TestData;
