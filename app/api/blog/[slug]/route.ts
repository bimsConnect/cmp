import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  // Await params terlebih dahulu
  const { slug } = await params

  try {
    // Coba cari berdasarkan slug
    let result = await query(
      `
      SELECT * FROM blog 
      WHERE slug = $1
    `,
      [slug],
    )

    // Jika tidak ditemukan dan slug adalah angka, coba cari berdasarkan ID
    if (result.rows.length === 0 && !isNaN(Number(slug))) {
      result = await query(
        `
        SELECT * FROM blog 
        WHERE id = $1
      `,
        [Number(slug)],
      )
    }

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 })
  } catch (error) {
    console.error("Error mengambil data blog:", error)
    return NextResponse.json({ error: "Terjadi kesalahan saat mengambil data blog" }, { status: 500 })
  }
}

// Revalidasi ISR saat ada perubahan pada blog post
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  // Await params terlebih dahulu
  const { slug } = await params

  try {
    // Revalidasi halaman blog dan halaman detail
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error("Error revalidating:", error) // Menggunakan variabel error
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}