"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { BarChart2, Download } from 'lucide-react'
import { format } from "date-fns"
import { id } from "date-fns/locale"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"

interface DailyStat {
  tanggal: string
  pengunjung_unik: number
  total_kunjungan: number
}

interface AnalyticsData {
  dailyStats: DailyStat[]
}

interface VisitorChartProps {
  isLoading: boolean
  analyticsData: AnalyticsData | null
  timeRange: string
  setTimeRange: (value: string) => void
  chartKey: number
  onDownload: () => void
}

export function VisitorChart({
  isLoading,
  analyticsData,
  timeRange,
  setTimeRange,
  chartKey,
  onDownload,
}: VisitorChartProps) {
  // Prepare visitor chart data
  const getVisitorChartData = () => {
    if (!analyticsData?.dailyStats) return []

    return analyticsData.dailyStats.map((day: DailyStat) => ({
      date: format(new Date(day.tanggal), "dd/MM", { locale: id }),
      "Pengunjung Unik": day.pengunjung_unik,
      "Total Kunjungan": day.total_kunjungan,
    }))
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Statistik Pengunjung</CardTitle>
            <CardDescription>Statistik pengunjung website berdasarkan periode</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="yesterday">Kemarin</SelectItem>
                <SelectItem value="week">Minggu Ini</SelectItem>
                <SelectItem value="month">Bulan Ini</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={onDownload} title="Download Data">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-500">Memuat data...</p>
            </div>
          ) : analyticsData?.dailyStats?.length ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={chartKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getVisitorChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5D87FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#5D87FF" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorTotalVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#49BEFF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#49BEFF" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <Area
                        type="monotone"
                        dataKey="Pengunjung Unik"
                        stroke="#5D87FF"
                        fillOpacity={1}
                        fill="url(#colorUniqueVisitors)"
                        activeDot={{ r: 8 }}
                      />
                    </motion.g>
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <Area
                        type="monotone"
                        dataKey="Total Kunjungan"
                        stroke="#49BEFF"
                        fillOpacity={1}
                        fill="url(#colorTotalVisits)"
                        activeDot={{ r: 8 }}
                      />
                    </motion.g>
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex items-center">
              <BarChart2 className="h-16 w-16 text-gray-300" />
              <span className="ml-2 text-gray-400">Belum ada data statistik</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

