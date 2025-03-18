"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import AdminLayout from "@/components/admin/Admin-layout"
import { Button } from "@/components/ui/Button"
import { Eye, RefreshCw, TrendingUp, Landmark, FileSpreadsheet, Download } from "lucide-react"
import { format, subDays } from "date-fns"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { exportToExcel } from "@/lib/ExcelExport"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { VisitorChart } from "@/components/dashboard/VisitorChart"
import { PopularPages } from "@/components/dashboard/PopularPages"
import { ProjectCategories } from "@/components/dashboard/ProjectCategories"
import { RecentProjects } from "@/components/dashboard/RecentProject"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { ProjectChart } from "@/components/dashboard/ProjectChart"
import { ProductCategories } from "@/components/dashboard/ProductCategories"

interface AnalyticsData {
  uniqueVisitors: number
  totalVisits: number
  topPages: Array<{ halaman: string; visits: number }>
  activeVisitors: number
  hourlyStats: Array<{ hour: number; visits: number }>
  dailyStats: Array<{ tanggal: string; pengunjung_unik: number; total_kunjungan: number }>
}

interface RealTimeData {
  activeVisitors: number
  todayVisits: number
  uniqueVisitors: number
  timestamp: string
}

interface Activity {
  id: number
  type: "blog" | "testimonial" | "gallery" | "project"
  title: string
  status?: string
  date: string
  image?: string
}

