"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ChurchIcon as Mosque, Cloud, Compass, PenTool } from "lucide-react"
import { motion } from "framer-motion"

export function ProductCategories() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Produk Unggulan</CardTitle>
          <CardDescription>Produk-produk unggulan perusahaan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-primary/5 border-none">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Mosque className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Kubah Masjid</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Berbagai ukuran dan desain</p>
              </CardContent>
            </Card>

            <Card className="bg-[#49BEFF]/5 border-none">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#49BEFF]/10 flex items-center justify-center mb-3">
                  <PenTool className="h-6 w-6 text-[#49BEFF]" />
                </div>
                <h3 className="font-medium">Kaligrafi</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kaligrafi indah untuk masjid</p>
              </CardContent>
            </Card>

            <Card className="bg-[#13DEB9]/5 border-none">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#13DEB9]/10 flex items-center justify-center mb-3">
                  <Cloud className="h-6 w-6 text-[#13DEB9]" />
                </div>
                <h3 className="font-medium">Awan Masjid</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ornamen awan untuk langit-langit</p>
              </CardContent>
            </Card>

            <Card className="bg-[#FFAE1F]/5 border-none">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[#FFAE1F]/10 flex items-center justify-center mb-3">
                  <Compass className="h-6 w-6 text-[#FFAE1F]" />
                </div>
                <h3 className="font-medium">Ornamen</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ornamen dekoratif untuk masjid</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

