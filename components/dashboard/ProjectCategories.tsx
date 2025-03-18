"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { ChurchIcon as Mosque } from "lucide-react"
import { motion } from "framer-motion"

export function ProjectCategories() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Kategori Proyek</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-3xl font-bold">35</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total proyek aktif</p>
            </div>
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mosque className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Kubah Masjid</span>
                <span className="text-sm font-medium">15 Proyek</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Kaligrafi</span>
                <span className="text-sm font-medium">8 Proyek</span>
              </div>
              <Progress value={23} className="h-2 bg-[#49BEFF]/20" indicatorClassName="bg-[#49BEFF]" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Ornamen</span>
                <span className="text-sm font-medium">7 Proyek</span>
              </div>
              <Progress value={20} className="h-2 bg-[#13DEB9]/20" indicatorClassName="bg-[#13DEB9]" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Awan</span>
                <span className="text-sm font-medium">5 Proyek</span>
              </div>
              <Progress value={15} className="h-2 bg-[#FFAE1F]/20" indicatorClassName="bg-[#FFAE1F]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

