"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Download } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectData {
  id: number
  name: string
  status: string
  date: string
  budget: string
}

interface RecentProjectsProps {
  projectPerformance: ProjectData[]
  onDownload: () => void
}

export function RecentProjects({ projectPerformance, onDownload }: RecentProjectsProps) {
  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Proyek Terbaru</CardTitle>
            <Button variant="outline" size="icon" onClick={onDownload} title="Download Data">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Nama Proyek</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Tanggal</th>
                  <th className="text-left p-4 font-medium text-gray-500 dark:text-gray-400">Anggaran</th>
                </tr>
              </thead>
              <tbody>
                {projectPerformance.map((project) => (
                  <tr key={project.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4">{project.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.status === "Selesai"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : project.status === "Dalam Proses"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{project.date}</td>
                    <td className="p-4 font-medium">{project.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

