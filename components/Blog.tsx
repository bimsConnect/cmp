import { BlogClient } from "./Blog-client"
import { query } from "@/lib/db"

// Fungsi ini mengambil data langsung dari database untuk SSG/ISR
async function getBlogPosts() {
  try {
    // Menggunakan query database langsung, bukan API call
    const result = await query(`
      SELECT * FROM blog 
      ORDER BY tanggal_publikasi DESC
      LIMIT 3
    `)

    return result.rows
  } catch (error) {
    console.error("Error mengambil data blog:", error)
    return []
  }
}

export default async function BlogSection() {
  const posts = await getBlogPosts()

  return <BlogClient initialPosts={posts} />
}

