import { createClient } from "@supabase/supabase-js"

// Pastikan environment variables tersedia
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Buat Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fungsi untuk upload gambar ke Supabase Storage
export async function uploadImage(file: File, bucket = "uploads", folder = "users") {
  try {
    if (!file) throw new Error("File tidak ditemukan.")
    if (!bucket) throw new Error("Bucket tidak boleh kosong.")
    if (!folder) throw new Error("Folder tidak boleh kosong.")

    console.log("Uploading file:", file.name, "to bucket:", bucket, "folder:", folder)

    // Buat nama file unik dengan timestamp
    const fileExt = file.name.split(".").pop()
    const fileName = `${folder}/${Date.now()}.${fileExt}`

    // Upload file ke Supabase Storage
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Supabase upload error:", error.message)
      throw new Error(error.message)
    }

    console.log("Upload berhasil:", data)

    // Dapatkan URL publik
    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName)

    console.log("Public URL:", publicUrlData.publicUrl)

    return publicUrlData.publicUrl
  } catch (err) {
    console.error("Error uploading image:", err)
    throw err
  }
}