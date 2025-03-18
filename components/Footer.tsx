import { FooterClient } from "./Footer-client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return <FooterClient currentYear={currentYear} />
}

