"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Clock, FileText, ImageIcon, MessageSquare } from "lucide-react"
import { ChurchIcon as Mosque } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface RecentActivity {
  id: number
  type: "blog" | "testimonial" | "gallery" | "project"
  title: string
  status?: string
  date: string
  image?: string
}

interface RecentActivityProps {
  recentActivities: RecentActivity[]
}

export function RecentActivity({ recentActivities }: RecentActivityProps) {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: id })
    } catch {
      return dateString
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex items-start p-4 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      activity.type === "blog"
                        ? "bg-blue-100 text-primary dark:bg-blue-900/30"
                        : activity.type === "testimonial"
                          ? "bg-yellow-100 text-amber-600 dark:bg-yellow-900/30"
                          : activity.type === "project"
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30"
                            : "bg-green-100 text-green-600 dark:bg-green-900/30"
                    }`}
                  >
                    {activity.type === "blog" ? (
                      <FileText className="h-5 w-5" />
                    ) : activity.type === "testimonial" ? (
                      <MessageSquare className="h-5 w-5" />
                    ) : activity.type === "project" ? (
                      <Mosque className="h-5 w-5" />
                    ) : (
                      <ImageIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {activity.type === "blog"
                        ? "Blog baru ditambahkan"
                        : activity.type === "testimonial"
                          ? `Testimonial ${activity.status === "disetujui" ? "disetujui" : activity.status === "ditolak" ? "ditolak" : "menunggu persetujuan"}`
                          : activity.type === "project"
                            ? `Proyek ${activity.status === "dalam proses" ? "dimulai" : "baru"}`
                            : "Galeri baru ditambahkan"}
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-0.5">{activity.title}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{formatDate(activity.date)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">Belum ada aktivitas terbaru</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

