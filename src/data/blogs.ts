export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  totalReads: number;
  author: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
}

// Default blog posts (used as initial data)
const defaultBlogPosts: BlogPost[] = [
  {
    id: "tesla-terafab-launch",
    title: "tesla terafab is the kind of insane vertical thinking that changes industries.",
    slug: "tesla-terafab-launch-reaction",
    excerpt: "Tesla's March 21, 2026 Terafab launch in Austin is one of the boldest manufacturing ideas I've seen in years, and the ambition behind it is hard to overstate.",
    content: `# Tesla Terafab Is the Kind of Insane Vertical Thinking That Changes Industries

Tesla, xAI and SpaceX unveiled TERAFAB in Austin on March 21, 2026, and I honestly think it is one of the most out-of-the-world manufacturing ideas announced in a very long time.

On the surface, it sounds simple: build chips for your own future. But if the reported ambition is even half real, this is not a normal factory announcement. This is a company looking at the hardest supply constraint in AI, robotics, autonomy and space systems and saying: fine, we'll go upstream ourselves.

That is an absurdly aggressive way to think. It is also exactly the kind of thinking that creates category-defining companies.

## Why This Is So Wild

Most companies are happy if they control the app layer.

Some great companies control hardware and software.

Very few try to control compute, manufacturing, deployment, robotics, vehicles, energy systems, satellites and the full stack around them at once. That is what makes TERAFAB so fascinating to me. It is not just a factory. It is an attempt to collapse a giant dependency tree into one internally compounding machine.

Tesla does not just need chips for cars anymore.

It needs them for:

- autonomy
- Optimus
- factory automation
- energy infrastructure
- AI training and inference
- whatever xAI wants to run next
- whatever SpaceX wants to put into orbit next

If you believe that future demand for compute is going to be violently larger than what current supply chains can handle, then TERAFAB starts to look less like a vanity moonshot and more like a strategic inevitability.

## The Part I Respect Most

What I respect most is the refusal to think in neat industry boxes.

Traditional thinking says:

- chip companies build chips
- car companies buy chips
- AI labs rent compute
- robotics teams wait their turn

TERAFAB throws that out.

It says the real winners may be the ones willing to redesign the stack itself instead of negotiating for a better seat inside the current one.

That is rare.

That is uncomfortable.

And that is usually where the most interesting progress comes from.

## Why It Feels Bigger Than a Factory

The reason this announcement hit me so hard is that it feels philosophical, not just industrial.

It reflects a worldview that says:

1. the future will require absurd amounts of compute
2. dependency on external bottlenecks is existential risk
3. if existing systems cannot scale fast enough, build new systems

That is such an extreme builder mindset. It is not incremental. It is not polite. It is not optimized for consensus. It is optimized for forcefully pulling the future closer.

And whether or not every target gets hit, that mindset matters.

Because even if TERAFAB lands at 20% of its stated ambition, 20% of a project this aggressive is still enormous.

## What Makes It Incredible

The truly incredible part is not just the size.

It is the combination of ambition and compression.

Tesla is already trying to solve:

- self-driving
- humanoid robotics
- battery manufacturing
- massive physical-world operations

Now add advanced chip production thinking on top of that.

Most organizations would split these into separate companies, separate roadmaps and separate decades. TERAFAB feels like an attempt to run all of them in parallel.

That is what makes it feel unreal.

## My Reaction

I love this kind of thinking.

Not because it is guaranteed to work. It probably won't work exactly the way it is imagined today.

I love it because it raises the ceiling on what people think is even worth attempting.

The world gets better when more builders are willing to think at this level:

- identify the real bottleneck
- go to first principles
- vertically integrate if necessary
- ignore how ridiculous it sounds
- build anyway

That is how you get breakthroughs.

TERAFAB may end up being remembered as one of the boldest strategic bets of this era, or as a spectacular overreach. But either way, it is not small thinking. It is not derivative. It is not safe.

It is a massive, weird, ambitious, deeply first-principles attempt to build the future faster.

And I think that is incredible.`,
    publishedAt: "2026-04-05",
    readTime: 4,
    tags: ["thoughts", "tesla", "ai", "manufacturing"],
    totalReads: 0,
    author: {
      name: "Tanish Parsana",
      avatar: "/IMG_1241.jpeg"
    },
    featured: true,
    seo: {
      metaTitle: "Tesla Terafab Launch Reaction: Why the Ambition Is Incredible",
      metaDescription: "My reaction to Tesla's TERAFAB launch in Austin and why its vertical, first-principles ambition is one of the wildest industrial bets in years.",
      keywords: ["Tesla", "Terafab", "xAI", "SpaceX", "AI chips", "manufacturing", "thoughts", "Austin"]
    }
  }
];

