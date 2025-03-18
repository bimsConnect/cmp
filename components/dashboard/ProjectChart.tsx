"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

interface ProjectChartProps {
  projectData: Array<{ name: string; projects: number }>
}

export function ProjectChart({ projectData }: ProjectChartProps) {
  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Proyek Tahunan</CardTitle>
          <CardDescription>Statistik proyek sepanjang tahun</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#5D87FF" radius={[4, 4, 0, 0]}>
                  {projectData.map((entry, index) => (
                    <motion.g
                      key={`bar-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.5 }}
                    >
                      <Cell key={`cell-${index}`} fill="#5D87FF" />
                    </motion.g>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

