import { NavbarClient } from "./Navbar-client"

// Static data that can be rendered on the server
const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/#about" },
  { name: "Galeri", href: "/gallery" },
  { name: "Blog", href: "/#blog" },
  { name: "Testimoni", href: "/#testimonials" },
  { name: "Kontak", href: "/#contact" },
]

export default function Navbar() {
  return <NavbarClient navLinks={navLinks} />
}

