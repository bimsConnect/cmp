"use client"

import type React from "react"
import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.")
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Alamat",
      details: "Jl. Sudirman No. 123, Jakarta Pusat, 10220",
    },
    {
      icon: <Phone className="h-6 w-6 text-secondary" />,
      title: "Telepon",
      details: "+62 21 1234 5678",
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: "info@brickproperty.com",
    },
    {
      icon: <Clock className="h-6 w-6 text-secondary" />,
      title: "Jam Operasional",
      details: "Senin - Jumat: 09:00 - 17:00",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Hubungi Kami
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
            Hubungi kami untuk konsultasi gratis atau informasi lebih lanjut
          </motion.p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-xl p-8 flex flex-col"
          >
            <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-t-xl mb-6" />
            <h3 className="text-2xl font-semibold mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <Input id="name" name="name" placeholder="Masukkan nama lengkap" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="Masukkan email" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Pesan
                </label>
                <Textarea id="message" name="message" placeholder="Masukkan pesan Anda" rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                <Send className="mr-2 h-4 w-4" /> Kirim Pesan
              </Button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-xl p-8 flex flex-col"
          >
            <div className="h-1 w-full bg-gradient-to-r from-secondary to-primary rounded-t-xl mb-6" />
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-white shadow-sm">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{info.title}</h4>
                      <p className="text-gray-600 text-sm">{info.details}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Section */}
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold mb-6">Lokasi Kami</h3>
              <div className="rounded-xl overflow-hidden bg-gray-50 shadow-md h-full">
                <div className="relative w-full h-[250px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2925248538536!2d107.11352067316736!3d-6.225107560963205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69854f9b8a9187%3A0x639e660cbd4dacdf!2sCv.%20Cipta%20Mandiri%20Perkasa!5e0!3m2!1sid!2sid!4v1741856984494!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: "0", borderRadius: "10px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4 flex justify-center gap-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=-6.225107560963205,107.11352067316736"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary/90 transition-all duration-300"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Dapatkan Rute</span>
                  </a>
                  <a
                    href="https://www.google.com/maps/place/Cv.+Cipta+Mandiri+Perkasa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-700 transition-all duration-300"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Buka Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}