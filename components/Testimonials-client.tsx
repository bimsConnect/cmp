"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Star, StarHalf, X, MessageSquare } from "lucide-react"
import ImageUpload from "@/components/ImageUpload"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Testimonial {
  id: number
  nama: string
  peran: string | null
  pesan: string
  rating: number
  gambar_url: string | null
  status: "disetujui" | "ditolak" | "menunggu"
}

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[]
}

export function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formOpen, setFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    message: "",
    image_url: "",
    role: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating,
    })
  }

  const handleImageUploaded = (url: string) => {
    setFormData({
      ...formData,
      image_url: url,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for API
      const testimonialData = {
        nama: formData.name,
        peran: formData.role || null,
        pesan: formData.message,
        rating: formData.rating,
        gambar_url: formData.image_url || "/placeholder.svg?height=200&width=200", // Use uploaded image or placeholder
      }

      // Submit to API
      const response = await fetch("/api/testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonialData),
      })

      if (response.ok) {
        alert("Terima kasih atas testimoni Anda! Testimoni akan ditampilkan setelah disetujui oleh admin.")
        setFormOpen(false)
        setFormData({
          name: "",
          rating: 5,
          message: "",
          image_url: "",
          role: "",
        })
      } else {
        alert("Terjadi kesalahan saat mengirim testimoni. Silakan coba lagi.")
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      alert("Terjadi kesalahan saat mengirim testimoni. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-secondary text-secondary" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-secondary text-secondary" />)
    }

    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />)
    }

    return stars
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Testimoni Klien
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "80px" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Lihat apa kata klien kami tentang pengalaman mereka bekerja sama dengan Brick Property
          </motion.p>
        </div>

        {initialTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada testimoni. Jadilah yang pertama memberikan testimoni!</p>
          </div>
        ) : (
          <Slider {...settings}>
            {initialTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-6 h-full">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.gambar_url || "/placeholder.svg?height=200&width=200"}
                      alt={testimonial.nama}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="flex justify-center items-center mb-2">{renderStars(testimonial.rating || 5)}</div>
                    <p className="text-gray-700 italic mb-4">&quot;{testimonial.pesan}&quot;</p>
                    <div>
                      <h4 className="text-lg font-semibold">{testimonial.nama}</h4>
                      <p className="text-gray-500">{testimonial.peran || ""}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}

        {/* Add Testimonial Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setFormOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-8 inline-flex items-center"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Tambahkan Testimoni Anda
          </Button>
        </div>

        {/* Testimonial Form Modal */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-xl font-semibold">Tambahkan Testimoni</h3>
                  <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Pekerjaan (Opsional)
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(rating)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Testimoni Anda
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                      Foto Anda (Opsional)
                    </label>
                    <ImageUpload onImageUploaded={handleImageUploaded} bucket="testimonials" folder="users" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button type="button" variant="outline" onClick={() => setFormOpen(false)} className="mr-2">
                      Batal
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        "Kirim Testimoni"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

