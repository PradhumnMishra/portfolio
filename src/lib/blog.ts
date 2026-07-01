import fs from "fs";
import path from "path";
import { marked } from "marked";

export interface BlogPost {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  publishDate: string;
  tags: string[];
  image?: string;
  contentHtml: string;
  rawMarkdown: string;
  readingTime: string;
}

const blogsDirectory = path.join(process.cwd(), "content/blogs");

// Simple frontmatter parser
function parseFrontMatter(fileContent: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  yamlBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content };
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 225;
  const noOfWords = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Ensure the directory exists
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        // Remove ".md" from file name to serve as a default slug
        const defaultSlug = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Parse frontmatter
        const { data, content } = parseFrontMatter(fileContents);

        // Parse tags
        const tags = data.tags
          ? data.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : [];

        // The URL slug can be overridden by the frontmatter `url` field
        const slug = data.url ? data.url.trim() : defaultSlug;

        // Render markdown body to HTML
        const contentHtml = await marked.parse(content);

        return {
          title: data.title || "Untitled Post",
          metaTitle: data.metaTitle || data.title,
          metaDescription: data.metaDescription,
          slug,
          publishDate: data.publishDate || new Date().toISOString().split("T")[0],
          tags,
          image: data.image,
          contentHtml,
          rawMarkdown: content,
          readingTime: calculateReadingTime(content),
        };
      })
  );

  // Sort posts by date descending
  return allPostsData.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}
