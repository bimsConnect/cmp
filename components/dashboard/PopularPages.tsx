"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Download } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { motion, AnimatePresence } from "framer-motion"

interface TopPage {
  halaman: string
  visits: number
}

interface AnalyticsData {
  topPages: TopPage[]
}

interface PopularPagesProps {
  isLoading: boolean
  analyticsData: AnalyticsData | null
  chartKey: number
  onDownload: () => void
}

export function PopularPages({ isLoading, analyticsData, chartKey, onDownload }: PopularPagesProps) {
  // Colors for charts
  const COLORS = ["#5D87FF", "#49BEFF", "#13DEB9", "#FFAE1F", "#FA896B"]

  // Prepare pie chart data
  const getTopPagesData = () => {
    if (!analyticsData?.topPages) return []

    return analyticsData.topPages.slice(0, 5).map((page: TopPage) => ({
      name:
        page.halaman === "/"
          ? "Beranda"
          : page.halaman.length > 15
            ? page.halaman.substring(0, 12) + "..."
            : page.halaman.replace("/", ""),
      value: page.visits,
    }))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Halaman Terpopuler</CardTitle>
            <CardDescription>Halaman yang paling banyak dikunjungi</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={onDownload} title="Download Data">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-500">Memuat data...</p>
            </div>
          ) : analyticsData?.topPages?.length ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={chartKey}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getTopPagesData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1500}
                      animationBegin={0}
                    >
                      {getTopPagesData().map((entry, index) => (
                        <motion.g
                          key={`cell-${index}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 * index, duration: 0.5 }}
                        >
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        </motion.g>
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-2 text-gray-500">Belum ada data halaman terpopuler</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

