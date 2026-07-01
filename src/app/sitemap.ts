import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://pradhumnmishra.online";

// Function to recursively scan the src/app directory for static pages
function getStaticRoutes(dir: string, baseRoute = ""): string[] {
  const routes: string[] = [];
  if (!fs.existsSync(dir)) return routes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const name = entry.name;
      // Skip dynamic route folders (e.g., [slug]), api folder, and private folders/route groups with special prefix if needed
      if (name.startsWith("[") && name.endsWith("]")) {
        continue;
      }
      // Skip common non-route folders or api directories
      if (name === "api" || name.startsWith("_") || name.startsWith(".")) {
        continue;
      }

      // Check if it is a route group (e.g., (marketing))
      const isRouteGroup = name.startsWith("(") && name.endsWith(")");
      const nextBaseRoute = isRouteGroup
        ? baseRoute
        : `${baseRoute}/${name}`;

      routes.push(...getStaticRoutes(path.join(dir, name), nextBaseRoute));
    } else if (entry.isFile()) {
      const name = entry.name;
      // We look for page.tsx, page.ts, page.js, page.jsx
      if (/^page\.(tsx|ts|js|jsx)$/.test(name)) {
        routes.push(baseRoute || "/");
      }
    }
  }

  return routes;
}

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Get static routes
  const appDirectory = path.join(process.cwd(), "src/app");
  const staticPaths = getStaticRoutes(appDirectory);

  // Map static routes to sitemap format
  const staticUrls = staticPaths.map((route) => {
    // Clean up route: ensure it starts with / and has no trailing slash (unless it is just /)
    const cleanRoute = route === "/" ? "" : route;
    return {
      url: `${BASE_URL}${cleanRoute}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: cleanRoute === "" ? 1.0 : 0.8,
    };
  });

  // 2. Get dynamic blog post routes
  let blogUrls: { url: string; lastModified: Date; changeFrequency: "weekly"; priority: number }[] = [];
  try {
    const posts = await getAllPosts();
    blogUrls = posts.map((post) => {
      // Parse publishDate or fallback to current date
      let postDate = new Date();
      if (post.publishDate) {
        const parsedDate = new Date(post.publishDate);
        if (!isNaN(parsedDate.getTime())) {
          postDate = parsedDate;
        }
      }
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: postDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error generating sitemap for blog posts:", error);
  }

  return [...staticUrls, ...blogUrls];
}
