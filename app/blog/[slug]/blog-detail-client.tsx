"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BlogSidebar from "@/components/BlogSidebar"
import { Button } from "@/components/ui/Button"
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"

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

interface BlogDetailClientProps {
  post: BlogPost
  recentPosts: BlogPost[]
  categories: string[]
}

export default function BlogDetailClient({ post, recentPosts, categories }: BlogDetailClientProps) {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: id })
    } catch {
      return dateString
    }
  }

  // Share functionality
  const sharePost = (platform: string) => {
    const url = window.location.href
    const title = post?.judul || "Artikel Blog"

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <article className="bg-white rounded-lg overflow-hidden shadow-md">
                {/* Featured Image */}
                <div className="relative h-64 md:h-96 w-full">
                  <Image
                    src={post.gambar_url || "/placeholder.svg?height=800&width=1200"}
                    alt={post.judul}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 800px, 100vw"
                  />
                  {post.kategori && (
                    <div className="absolute top-4 left-4 bg-secondary text-black text-xs font-semibold px-3 py-1 rounded">
                      {post.kategori}
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-4 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.tanggal_publikasi)}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.penulis}</span>
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.judul}</h1>

                  <div className="text-gray-700 mb-6 italic">{post.ringkasan}</div>

                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.konten }} />

                  {/* Share Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium mr-4">Bagikan Artikel:</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full text-blue-600 hover:bg-blue-50"
                          onClick={() => sharePost("facebook")}
                        >
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full text-sky-500 hover:bg-sky-50"
                          onClick={() => sharePost("twitter")}
                        >
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full text-blue-700 hover:bg-blue-50"
                          onClick={() => sharePost("linkedin")}
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Back to Blog */}
              <div className="mt-8">
                <Link href="/blog">
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <BlogSidebar categories={categories} recentPosts={recentPosts} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

