"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, ChevronRight, X, MapPin } from "lucide-react"

interface GalleryItem {
  id: number
  judul: string
  lokasi: string
  deskripsi: string | null
  gambar_url: string
}

interface GalleryClientProps {
  initialProperties: GalleryItem[]
}

export function GalleryClient({ initialProperties }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const properties = initialProperties

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return

    const newIndex = selectedImage + direction
    if (newIndex >= 0 && newIndex < properties.length) {
      setSelectedImage(newIndex)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri</h1>
            <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jelajahi koleksi properti eksklusif kami yang tersebar di berbagai lokasi strategis
            </p>
          </div>

          {/* Gallery Grid */}
          {properties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">Tidak ada galeri yang tersedia.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {properties.slice(0, 6).map((property, index) => (
                <motion.div
                  key={property.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={property.gambar_url || "/placeholder.svg"}
                      alt={property.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold">{property.judul}</h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-secondary" />
                      <p className="text-white/80">{property.lokasi}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">Lihat Semua Galeri</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && properties.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={() => navigateImage(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={properties[selectedImage].gambar_url || "/placeholder.svg"}
              alt={properties[selectedImage].judul}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/50 text-white">
              <h3 className="text-2xl font-semibold mb-2">{properties[selectedImage].judul}</h3>
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 mr-2 text-secondary" />
                <p className="text-lg">{properties[selectedImage].lokasi}</p>
              </div>
              {properties[selectedImage].deskripsi && (
                <p className="text-white/90">{properties[selectedImage].deskripsi}</p>
              )}
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={() => navigateImage(1)}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </main>
  )
}

