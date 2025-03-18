import { Suspense } from "react"
import type { Metadata } from "next"
import { query } from "@/lib/db"
import BlogClient from "./blog-client"

export const metadata: Metadata = {
  title: "Blog | Cipta Mandiri Perkasa",
  description:
    "Temukan informasi terbaru seputar properti, tips membeli rumah, dan perkembangan pasar real estate di Indonesia.",
  keywords: "blog properti, tips properti, pasar real estate, berita properti",
  openGraph: {
    title: "Blog | Cipta Mandiri Perkasa",
    description:
      "Temukan informasi terbaru seputar properti, tips membeli rumah, dan perkembangan pasar real estate di Indonesia.",
    images: [
      {
        url: "/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Cipta Mandiri Perkasa",
      },
    ],
  },
}

// Aktifkan ISR dengan revalidasi setiap 1 jam (3600 detik)
export const revalidate = 3600

// Fungsi untuk mengambil data blog dari database
async function getBlogPosts() {
  try {
    const result = await query(`
      SELECT * FROM blog 
      ORDER BY tanggal_publikasi DESC
    `)

    return result.rows
  } catch (error) {
    console.error("Error mengambil data blog:", error)
    return []
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient initialBlogPosts={blogPosts} />
    </Suspense>
  )
}