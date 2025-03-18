import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import AnalyticsTracker from "@/components/AnalyticsTracker"

const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  metadataBase: new URL("https://ciptamandiriperkasa-c9ap.vercel.app"),
  title: "Cipta Mandiri Perkasa",
  description: "Deskripsi website kamu",
  openGraph: {
    title: "Cipta Mandiri Perkasa",
    description: "Deskripsi website kamu",
    url: "https://ciptamandiriperkasa-c9ap.vercel.app",
    siteName: "Cipta Mandiri Perkasa",
    type: "website",
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://ciptamandiriperkasa-c9ap.vercel.app" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <AnalyticsTracker />
        </ThemeProvider>
      </body>
    </html>
  )
}

