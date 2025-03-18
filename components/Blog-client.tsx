"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface BlogPost {
  id: number
  judul: string
  ringkasan: string
  konten: string
  gambar_url: string | null
  kategori: string | null
  penulis: string
  tanggal_publikasi: string
  slug: string
}

interface BlogClientProps {
  initialPosts: BlogPost[]
}

export function BlogClient({ initialPosts }: BlogClientProps) {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: id })
    } catch {
      return dateString
    }
  }

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog Terbaru</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan informasi terbaru seputar properti, tips membeli rumah, dan perkembangan pasar real estate di
            Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialPosts.length > 0 ? (
            initialPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <Link href={`/blog/${post.slug || post.id}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.gambar_url || "/placeholder.svg?height=400&width=600"}
                      alt={post.judul}
                      fill
                      className="object-cover"
                    />
                    {post.kategori && (
                      <div className="absolute top-4 left-4 bg-secondary text-black text-xs font-semibold px-3 py-1 rounded">
                        {post.kategori}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{formatDate(post.tanggal_publikasi)}</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.penulis}</span>
                  </div>
                  <Link href={`/blog/${post.slug || post.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.judul}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.ringkasan}</p>
                  <Link href={`/blog/${post.slug || post.id}`}>
                    <Button variant="link" className="p-0 h-auto text-primary font-medium">
                      Baca Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">Belum ada artikel blog.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-primary hover:bg-primary/90">
              Lihat Semua Artikel <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

