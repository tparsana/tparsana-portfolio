import { isUsingSupabase } from '@/config/data-source';
import * as localStorageBlogs from './blogs';
import * as supabaseBlogs from './blogs-supabase';
import { BlogPost } from './blogs';

// Unified blog data layer that automatically switches between localStorage and Supabase
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.getAllBlogPosts();
  } else {
    return localStorageBlogs.getAllBlogPosts();
  }
};

export const getBlogPostsByYear = async (): Promise<Record<string, BlogPost[]>> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.getBlogPostsByYear();
  } else {
    return localStorageBlogs.getBlogPostsByYear();
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.getBlogPostBySlug(slug);
  } else {
    return localStorageBlogs.getBlogPostBySlug(slug);
  }
};

export const saveBlogPost = async (post: BlogPost): Promise<boolean> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.saveBlogPost(post);
  } else {
    localStorageBlogs.saveBlogPost(post);
    return true;
  }
};

export const deleteBlogPost = async (postId: string): Promise<boolean> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.deleteBlogPost(postId);
  } else {
    localStorageBlogs.deleteBlogPost(postId);
    return true;
  }
};

export const updateBlogPostReads = async (postId: string): Promise<boolean> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.updateBlogPostReads(postId);
  } else {
    localStorageBlogs.updateBlogPostReads(postId);
    return true;
  }
};

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.getFeaturedBlogPosts();
  } else {
    return localStorageBlogs.getFeaturedBlogPosts();
  }
};

export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.searchBlogPosts(query);
  } else {
    // For localStorage, implement simple search
    const allPosts = localStorageBlogs.getAllBlogPosts();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Admin functions
export const getAllBlogPostsAdmin = async (): Promise<BlogPost[]> => {
  if (isUsingSupabase) {
    return await supabaseBlogs.getAllBlogPostsAdmin();
  } else {
    return localStorageBlogs.getAllBlogPosts();
  }
};
