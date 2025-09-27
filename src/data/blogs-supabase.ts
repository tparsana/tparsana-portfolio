import { supabase } from '@/lib/supabase';
import { BlogPost } from './blogs';

// Convert Supabase row to BlogPost
const mapSupabaseToBlogPost = (row: any): BlogPost => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  content: row.content,
  excerpt: row.excerpt,
  publishedAt: row.created_at, // Use created_at as publishedAt
  featured: row.featured,
  published: row.published,
  readTime: row.read_time,
  totalReads: row.total_reads,
  tags: row.tags || [],
  author: {
    name: "Tanish Parsana",
    avatar: "/IMG_1241.jpeg"
  },
  seo: {
    metaTitle: row.seo_title,
    metaDescription: row.seo_description,
    keywords: row.seo_keywords || []
  },
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

// Convert BlogPost to Supabase insert/update format
const mapBlogPostToSupabase = (post: BlogPost) => ({
  title: post.title,
  slug: post.slug,
  content: post.content,
  excerpt: post.excerpt,
  featured: post.featured || false,
  published: true, // Always publish new posts
  read_time: post.readTime,
  total_reads: post.totalReads || 0,
  tags: post.tags,
  seo_title: post.seo.metaTitle,
  seo_description: post.seo.metaDescription,
  seo_keywords: post.seo.keywords
});

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data.map(mapSupabaseToBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Get blog posts by year
export const getBlogPostsByYear = async (): Promise<Record<string, BlogPost[]>> => {
  try {
    const posts = await getAllBlogPosts();
    const postsByYear: Record<string, BlogPost[]> = {};

    posts.forEach(post => {
      const year = new Date(post.createdAt).getFullYear().toString();
      if (!postsByYear[year]) {
        postsByYear[year] = [];
      }
      postsByYear[year].push(post);
    });

    return postsByYear;
  } catch (error) {
    console.error('Error fetching blog posts by year:', error);
    return {};
  }
};

// Get blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    console.log('🔍 getBlogPostBySlug: Looking for slug:', slug);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    console.log('🔍 getBlogPostBySlug: Query result:', { data, error });

    if (error) {
      console.error('❌ Error fetching blog post:', error);
      return null;
    }

    const mappedPost = mapSupabaseToBlogPost(data);
    console.log('🔍 getBlogPostBySlug: Mapped post:', mappedPost);
    return mappedPost;
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return null;
  }
};

// Save blog post (create or update)
export const saveBlogPost = async (post: BlogPost): Promise<boolean> => {
  try {
    console.log('🔍 saveBlogPost called with:', post);
    const supabaseData = mapBlogPostToSupabase(post);
    console.log('🔍 Mapped to Supabase data:', supabaseData);
    
    let query = supabase.from('blog_posts');
    
    if (post.id) {
      console.log('🔄 Updating existing post with ID:', post.id);
      // Update existing post
      const { data, error } = await query
        .update(supabaseData)
        .eq('id', post.id)
        .select();
      
      console.log('🔄 Update result:', { data, error });
      
      if (error) {
        console.error('❌ Error updating blog post:', error);
        return false;
      }
    } else {
      console.log('➕ Creating new post');
      // Create new post
      const { data, error } = await query.insert(supabaseData).select();
      
      console.log('➕ Insert result:', { data, error });
      
      if (error) {
        console.error('❌ Error creating blog post:', error);
        return false;
      }
    }

    console.log('✅ Blog post saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving blog post:', error);
    return false;
  }
};

// Delete blog post
export const deleteBlogPost = async (postId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

// Update blog post read count
export const updateBlogPostReads = async (postId: string): Promise<boolean> => {
  try {
    console.log('🔍 updateBlogPostReads: Updating reads for post ID:', postId);
    
    // First get the current read count
    const { data: currentPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('total_reads')
      .eq('id', postId)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching current read count:', fetchError);
      return false;
    }

    const newReadCount = (currentPost?.total_reads || 0) + 1;
    console.log('🔍 updateBlogPostReads: New read count:', newReadCount);

    // Update with the new count
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        total_reads: newReadCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId);

    if (error) {
      console.error('❌ Error updating blog post reads:', error);
      return false;
    }

    console.log('✅ updateBlogPostReads: Successfully updated read count');
    return true;
  } catch (error) {
    console.error('❌ Error updating blog post reads:', error);
    return false;
  }
};

// Get featured blog posts
export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured blog posts:', error);
      return [];
    }

    return data.map(mapSupabaseToBlogPost);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
};

// Search blog posts
export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }

    return data.map(mapSupabaseToBlogPost);
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
};

// Admin functions (these would need authentication in production)
export const getAllBlogPostsAdmin = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all blog posts for admin:', error);
      return [];
    }

    return data.map(mapSupabaseToBlogPost);
  } catch (error) {
    console.error('Error fetching all blog posts for admin:', error);
    return [];
  }
};