export default function AdminDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")
  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const [chartKey, setChartKey] = useState(0) // For chart animation
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>("")
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(15)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch analytics data
  const fetchAnalyticsData = useCallback(async () => {
    try {
      setIsRefreshing(true)
      setIsLoading(true)

      // Fetch data from the API
      const response = await fetch(`/api/analitik?period=${timeRange}`)
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data")
      }

      const data = await response.json()
      setAnalyticsData(data)
      setChartKey((prev) => prev + 1) // Trigger chart animation

      // Update last refreshed time
      setLastRefreshedTime(format(new Date(), "HH:mm:ss"))
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setIsRefreshing(false)
      setIsLoading(false)
    }
  }, [timeRange])

  // Fetch recent activities
  const fetchRecentActivities = async () => {
    try {
      // Mock data
      const activities: Activity[] = [
        {
          id: 1,
          type: "project",
          title: "Pembangunan Kubah Masjid Al-Ikhlas",
          date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
          image: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 2,
          type: "testimonial",
          title: "Takmir Masjid Ar-Rahman",
          status: "disetujui",
          date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
          image: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 3,
          type: "gallery",
          title: "Ornamen Kaligrafi Masjid Besar",
          date: format(subDays(new Date(), 3), "yyyy-MM-dd"),
          image: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 4,
          type: "blog",
          title: "Tips Perawatan Kubah Masjid",
          date: format(subDays(new Date(), 4), "yyyy-MM-dd"),
          image: "/placeholder.svg?height=40&width=40",
        },
        {
          id: 5,
          type: "project",
          title: "Pembuatan Kaligrafi Masjid Nurul Iman",
          status: "dalam proses",
          date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
          image: "/placeholder.svg?height=40&width=40",
        },
      ]

      setRecentActivities(activities)
    } catch (fetchError) {
      console.error("Error fetching recent activities:", fetchError)
    }
  }

  // Setup real-time data
  const setupRealTimeData = async () => {
    try {
      const response = await fetch("/api/analitik/stream")
      if (!response.ok) {
        throw new Error("Failed to fetch real-time data")
      }

      const data = await response.json()
      setRealTimeData(data)
    } catch (fetchError) {
      console.error("Error fetching real-time data:", fetchError)
    }
  }

  // Refresh timer
  const refresh = useCallback(async () => {
    try {
      await fetchAnalyticsData()
      await fetchRecentActivities()
      await setupRealTimeData()

      // Perbarui waktu terakhir refresh
      setLastRefreshedTime(format(new Date(), "HH:mm:ss"))
      setTimeUntilRefresh(15) // Reset timer setiap refresh
    } catch (fetchError) {
      console.error("Error refreshing data:", fetchError)
    }
  }, [fetchAnalyticsData])

  useEffect(() => {
    // Timer untuk auto-refresh
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current)
    }

    refreshTimerRef.current = setInterval(() => {
      setTimeUntilRefresh((prev) => {
        if (prev <= 1) {
          refresh()
          return 15
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current)
      }
    }
  }, [refresh])

  // Jalankan saat pertama kali halaman dimuat
  useEffect(() => {
    const initData = async () => {
      await refresh()
    }

    initData()
  }, [refresh])

  // Mock project data
  const projectData = [
    { name: "Jan", projects: 4 },
    { name: "Feb", projects: 3 },
    { name: "Mar", projects: 5 },
    { name: "Apr", projects: 4 },
    { name: "May", projects: 6 },
    { name: "Jun", projects: 5 },
    { name: "Jul", projects: 7 },
    { name: "Aug", projects: 6 },
    { name: "Sep", projects: 8 },
    { name: "Oct", projects: 7 },
    { name: "Nov", projects: 9 },
    { name: "Dec", projects: 8 },
  ]

  // Mock product performance data
  const projectPerformance = [
    { id: 1, name: "Kubah Masjid Al-Falah", status: "Selesai", date: "2 Mar 2023", budget: "Rp 125.000.000" },
    {
      id: 2,
      name: "Kaligrafi Masjid Nurul Iman",
      status: "Dalam Proses",
      date: "12 Mar 2023",
      budget: "Rp 45.000.000",
    },
    {
      id: 3,
      name: "Ornamen Mihrab Masjid Besar",
      status: "Dalam Proses",
      date: "18 Mar 2023",
      budget: "Rp 67.500.000",
    },
    { id: 4, name: "Kubah Masjid Ar-Rahman", status: "Selesai", date: "22 Mar 2023", budget: "Rp 135.000.000" },
    { id: 5, name: "Awan Masjid Al-Ikhlas", status: "Menunggu", date: "27 Mar 2023", budget: "Rp 55.000.000" },
  ]

  // Function to download data as Excel
  const downloadExcel = (dataType: string) => {
    try {
      let data: Record<string, string | number>[] = []
      let filename = ""
      let sheetName = ""

      switch (dataType) {
        case "visitors":
          data = (analyticsData?.dailyStats.map((day) => ({
            Tanggal: format(new Date(day.tanggal), "dd/MM/yyyy"),
            "Pengunjung Unik": day.pengunjung_unik,
            "Total Kunjungan": day.total_kunjungan,
          })) || []) as Record<string, string | number>[]
          filename = `statistik-pengunjung`
          sheetName = "Statistik Pengunjung"
          break


          case "pages":
            data = (analyticsData?.topPages.map((page) => ({
              Halaman: page.halaman === "/" ? "Beranda" : page.halaman,
              Kunjungan: page.visits,
            })) || []) as Record<string, string | number>[]
            filename = `halaman-populer`
            sheetName = "Halaman Populer"
            break

            case "projects":
              data = projectPerformance.map((project) => ({
                "Nama Proyek": project.name,
                Status: project.status,
                Tanggal: project.date,
                Anggaran: project.budget,
              })) as Record<string, string | number>[]
              filename = `proyek`
              sheetName = "Data Proyek"
              break

        default:
          return
      }

      // Use our new Excel export utility
      exportToExcel(data, sheetName, filename)
    } catch (fetchError) {
      console.error("Error downloading Excel:", fetchError)
    }
  }
  

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Selamat datang kembali, Admin</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2 items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Diperbarui: {lastRefreshedTime}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">(Refresh dalam {timeUntilRefresh}s)</span>
            <Button
              variant="outline"
              size="icon"
              onClick={refresh}
              className="ml-2"
              title="Perbarui data"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" title="Download Laporan">
                  <FileSpreadsheet className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => downloadExcel("visitors")}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Statistik Pengunjung</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadExcel("pages")}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Halaman Populer</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadExcel("projects")}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Data Proyek</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Pengunjung Real-time"
            value={realTimeData?.activeVisitors || 0}
            icon={<Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            change={{ value: "+12.5% dari kemarin", positive: true }}
            progressColor="primary"
            progressValue={75}
            delay={0}
          />

          <StatsCard
            title="Total Kunjungan Hari Ini"
            value={12}
            icon={<TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            change={{ value: "+3 dari bulan lalu", positive: true }}
            progressColor="[#13DEB9]"
            progressValue={55}
            delay={0.1}
          />

          <StatsCard
            title="Permintaan Baru"
            value={8}
            icon={<Landmark className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            change={{ value: "-2 dari bulan lalu", positive: false }}
            progressColor="[#FFAE1F]"
            progressValue={45}
            delay={0.3}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Visitor Statistics */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <VisitorChart
              isLoading={isLoading}
              analyticsData={analyticsData}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              chartKey={chartKey}
              onDownload={() => downloadExcel("visitors")}
            />
          </motion.div>

          {/* Right Column - Popular Pages */}
          <PopularPages
            isLoading={isLoading}
            analyticsData={analyticsData}
            chartKey={chartKey}
            onDownload={() => downloadExcel("pages")}
          />
        </div>

        {/* Project Categories & Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Categories */}
          <ProjectCategories />

          {/* Recent Projects */}
          <RecentProjects projectPerformance={projectPerformance} onDownload={() => downloadExcel("projects")} />
        </div>

        {/* Recent Activity & Project Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <RecentActivity recentActivities={recentActivities} />

          {/* Project Chart */}
          <ProjectChart projectData={projectData} />
        </div>

        {/* Product Categories */}
        <ProductCategories />
      </div>
    </AdminLayout>
  )
}

