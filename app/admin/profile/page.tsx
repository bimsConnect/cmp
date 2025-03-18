"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/Admin-layout"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { motion } from "framer-motion"
import { UserCircle, Mail, Lock, History, Bell, User, ChevronRight } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")

  const menuItems = [
    { id: "personal", label: "Informasi Pribadi", icon: <User className="h-5 w-5" /> },
    { id: "account", label: "Akun", icon: <Mail className="h-5 w-5" /> },
    { id: "password", label: "Password", icon: <Lock className="h-5 w-5" /> },
    { id: "activity", label: "Aktivitas", icon: <History className="h-5 w-5" /> },
    { id: "notifications", label: "Notifikasi", icon: <Bell className="h-5 w-5" /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6">Informasi Pribadi</h2>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Nama Lengkap</Label>
                <input
                  id="full-name"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Admin"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="display-name">Nama Tampilan</Label>
                <input
                  id="display-name"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Admin"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ceritakan sedikit tentang diri Anda"
                />
              </div>

              <Button className="w-full">Simpan Perubahan</Button>
            </div>
          </motion.div>
        )
      case "account":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6">Informasi Akun</h2>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="admin@example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <input
                  id="username"
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="admin"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <input
                  id="phone"
                  type="tel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <Button className="w-full">Simpan Perubahan</Button>
            </div>
          </motion.div>
        )
      case "password":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6">Ubah Password</h2>
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <input
                  id="current-password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Masukkan password saat ini"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <input
                  id="new-password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Masukkan password baru"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                <input
                  id="confirm-password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Konfirmasi password baru"
                />
              </div>

              <Button className="w-full">Ubah Password</Button>
            </div>
          </motion.div>
        )
      case "activity":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6">Riwayat Aktivitas</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start border-b border-gray-100 pb-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Login berhasil</p>
                    <p className="text-sm text-gray-500">IP: 192.168.1.{i} • Browser: Chrome • OS: Windows</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(Date.now() - i * 86400000).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                Lihat Semua Aktivitas
              </Button>
            </div>
          </motion.div>
        )
      case "notifications":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold mb-6">Preferensi Notifikasi</h2>
            <div className="space-y-6">
              {["Login Baru", "Komentar Baru", "Testimonial Baru", "Update Sistem", "Newsletter"].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="font-medium">{item}</p>
                    <p className="text-sm text-gray-500">Dapatkan notifikasi saat ada {item.toLowerCase()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`notify-${item}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <Label htmlFor={`notify-${item}`} className="sr-only">
                      {item}
                    </Label>
                  </div>
                </div>
              ))}

              <Button className="w-full">Simpan Preferensi</Button>
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
            <h1 className="text-2xl font-bold">Profil</h1>
            <p className="text-gray-500">Kelola informasi profil Anda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="material-card border-none shadow-md hover:shadow-lg transition-shadow overflow-visible">
              <CardContent className="p-0">
                <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 relative">
                    <UserCircle className="w-20 h-20 text-gray-400" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-white shadow-md hover:bg-gray-100"
                      title="Ubah foto profil"
                    >
                      <UserCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium text-xl">Admin</h3>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                  <p className="text-xs text-gray-400 mt-1">Bergabung sejak 1 Jan 2023</p>
                </div>

                <div className="py-2">
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

