import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Gallery from "@/components/Gallery"
import BlogSection from "@/components/Blog"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cipta Mandiri Perkasa - Spesialis Kubah GRC & Ornamen Masjid",
  description:
    "Cipta Mandiri Perkasa adalah spesialis pembuatan kubah GRC, ornamen, masjid, kerawangan, menara, dan motif awan kaligrafi dengan pengalaman lebih dari 15 tahun.",
  keywords: "kubah GRC, ornamen masjid, pembuatan masjid, kerawangan, menara masjid, awan kaligrafi",
  openGraph: {
    title: "Cipta Mandiri Perkasa - Spesialis Kubah GRC & Ornamen Masjid",
    description:
      "Spesialis pembuatan kubah GRC, ornamen, masjid, kerawangan, menara, dan motif awan kaligrafi dengan pengalaman lebih dari 15 tahun.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cipta Mandiri Perkasa",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <BlogSection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}

