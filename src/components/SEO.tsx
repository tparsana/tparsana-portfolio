import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  twitterHandle?: string;
}

const SEO = ({
  title = "Tanish Parsana - Full Stack Developer & AI Engineer",
  description = "Full Stack Developer and AI Engineer sharing thoughts on technology, development, and innovation.",
  keywords = ["Tanish Parsana", "Full Stack Developer", "AI Engineer", "React", "TypeScript", "Python", "Web Development"],
  ogImage = "/preview.png",
  ogType = "website",
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author = "Tanish Parsana",
  twitterHandle = "@tanishparsana"
}: SEOProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, useProperty = false) => {
      const attr = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      
      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        element.setAttribute(attr, property);
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (element) {
        element.href = href;
      } else {
        element = document.createElement('link');
        element.rel = rel;
        element.href = href;
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', window.location.origin + ogImage, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', "Tanish Parsana's Portfolio", true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', window.location.origin + ogImage);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:site', twitterHandle);

    // Article specific tags
    if (ogType === 'article') {
      updateMetaTag('article:author', author, true);
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
      keywords.forEach((keyword) => {
        updateMetaTag('article:tag', keyword, true);
      });
    }

    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    } else {
      updateLinkTag('canonical', window.location.href);
    }

    // Additional SEO enhancements
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Structured data for articles
    if (ogType === 'article') {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "author": {
          "@type": "Person",
          "name": author,
          "url": "https://tanishparsana.com"
        },
        "publisher": {
          "@type": "Person",
          "name": "Tanish Parsana",
          "url": "https://tanishparsana.com"
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "image": window.location.origin + ogImage,
        "url": window.location.href,
        "keywords": keywords.join(', ')
      };

      let scriptElement = document.querySelector('#structured-data') as HTMLScriptElement;
      if (scriptElement) {
        scriptElement.textContent = JSON.stringify(structuredData);
      } else {
        scriptElement = document.createElement('script');
        scriptElement.id = 'structured-data';
        scriptElement.type = 'application/ld+json';
        scriptElement.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptElement);
      }
    }

    // Cleanup function
    return () => {
      // Remove structured data when component unmounts
      const structuredDataElement = document.querySelector('#structured-data');
      if (structuredDataElement) {
        structuredDataElement.remove();
      }
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, publishedTime, modifiedTime, author, twitterHandle]);

  return null; // This component doesn't render anything visible
};

export default SEO;
