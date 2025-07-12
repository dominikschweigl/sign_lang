import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function loadPublicImageAsFile(path: string): Promise<File> {
  const res = await fetch(path);
  const blob = await res.blob();
  const name = path.split("/").pop() ?? "image.jpg";
  return new File([blob], name, { type: blob.type });
}
