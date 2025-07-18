import type { ASLLabel, Prediction } from "@/types/prediction";

const BACKEND_URL: string = "http://localhost:5000/predict";

export async function classify(file: File): Promise<Prediction[]> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(BACKEND_URL, {
    method: "POST",
    body: formData,
  });
  const data: Prediction[] = await res.json();

  return data;
}
