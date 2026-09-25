import { MetadataRoute } from "next";
import { BLOG_POSTS, DOCTORS, SERVICES } from "@/data/seedData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vijayaharshahospital.com";

  const staticRoutes = [
    "",
    "/about",
    "/doctors",
    "/services",
    "/gallery",
    "/blog",
    "/contact",
    "/book-appointment",
    "/emergency",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/emergency" || route === "/book-appointment" ? 0.9 : 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
