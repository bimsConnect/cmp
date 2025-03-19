"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image" // Add this import
import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

type Slide = {
  image: string
  title: string
  description: string
  highlight: string
}

interface HeroClientProps {
  slides: Slide[]
}

export function HeroClient({ slides }: HeroClientProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlideIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={slides[currentSlideIndex].image}
              alt={slides[currentSlideIndex].title}
              fill
              priority
              quality={100}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Content */}
      <div className="container relative z-20 text-white text-center px-4 max-w-5xl mt-16 md:mt-20 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentSlideIndex}`}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {slides[currentSlideIndex].title.split(slides[currentSlideIndex].highlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <motion.span
                    className="relative text-yellow-400"
                    animate={{ color: ["#FFD700", "#FFA500", "#FFD700"] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {slides[currentSlideIndex].highlight}
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.span>
                )}
              </span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`description-${currentSlideIndex}`}
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
          >
            {slides[currentSlideIndex].description}
          </motion.p>
        </AnimatePresence>

        {/* Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Mulai Sekarang */}
          <Link href="#about">
            <Button className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg">
              <span className="relative z-10 flex items-center">
                Pelajari Lebih Lanjut
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </Link>

          {/* Hubungi Kami dengan Phone Link */}
          <a
            href="tel:+6285218729008"
            className="inline-block sm:inline-block md:hidden" // Show on mobile/tablet (<768px), hide on desktop
          >
            <Button className="group relative overflow-hidden bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg shadow-lg">
              <span className="relative z-10 flex items-center">
                Hubungi Kami
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                >
                  <Phone className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </a>

          {/* Hubungi Kami WhatsApp Button */}
          <a
            href="https://wa.me/6285218729008?text=Halo%20Cipta%20Mandiri%20Perkasa%2C%20saya%20tertarik%20untuk%20berkonsultasi%20tentang%20layanan%20Anda."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="group relative overflow-hidden bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-6 text-lg shadow-lg">
              <span className="relative z-10 flex items-center">
                Hubungi Kami via WhatsApp
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "reverse" }}
                >
                  <MessageCircle className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white opacity-80"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown className="h-10 w-10" />
      </motion.div>
    </section>
  )
}

