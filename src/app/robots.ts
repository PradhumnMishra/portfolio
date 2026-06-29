import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://pradhumnmishra.online/sitemap.xml",
    host: "https://pradhumnmishra.online",
  };
}
