"use client"

import { MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useScrollPosition } from "@/components/hooks/UseScrollPostion"

export function WhatsAppButton() {
  const isInHeroSection = useScrollPosition()

  return (
    <AnimatePresence>
      {!isInHeroSection && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="https://wa.me/6285218729008?text=Halo%20Cipta%20Mandiri%20Perkasa%2C%20saya%20tertarik%20untuk%20berkonsultasi%20tentang%20layanan%20Anda."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Chat dengan kami di WhatsApp"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}