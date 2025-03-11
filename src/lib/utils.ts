import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uploadImageToImgBB = async (file) => {
  const apiKey = "4e40960ee867d0115a4c0049f45f4572"; // Replace with your actual API key
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url; // Get the image URL
    } else {
      console.error("Upload failed:", data.error);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

