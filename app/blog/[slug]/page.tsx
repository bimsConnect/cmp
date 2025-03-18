import { Suspense } from "react"
import type { Metadata } from "next"
import { query } from "@/lib/db"
import { notFound } from "next/navigation"
import BlogDetailClient from "./blog-detail-client"

// Aktifkan ISR dengan revalidasi setiap 1 jam (3600 detik)
export const revalidate = 3600

// Tipe untuk params
type Params = Promise<{ slug: string }>

// Fungsi untuk mengambil data blog berdasarkan slug
async function getBlogPost(slug: string) {
  try {
    // Coba cari berdasarkan slug
    const result = await query(
      `
      SELECT * FROM blog 
      WHERE slug = $1
    `,
      [slug],
    )

    if (result.rows.length > 0) {
      return result.rows[0]
    }

    // Jika tidak ditemukan, coba cari berdasarkan ID (jika slug adalah angka)
    if (!isNaN(Number(slug))) {
      const idResult = await query(
        `
        SELECT * FROM blog 
        WHERE id = $1
      `,
        [Number(slug)],
      )

      if (idResult.rows.length > 0) {
        return idResult.rows[0]
      }
    }

    return null
  } catch (error) {
    console.error("Error mengambil data blog:", error)
    return null
  }
}

// Fungsi untuk mengambil data blog terbaru
async function getRecentPosts(currentId: number) {
  try {
    const result = await query(
      `
      SELECT * FROM blog 
      WHERE id != $1
      ORDER BY tanggal_publikasi DESC
      LIMIT 5
    `,
      [currentId],
    )

    return result.rows
  } catch (error) {
    console.error("Error mengambil data blog terbaru:", error)
    return []
  }
}

// Fungsi untuk mengambil kategori unik
async function getCategories() {
  try {
    const result = await query(`
      SELECT DISTINCT kategori FROM blog 
      WHERE kategori IS NOT NULL
    `)

    return result.rows.map((row) => row.kategori)
  } catch (error) {
    console.error("Error mengambil kategori:", error)
    return []
  }
}

// Fungsi untuk menghasilkan metadata dinamis
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  // Await params terlebih dahulu
  const { slug } = await params

  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | Cipta Mandiri Perkasa",
      description: "Maaf, artikel yang Anda cari tidak ditemukan atau telah dihapus.",
    }
  }

  return {
    title: `${post.judul} | Cipta Mandiri Perkasa`,
    description: post.ringkasan,
    openGraph: {
      title: post.judul,
      description: post.ringkasan,
      images: post.gambar_url
        ? [
            {
              url: post.gambar_url,
              width: 1200,
              height: 630,
              alt: post.judul,
            },
          ]
        : undefined,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  // Await params terlebih dahulu
  const { slug } = await params

  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const recentPosts = await getRecentPosts(post.id)
  const categories = await getCategories()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetailClient post={post} recentPosts={recentPosts} categories={categories} />
    </Suspense>
  )
}