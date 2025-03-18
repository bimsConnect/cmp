import { AboutClient } from "./About-client"

// Static data that can be rendered on the server
const features = [
  {
    icon: "Home",
    title: "Properti Berkualitas",
    description: "Kami hanya menawarkan properti dengan kualitas terbaik dan lokasi strategis.",
  },
  {
    icon: "Award",
    title: "Terpercaya",
    description: "Lebih dari 10 tahun pengalaman dalam industri properti dengan ribuan klien puas.",
  },
  {
    icon: "Users",
    title: "Tim Profesional",
    description: "Tim kami terdiri dari para profesional berpengalaman yang siap membantu Anda.",
  },
]

const benefits = [
  "Properti berkualitas dengan lokasi strategis",
  "Proses pembelian yang mudah dan transparan",
  "Dukungan penuh dari tim profesional kami",
  "Harga kompetitif dengan nilai investasi tinggi",
  "Layanan purna jual yang memuaskan",
]

export default function About() {
  return <AboutClient features={features} benefits={benefits} />
}

