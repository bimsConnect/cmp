import { GalleryClient } from "./Gallery-client"
import { query } from "@/lib/db"

// Fungsi ini mengambil data langsung dari database untuk SSG/ISR
async function getGalleryItems() {
  try {
    // Menggunakan query database langsung, bukan API call
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

export default async function GallerySection() {
  const properties = await getGalleryItems()

  return <GalleryClient initialProperties={properties} />
}

