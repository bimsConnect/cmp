"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  change: {
    value: string
    positive: boolean
  }
  progressColor: string
  progressValue: number
  delay?: number
}

export function StatsCard({ title, value, icon, change, progressColor, progressValue, delay = 0 }: StatsCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center pt-1 text-xs ${change.positive ? "text-green-500" : "text-red-500"}`}>
            {change.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <span>{change.value}</span>
          </div>
        </CardContent>
        <div className={`bg-${progressColor}/10 h-1`}>
          <div className={`bg-${progressColor} h-1`} style={{ width: `${progressValue}%` }}></div>
        </div>
      </Card>
    </motion.div>
  )
}

