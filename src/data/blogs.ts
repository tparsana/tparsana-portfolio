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
    id: "gpt-5-thoughts",
    title: "my thoughts on gpt-5",
    slug: "my-thoughts-on-gpt-5",
    excerpt: "been using gpt-5 (max) inside cursor for the past two days and here's my very early reaction:",
    content: `been using gpt-5 (max) inside cursor for the past two days and here's my very early reaction:

• it follows instructions with surgical precision

• tool calls are clean and to the point; i've seen it do 11 file edits in one go

• for long tasks, it actually stays on track without drifting

• it doesn't ramble or explain unless asked, just quietly gets stuff done

• writes code that works, no babysitting needed

the real difference shows up when you run todo-style breakdowns or assign multi-step work. it just finishes the task. cleanly.

Example: one of our engineers saw tens of thousands of calls to a legacy GET /me/... endpoint slowing down page load and asked gpt-5 to remove it. it deleted ~3,000 lines across the codebase and rewired the auth flow perfectly. no bugs, no edge cases missed.

this feels like the first AI that actually replaces junior dev work completely. not "helps with" or "assists" — actually replaces. the precision is surgical, the execution is flawless, and it doesn't need hand-holding.

honestly? it's a bit scary how good it is.`,
    publishedAt: "2025-08-09",
    readTime: 1,
    tags: ["thoughts"],
    totalReads: 148,
    author: {
      name: "Tanish Parsana",
      avatar: "/IMG_1241.jpeg"
    },
    seo: {
      metaTitle: "My Thoughts on GPT-5: Revolutionary AI Development Experience",
      metaDescription: "Early insights on using GPT-5 for development work - surgical precision, clean tool calls, and actual replacement of junior dev tasks.",
      keywords: ["GPT-5", "AI", "development", "cursor", "thoughts", "artificial intelligence", "coding"]
    }
  },
  {
    id: "personal-spotify-player",
    title: "building a Personal Live Spotify Player",
    slug: "building-personal-live-spotify-player",
    excerpt: "Creating a real-time Spotify player that syncs with my current listening activity and displays beautiful visualizations.",
    content: `# Building a Personal Live Spotify Player

I've always wanted to build something that bridges my love for music and coding. So I decided to create a personal live Spotify player that not only shows what I'm currently listening to but also provides beautiful visualizations and analytics.

## The Concept

The idea was simple: create a web app that connects to the Spotify API and displays my current track in real-time, with additional features like:

- Live playback visualization
- Track history and analytics
- Mood-based playlists
- Integration with my portfolio

## Technical Implementation

### Setting Up Spotify API

First, I registered my app with Spotify Developer Dashboard and set up OAuth authentication. The key was getting the right scopes for reading playback state and user data.

\`\`\`javascript
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'playlist-read-private'
];
\`\`\`

### Real-time Updates

I implemented a polling mechanism that checks for the current track every 5 seconds, with smart caching to avoid unnecessary API calls.

### Visualization

Using Canvas API and Web Audio API, I created real-time visualizations that react to the music's tempo and energy levels.

## Challenges Faced

The biggest challenge was handling Spotify's rate limits while maintaining real-time updates. I solved this by implementing intelligent caching and only updating when the track actually changes.

## Results

The final product is a beautiful, responsive music player that seamlessly integrates with my portfolio and provides insights into my music listening habits.

*This project taught me a lot about working with third-party APIs and creating smooth real-time experiences.*`,
    publishedAt: "2025-04-14",
    readTime: 5,
    tags: ["blog"],
    totalReads: 324,
    author: {
      name: "Tanish Parsana",
      avatar: "/IMG_1241.jpeg"
    },
    seo: {
      metaTitle: "Building a Personal Live Spotify Player - Development Journey",
      metaDescription: "Learn how I built a real-time Spotify player with visualizations, analytics, and seamless portfolio integration using Spotify API.",
      keywords: ["Spotify", "API", "music player", "real-time", "visualization", "web development", "JavaScript"]
    }
  },
  {
    id: "viral-playboi-carti-website",
    title: "how i made a viral website about playboi carti that reached 73k visitors in a week.",
    slug: "viral-playboi-carti-website-73k-visitors",
    excerpt: "The story behind creating a viral fan website that captured the internet's attention and reached massive traffic in just one week.",
    content: `# How I Made a Viral Website About Playboi Carti That Reached 73k Visitors in a Week

Sometimes the most unexpected projects take off in ways you never imagine. This is the story of how a simple fan website I built over a weekend became a viral sensation with 73,000 visitors in its first week.

## The Genesis

It started with a simple observation: Playboi Carti fans are incredibly passionate and creative, but there wasn't a centralized place that captured the unique culture around his music and aesthetic.

## What Made It Special

### 1. Authentic Fan Perspective
I didn't try to create something corporate or polished. Instead, I leaned into the chaotic, experimental energy that defines Carti's fanbase.

### 2. Interactive Elements
- Real-time lyrics that synced with his most popular tracks
- A "vibe check" generator that matched your mood to Carti songs
- User-submitted content galleries
- Easter eggs hidden throughout the site

### 3. Perfect Timing
I launched it right after a cryptic Instagram post from Carti, when the fanbase was actively looking for content and clues.

## Technical Implementation

Built with:
- Next.js for fast loading and SEO
- Framer Motion for smooth animations
- Spotify Web API for music integration
- Cloudinary for image optimization
- Vercel for deployment

## The Viral Moment

The breakthrough came when a popular Carti fan account on Twitter discovered the site and shared it. Within hours, it was being shared across:

- Twitter threads
- TikTok videos
- Reddit discussions
- Discord servers

## Analytics Breakdown

**Week 1 Numbers:**
- 73,147 unique visitors
- 312,891 page views
- Average session: 4.2 minutes
- 42% return visitor rate
- Traffic from 67 countries

**Top Traffic Sources:**
1. Twitter (34%)
2. Direct (28%)
3. TikTok (15%)
4. Reddit (12%)
5. Other (11%)

## Key Lessons Learned

### 1. Authenticity Beats Polish
The rough edges and playful imperfections made it feel genuine to the community.

### 2. Community-First Approach
I built features that the fanbase actually wanted, not what I thought they should want.

### 3. Timing Is Everything
Launching at the right cultural moment amplified the impact exponentially.

### 4. Make It Shareable
Every element was designed with shareability in mind - from quotable text to screenshot-worthy visuals.

## The Technical Challenges

Handling sudden traffic spikes required quick optimizations:
- Implemented aggressive caching
- Optimized images and assets
- Added CDN distribution
- Set up monitoring and alerts

## Long-term Impact

While the initial viral wave lasted about 2 weeks, the site continued to get steady traffic and became a reference point in the fan community. It also led to several freelance opportunities and connections in the music tech space.

## What's Next

This experience taught me the power of building for passionate communities. I'm now working on similar passion projects in other areas where enthusiastic fanbases exist but lack dedicated digital spaces.

*Sometimes the side projects you build for fun end up teaching you the most about product-market fit, user engagement, and the unpredictable nature of viral content.*`,
    publishedAt: "2025-01-02",
    readTime: 10,
    tags: ["blog"],
    totalReads: 892,
    author: {
      name: "Tanish Parsana",
      avatar: "/IMG_1241.jpeg"
    },
    featured: true,
    seo: {
      metaTitle: "How I Built a Viral Playboi Carti Website with 73k Visitors in One Week",
      metaDescription: "The complete story of creating a viral fan website that reached 73,000 visitors in one week, including technical details and key lessons learned.",
      keywords: ["viral website", "Playboi Carti", "web development", "viral marketing", "fan community", "Next.js", "social media"]
    }
  },
  {
    id: "sunhacks-2024-experience",
    title: "learning aws, mongodb atlas, and more in 24 hours—my sunhacks 2024 experience.",
    slug: "sunhacks-2024-aws-mongodb-24-hours",
    excerpt: "A intense 24-hour hackathon experience learning new technologies on the fly and building something meaningful under pressure.",
    content: `# Learning AWS, MongoDB Atlas, and More in 24 Hours—My SunHacks 2024 Experience

Hackathons are wild. 24 hours to go from idea to demo, often learning entirely new technologies along the way. SunHacks 2024 was exactly that kind of experience—intense, educational, and ultimately rewarding.

## The Challenge

Our team decided to tackle a problem we were passionate about: helping small businesses manage their inventory more efficiently. The catch? None of us had experience with the tech stack we wanted to use.

**What we needed to learn:**
- AWS services (Lambda, API Gateway, S3)
- MongoDB Atlas
- Real-time data synchronization
- Mobile-responsive design patterns

## Hour by Hour Breakdown

### Hours 0-6: Research and Planning
- Brainstormed ideas and settled on inventory management
- Researched AWS services and MongoDB Atlas
- Set up development environments
- Created project structure

### Hours 6-12: Deep Learning Phase
This was the most intense part. We split up to tackle different technologies:
- I dove deep into AWS Lambda and API Gateway
- Teammate focused on MongoDB Atlas setup and schema design
- Another worked on frontend architecture

### Hours 12-18: Integration Hell
Nothing worked the first time. CORS issues, authentication problems, database connection errors. The learning curve was steep, but we powered through with:
- Stack Overflow deep dives
- AWS documentation marathons
- Trial and error debugging

### Hours 18-24: Polish and Demo Prep
- Fixed critical bugs
- Added demo data
- Prepared presentation
- Practiced our pitch

## What I Learned

### AWS Lambda
Coming from traditional server setups, serverless was a paradigm shift. The pay-per-execution model and automatic scaling are game-changers for small projects.

### MongoDB Atlas
The managed MongoDB service saved us hours of database setup. The built-in monitoring and scaling capabilities are impressive.

### Time Management Under Pressure
24 hours forces you to prioritize ruthlessly. We learned to focus on core functionality first, polish later.

## The Technical Stack

**Frontend:**
- React with TypeScript
- Tailwind CSS for rapid styling
- Axios for API calls

**Backend:**
- AWS Lambda (Node.js)
- API Gateway for routing
- MongoDB Atlas for data storage
- AWS S3 for file storage

**DevOps:**
- GitHub for version control
- AWS CloudFormation for infrastructure
- Vercel for frontend deployment

## Challenges and Solutions

### Challenge 1: CORS Issues
**Problem:** Frontend couldn't communicate with AWS API Gateway
**Solution:** Properly configured CORS headers in API Gateway and Lambda responses

### Challenge 2: Database Connection Pooling
**Problem:** Lambda functions timing out due to MongoDB connections
**Solution:** Implemented connection reuse and proper error handling

### Challenge 3: Real-time Updates
**Problem:** Inventory changes needed to reflect immediately
**Solution:** Implemented WebSocket connections with AWS API Gateway

## The Results

We built a functional inventory management system with:
- Real-time inventory tracking
- Barcode scanning capability
- Analytics dashboard
- Multi-user support

**Demo Day:**
- Placed 3rd in the "Best Use of Cloud Services" category
- Received positive feedback from industry judges
- Connected with potential users and mentors

## Key Takeaways

### 1. Embrace the Learning Curve
Don't be afraid to use technologies you're unfamiliar with. Hackathons are perfect learning environments.

### 2. Documentation Is Your Friend
Good documentation can make or break your experience with new tools. AWS and MongoDB both have excellent docs.

### 3. Start Simple, Iterate Fast
Get a basic version working first, then add features. This saved us when we hit unexpected roadblocks.

### 4. Team Communication Is Critical
Regular check-ins and clear task division kept us aligned despite the time pressure.

## Post-Hackathon Impact

This experience opened doors:
- Started using AWS for personal projects
- Became more comfortable with NoSQL databases
- Improved my ability to learn new technologies quickly
- Connected with fellow developers and industry professionals

## What's Next

I'm planning to continue developing the inventory management system as a side project. The hackathon gave us a solid foundation and valuable user feedback to build upon.

*Hackathons might be exhausting, but they're incredible catalysts for learning and growth. 24 hours can genuinely change your technical perspective.*`,
    publishedAt: "2024-10-02",
    readTime: 4,
    tags: ["blog"],
    totalReads: 567,
    author: {
      name: "Tanish Parsana",
      avatar: "/IMG_1241.jpeg"
    },
    seo: {
      metaTitle: "SunHacks 2024: Learning AWS and MongoDB in 24 Hours - Hackathon Experience",
      metaDescription: "My intense 24-hour hackathon experience learning AWS, MongoDB Atlas, and building an inventory management system from scratch.",
      keywords: ["SunHacks", "hackathon", "AWS", "MongoDB", "learning", "24 hours", "inventory management", "serverless"]
    }
  },
  {
    id: "lessons-from-gitaura-brat",
    title: "lessons from gitaura and brat.",
    slug: "lessons-from-gitaura-and-brat",
    excerpt: "Reflections on building in public, community engagement, and the unexpected lessons learned from viral developer tools and pop culture.",
    content: `# Lessons from GitAura and Brat

Sometimes the most valuable lessons come from the most unexpected places. This year, I found myself drawing parallels between two seemingly unrelated phenomena: GitAura (a GitHub profile enhancement tool) and Charli XCX's "Brat" era. Both taught me something fundamental about authenticity, community, and building things people actually want.

## GitAura: The Accidental Community Builder

I built GitAura as a simple tool to make GitHub profiles more visually appealing. What I didn't expect was how it would become a community catalyst.

### What GitAura Taught Me:

**1. Solve Your Own Problem First**
I built it because I wanted a better-looking GitHub profile. The authenticity of solving your own problem translates to others facing the same issue.

**2. Make It Stupidly Simple**
One-click enhancement. No complex setup, no configuration hell. Sometimes the best product is the one that just works.

**3. Community Emerges Organically**
Users started sharing their enhanced profiles, creating tutorials, and suggesting features. I didn't build a community—I built something that enabled community to form naturally.

## Brat Summer: Authenticity in Digital Spaces

Charli XCX's "Brat" wasn't just an album; it was a cultural moment that redefined online authenticity. The messy, unfiltered aesthetic became a blueprint for genuine digital expression.

### What Brat Taught Me:

**1. Embrace the Mess**
Perfect isn't relatable. The slightly chaotic, unpolished elements often connect more deeply than pristine presentations.

**2. Cultural Timing Matters**
Brat captured a specific moment when people were craving authenticity over perfection. Building products requires reading these cultural shifts.

**3. Memes Are Modern Currency**
The most shareable moments weren't the polished ones—they were the spontaneous, meme-able instances that people could relate to and remix.

## The Intersection: Building Authentic Digital Experiences

Both GitAura and Brat succeeded because they gave people tools for authentic self-expression:

### GitAura: 
Enhanced profiles that still felt personal, not corporate

### Brat: 
Pop music that felt real, not manufactured

## Lessons for Building Digital Products

### 1. Authenticity Scales Better Than Polish
People can sense when something is genuine versus when it's trying too hard. Lead with authenticity, polish later.

### 2. Give People Tools, Not Solutions
Don't dictate how people should express themselves. Give them flexible tools and let them create their own meaning.

### 3. Community > Features
A passionate small community beats a disengaged large audience every time. Build for the people who care most.

### 4. Timing Is Distribution
The best product at the wrong time fails. The good product at the right time succeeds. Read the cultural moment.

### 5. Make It Shareable by Default
Both GitAura profiles and Brat moments were inherently shareable. Build shareability into the core experience, not as an afterthought.

## Practical Applications

**For Developers:**
- Build tools that enhance rather than replace personal expression
- Start with your own needs, but stay open to community direction
- Make the first-time experience delightfully simple

**For Content Creators:**
- Embrace the unpolished moments
- Give your audience tools to participate, not just consume
- Cultural timing can amplify authentic content exponentially

**For Product Builders:**
- Study what's culturally resonant, not just what's technically impressive
- Community feedback often reveals product direction you couldn't see alone
- Sometimes the side effect becomes the main feature

## What's Next

I'm applying these lessons to new projects:
- Building tools that enhance rather than replace human creativity
- Focusing on cultural fit as much as product-market fit
- Creating experiences that people want to share, not just use

The intersection of technology and culture is where the most interesting products emerge. GitAura and Brat reminded me that people don't just want better tools—they want better ways to be themselves.

*Sometimes pop culture and developer tools teach the same lessons about authenticity, community, and building things that resonate with people.*`,
    publishedAt: "2024-07-15",
    readTime: 6,
    tags: ["blog"],
    totalReads: 431,
    author: {
      name: "Tanish Parsana",
      avatar: "/IMG_1241.jpeg"
    },
    seo: {
      metaTitle: "Lessons from GitAura and Brat: Authenticity in Digital Product Building",
      metaDescription: "Unexpected lessons about building authentic digital experiences from both developer tools and pop culture phenomena.",
      keywords: ["GitAura", "Brat", "authenticity", "community building", "product development", "digital culture", "GitHub"]
    }
  }
];

// localStorage key for blog posts
const BLOG_POSTS_KEY = 'tanish-portfolio-blog-posts';

// Get blog posts from localStorage or use defaults
const getBlogPostsFromStorage = (): BlogPost[] => {
  if (typeof window === 'undefined') return defaultBlogPosts;
  
  try {
    const stored = localStorage.getItem(BLOG_POSTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultBlogPosts;
    }
  } catch (error) {
    console.error('Error loading blog posts from localStorage:', error);
  }
  
  return defaultBlogPosts;
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

// If localStorage is empty, save the default posts
if (typeof window !== 'undefined' && !localStorage.getItem(BLOG_POSTS_KEY)) {
  saveBlogPostsToStorage(defaultBlogPosts);
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
