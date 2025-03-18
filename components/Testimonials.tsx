import { TestimonialsClient } from "./Testimonials-client"
import { query } from "@/lib/db"

// Fungsi ini mengambil data langsung dari database untuk SSG/ISR
async function getTestimonials() {
  try {
    // Menggunakan query database langsung, bukan API call
    const result = await query(`
      SELECT * FROM testimonial
      WHERE status = 'disetujui'
      ORDER BY created_at DESC
    `)

    return result.rows
  } catch (error) {
    console.error("Error mengambil data testimonial:", error)
    return []
  }
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  return <TestimonialsClient initialTestimonials={testimonials} />
}

