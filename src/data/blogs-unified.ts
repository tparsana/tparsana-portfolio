import * as localStorageBlogs from './blogs';
import { BlogPost } from './blogs';

// Unified blog data layer backed by local storage only.
export const getAllBlogPosts = async (): Promise<BlogPost[]> =>
  localStorageBlogs.getAllBlogPosts();

export const getBlogPostsByYear = async (): Promise<Record<string, BlogPost[]>> =>
  localStorageBlogs.getBlogPostsByYear();

export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => localStorageBlogs.getBlogPostBySlug(slug);

export const saveBlogPost = async (post: BlogPost): Promise<boolean> => {
  localStorageBlogs.saveBlogPost(post);
  return true;
};

export const deleteBlogPost = async (postId: string): Promise<boolean> => {
  localStorageBlogs.deleteBlogPost(postId);
  return true;
};

export const updateBlogPostReads = async (postId: string): Promise<boolean> => {
  localStorageBlogs.updateBlogPostReads(postId);
  return true;
};

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> =>
  localStorageBlogs.getFeaturedBlogPosts();

export const searchBlogPosts = async (query: string): Promise<BlogPost[]> => {
  const allPosts = localStorageBlogs.getAllBlogPosts();

  return allPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase())
  );
};

export const getAllBlogPostsAdmin = async (): Promise<BlogPost[]> =>
  localStorageBlogs.getAllBlogPosts();
