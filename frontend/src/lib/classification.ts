import type { ASLLabel, Prediction } from "@/types/prediction";

const BACKEND_URL: string = "http://localhost:8000/predict";

export async function classify(file: File): Promise<Prediction[]> {
  const formData = new FormData();
  formData.append("file", file);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          .split("")
          .map((c) => ({ label: c as ASLLabel, confidence: Math.random() }))
      );
    }, 500);
  });

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   const res = await fetch(BACKEND_URL, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data: Classification = await res.json();

  //   return data;
}
