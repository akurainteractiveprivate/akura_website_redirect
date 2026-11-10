import type { MetadataRoute } from "next";

const TARGET_DOMAIN = (
  process.env.TARGET_DOMAIN || "https://akurainteractive.dpdns.org"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${TARGET_DOMAIN}/sitemap.xml`,
  };
}
