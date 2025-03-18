import { HeroClient } from "./Hero-client"

// Static data that can be rendered on the server
const slides = [
  {
    image: "/background1.webp?height=1080&width=1920",
    title: "Solusi Terbaik untuk Bisnis Anda",
    description:
      "Platform SaaS yang membantu Anda mengembangkan bisnis dengan cepat, aman, dan efisien di era digital.",
    highlight: "Bisnis Anda",
  },
  {
    image: "/background2.webp?height=1080&width=1920",
    title: "Tingkatkan Produktivitas Tim",
    description: "Optimalkan kinerja tim Anda dengan fitur kolaborasi dan manajemen proyek yang terintegrasi.",
    highlight: "Produktivitas Tim",
  },
  {
    image: "/background3.webp?height=1080&width=1920",
    title: "Analisis Data yang Mendalam",
    description: "Dapatkan wawasan berharga dari data bisnis Anda untuk pengambilan keputusan yang lebih baik.",
    highlight: "Analisis Data",
  },
]

export default function HeroSection() {
  return <HeroClient slides={slides} />
}

