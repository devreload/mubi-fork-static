import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DBImageSizes } from "@/lib/models/dbimage"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaImage(size: DBImageSizes, path?: string) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
