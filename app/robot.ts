import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ciptamandiriperkasa-c9ap.vercel.app/sitemap.xml",
  }
}