// localStorage key for blog posts
const BLOG_POSTS_KEY = 'tanish-portfolio-blog-posts';
const LEGACY_SEEDED_POST_IDS = new Set([
  "gpt-5-thoughts",
  "personal-spotify-player",
  "viral-playboi-carti-website",
  "sunhacks-2024-experience",
  "lessons-from-gitaura-brat",
]);
const REQUIRED_SEEDED_POST_IDS = new Set(["tesla-terafab-launch"]);

const normalizeBlogPosts = (posts: BlogPost[]): BlogPost[] => {
  const requiredSeedPosts = defaultBlogPosts.filter((post) =>
    REQUIRED_SEEDED_POST_IDS.has(post.id)
  );
  const customPosts = posts.filter(
    (post) =>
      !LEGACY_SEEDED_POST_IDS.has(post.id) &&
      !REQUIRED_SEEDED_POST_IDS.has(post.id)
  );

  return [...requiredSeedPosts, ...customPosts];
};

// Get blog posts from localStorage or use defaults
const getBlogPostsFromStorage = (): BlogPost[] => {
  if (typeof window === 'undefined') return defaultBlogPosts;
  
  try {
    const stored = localStorage.getItem(BLOG_POSTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0
        ? normalizeBlogPosts(parsed)
        : normalizeBlogPosts(defaultBlogPosts);
    }
  } catch (error) {
    console.error('Error loading blog posts from localStorage:', error);
  }
  
  return normalizeBlogPosts(defaultBlogPosts);
};

// Save blog posts to localStorage
const saveBlogPostsToStorage = (posts: BlogPost[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving blog posts to localStorage:', error);
  }
};

// Initialize blog posts from storage
let blogPosts = getBlogPostsFromStorage();

if (typeof window !== 'undefined') {
  saveBlogPostsToStorage(blogPosts);
}

// Blog post management functions
export const getAllBlogPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const saveBlogPost = (post: BlogPost): void => {
  const existingIndex = blogPosts.findIndex(p => p.id === post.id);
  
  if (existingIndex !== -1) {
    // Update existing post
    blogPosts[existingIndex] = post;
  } else {
    // Add new post
    blogPosts = [post, ...blogPosts];
  }
  
  saveBlogPostsToStorage(blogPosts);
};

export const deleteBlogPost = (postId: string): void => {
  blogPosts = blogPosts.filter(p => p.id !== postId);
  saveBlogPostsToStorage(blogPosts);
};

export const updateBlogPostReads = (postId: string): void => {
  const postIndex = blogPosts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    blogPosts[postIndex].totalReads += 1;
    saveBlogPostsToStorage(blogPosts);
  }
};

// Helper functions
export const getBlogPostsByYear = () => {
  const currentPosts = getAllBlogPosts();
  const postsByYear = currentPosts.reduce((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, BlogPost[]>);

  // Sort each year's posts by date (newest first)
  Object.keys(postsByYear).forEach(year => {
    postsByYear[parseInt(year)].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return postsByYear;
};

export const getBlogPostBySlug = (slug: string) => {
  const currentPosts = getAllBlogPosts();
  return currentPosts.find(post => post.slug === slug);
};

export const getFeaturedPosts = () => {
  const currentPosts = getAllBlogPosts();
  return currentPosts.filter(post => post.featured);
};

export const getPostsByTag = (tag: string) => {
  const currentPosts = getAllBlogPosts();
  return currentPosts.filter(post => post.tags.includes(tag));
};

export const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Reset to default posts (useful for development)
export const resetToDefaultPosts = () => {
  blogPosts = [...defaultBlogPosts];
  saveBlogPostsToStorage(blogPosts);
};

export const getFeaturedBlogPosts = () => {
  const currentPosts = getAllBlogPosts();
  return currentPosts.filter(post => post.featured);
};
