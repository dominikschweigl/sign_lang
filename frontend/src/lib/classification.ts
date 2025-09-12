import type { Prediction } from "@/types/prediction";
import predictions from "@/data/predictions.json"
import path from "path"

export async function classify(filepath: string): Promise<Prediction[]> {
  const filename = path.basename(filepath)

  const waitDuration = Math.random() * 300 + 300
  await new Promise((resolve) => setTimeout(resolve, waitDuration))
  
  // @ts-expect-error filename is guaranteed to be contained in predictions
  const data = predictions[filename] 

  return data;
}
