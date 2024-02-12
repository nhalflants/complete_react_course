/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*")
  if (error) {
    throw new Error("Cabins could not be loaded")
  }
  return cabins
}

export async function createEditCabin(cabin, cabinId) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "")
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  // https://sacgjdxwbandaxeskifz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("cabins")

  // Create cabin
  if (!cabinId) query = query.insert([{ ...cabin, image: imagePath }])
  else query = query.update({ ...cabin, image: imagePath }).eq("id", cabinId)

  const { data, error } = await query.select().single()

  if (error) {
    throw new Error("Cabins could not be created")
  }

  // Upload cabin image to bucket storage of there is no image path yet
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image)

    // Delete cabin if there is an error uploading cabin image
    if (storageError) {
      deleteCabin(data.id)
      throw new Error("Error uploading cabin image")
    }
  }

  return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id)
  if (error) {
    throw new Error("Cabins could not be deleted")
  }
  return data
}
