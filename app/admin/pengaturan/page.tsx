"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/Admin-layout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { Label } from "@/components/ui/Label"
import { motion } from "framer-motion"
import { Bell, Globe, Shield, Database, Palette, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/UseToast"
import { saveAs } from "file-saver"
import JSZip from "jszip"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const menuItems = [
    { id: "general", label: "Umum", icon: <Globe className="h-5 w-5" /> },
    { id: "appearance", label: "Tampilan", icon: <Palette className="h-5 w-5" /> },
    { id: "notifications", label: "Notifikasi", icon: <Bell className="h-5 w-5" /> },
    { id: "security", label: "Keamanan", icon: <Shield className="h-5 w-5" /> },
    { id: "database", label: "Database", icon: <Database className="h-5 w-5" /> },
  ]

  // Function to handle database backup
  const handleBackupDatabase = async () => {
    try {
      setIsBackingUp(true)

      // Create a new JSZip instance
      const zip = new JSZip()

      // Mock database tables
      const tables = [
        { name: "users", data: [{ id: 1, name: "Admin", email: "admin@example.com" }] },
        {
          name: "projects",
          data: [
            { id: 1, name: "Kubah Masjid Al-Falah", status: "Selesai", date: "2023-03-02", budget: 125000000 },
            {
              id: 2,
              name: "Kaligrafi Masjid Nurul Iman",
              status: "Dalam Proses",
              date: "2023-03-12",
              budget: 45000000,
            },
          ],
        },
        { name: "settings", data: [{ id: 1, site_name: "Admin Dashboard", theme: "light" }] },
      ]

      // Add each table as a JSON file in the zip
      tables.forEach((table) => {
        zip.file(`${table.name}.json`, JSON.stringify(table.data, null, 2))
      })

      // Add a metadata file
      zip.file(
        "metadata.json",
        JSON.stringify(
          {
            backup_date: new Date().toISOString(),
            version: "1.0.0",
            tables: tables.map((t) => t.name),
          },
          null,
          2,
        ),
      )

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" })

      // Save the zip file
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      saveAs(content, `backup-${timestamp}.zip`)

      toast({
        title: "Backup berhasil",
        description: "Database telah berhasil dibackup",
      })
    } catch (error) {
      console.error("Backup error:", error)
      toast({
        title: "Backup gagal",
        description: "Terjadi kesalahan saat membackup database",
        variant: "destructive",
      })
    } finally {
      setIsBackingUp(false)
    }
  }

  // Function to handle database restore
  const handleRestoreDatabase = () => {
    try {
      setIsRestoring(true)

      // Create a file input element
      const fileInput = document.createElement("input")
      fileInput.type = "file"
      fileInput.accept = ".zip"

      // Handle file selection
      fileInput.onchange = async (e) => {
        const target = e.target as HTMLInputElement
        const file = target.files?.[0]
        if (!file) {
          setIsRestoring(false)
          return
        }

        try {
          // Read the zip file
          const zip = new JSZip()
          const content = await zip.loadAsync(file)

          // Check if metadata exists
          if (!content.files["metadata.json"]) {
            throw new Error("Invalid backup file: metadata.json not found")
          }

          // Process the restore (in a real app, you would restore the data to your database)
          // Here we're just simulating the process

          // Show success message
          toast({
            title: "Restore berhasil",
            description: "Database telah berhasil direstore",
          })
        } catch (error) {
          console.error("Restore error:", error)
          toast({
            title: "Restore gagal",
            description: error instanceof Error ? error.message : "Terjadi kesalahan saat merestore database",
            variant: "destructive",
          })
        } finally {
          setIsRestoring(false)
        }
      }

      // Trigger file selection
      fileInput.click()
    } catch (error) {
      console.error("Restore setup error:", error)
      setIsRestoring(false)
      toast({
        title: "Restore gagal",
        description: "Terjadi kesalahan saat menyiapkan restore",
        variant: "destructive",
      })
    }
  }

  // Function to handle database optimization
  const handleOptimizeDatabase = async () => {
    try {
      setIsOptimizing(true)

      // Simulate optimization process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Optimasi berhasil",
        description: "Database telah berhasil dioptimasi",
      })
    } catch (error) {
      console.error("Optimization error:", error)
      toast({
        title: "Optimasi gagal",
        description: "Terjadi kesalahan saat mengoptimasi database",
        variant: "destructive",
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-bold mb-6">Pengaturan Umum</h2>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Nama Website</Label>
                <input
                  id="site-name"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Website Saya"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="site-description">Deskripsi Website</Label>
                <textarea
                  id="site-description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Deskripsi website saya yang informatif dan menarik"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="site-language">Bahasa Default</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="site-language">
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Select defaultValue="asia-jakarta">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Pilih zona waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                    <SelectItem value="asia-makassar">Asia/Makassar (GMT+8)</SelectItem>
                    <SelectItem value="asia-jayapura">Asia/Jayapura (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Simpan Pengaturan</Button>
            </div>
          </motion.div>
        )
      case "appearance":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-bold mb-6">Pengaturan Tampilan</h2>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="theme">Tema</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Pilih tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Terang</SelectItem>
                    <SelectItem value="dark">Gelap</SelectItem>
                    <SelectItem value="system">Sistem</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="primary-color">Warna Utama</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Pilih warna utama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Biru</SelectItem>
                    <SelectItem value="green">Hijau</SelectItem>
                    <SelectItem value="purple">Ungu</SelectItem>
                    <SelectItem value="red">Merah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="font">Font</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font">
                    <SelectValue placeholder="Pilih font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="cursor-pointer">
                  Animasi
                </Label>
                <Switch id="animations" defaultChecked />
              </div>

              <Button className="w-full">Simpan Pengaturan</Button>
            </div>
          </motion.div>
        )
      case "notifications":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-bold mb-6">Pengaturan Notifikasi</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="cursor-pointer">
                  Notifikasi Email
                </Label>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="browser-notifications" className="cursor-pointer">
                  Notifikasi Browser
                </Label>
                <Switch id="browser-notifications" defaultChecked />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notification-frequency">Frekuensi Notifikasi</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Pilih frekuensi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Simpan Pengaturan</Button>
            </div>
          </motion.div>
        )
      case "security":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-bold mb-6">Pengaturan Keamanan</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="cursor-pointer">
                  Autentikasi Dua Faktor
                </Label>
                <Switch id="two-factor" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="session-timeout">Batas Waktu Sesi</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Pilih batas waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 menit</SelectItem>
                    <SelectItem value="60">1 jam</SelectItem>
                    <SelectItem value="120">2 jam</SelectItem>
                    <SelectItem value="240">4 jam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password-reset">Reset Password</Label>
                <Button variant="outline" className="w-full">
                  Kirim Link Reset Password
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="login-history">Riwayat Login</Label>
                <Button variant="outline" className="w-full">
                  Lihat Riwayat Login
                </Button>
              </div>

              <Button className="w-full">Simpan Pengaturan</Button>
            </div>
          </motion.div>
        )
      case "database":
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-bold mb-6">Pengaturan Database</h2>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Pilih frekuensi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="backup-retention">Retensi Backup</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="backup-retention">
                    <SelectValue placeholder="Pilih periode retensi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 hari</SelectItem>
                    <SelectItem value="30">30 hari</SelectItem>
                    <SelectItem value="90">90 hari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={handleBackupDatabase} disabled={isBackingUp}>
                  {isBackingUp ? "Sedang Membackup..." : "Backup Database Sekarang"}
                </Button>
                <Button variant="outline" className="w-full" onClick={handleRestoreDatabase} disabled={isRestoring}>
                  {isRestoring ? "Sedang Merestore..." : "Restore Database"}
                </Button>
                <Button variant="outline" className="w-full" onClick={handleOptimizeDatabase} disabled={isOptimizing}>
                  {isOptimizing ? "Sedang Mengoptimasi..." : "Optimasi Database"}
                </Button>
              </div>

              <Button className="w-full">Simpan Pengaturan</Button>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Pengaturan</h1>
            <p className="text-gray-500">Konfigurasi pengaturan website</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="material-card border-none shadow-md hover:shadow-lg transition-shadow overflow-visible">
              <CardContent className="p-0">
                <div className="py-2">
                  <h2 className="text-xl font-bold px-4 py-3">Pengaturan</h2>
                  <p className="text-gray-500 px-4 pb-3">Konfigurasi sistem</p>

                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                        activeTab === item.id ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight
                        className={`ml-auto h-5 w-5 ${activeTab === item.id ? "text-white" : "text-gray-400"}`}
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <Card className="material-card border-none shadow-md hover:shadow-lg transition-shadow lg:col-span-3">
            <CardContent className="p-6">{renderContent()}</CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

