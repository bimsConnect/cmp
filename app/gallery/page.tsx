import type { Metadata } from "next"
import { query } from "@/lib/db"
import GalleryClient from "./gallery-client"

export const metadata: Metadata = {
  title: "Galeri | Cipta Mandiri Perkasa",
  description: "Jelajahi koleksi properti eksklusif kami yang tersebar di berbagai lokasi strategis.",
  keywords: "galeri properti, properti eksklusif, koleksi properti, lokasi strategis",
  openGraph: {
    title: "Galeri | Cipta Mandiri Perkasa",
    description: "Jelajahi koleksi properti eksklusif kami yang tersebar di berbagai lokasi strategis.",
    images: [
      {
        url: "/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Galeri Cipta Mandiri Perkasa",
      },
    ],
  },
}

// Aktifkan ISR dengan revalidasi setiap 1 jam (3600 detik)
export const revalidate = 3600

// Fungsi untuk mengambil data galeri dari database
async function getGalleryItems() {
  try {
    const result = await query(`
      SELECT * FROM galeri 
      ORDER BY created_at DESC
    `)

    return result.rows
  } catch (error) {
    console.error("Error mengambil data galeri:", error)
    return []
  }
}

export default async function GalleryPage() {
  const properties = await getGalleryItems()

  return <GalleryClient initialProperties={properties} />
}

