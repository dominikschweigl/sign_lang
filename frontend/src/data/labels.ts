import labels from "@/data/labels.json";
import { ASLLabel } from "@/types/prediction";

export type ImageLabel = {
  filename: string;
  label: ASLLabel;
};

export const labeledImages: ImageLabel[] = Object.entries(labels).map(
  ([filename, label]) => ({
    filename,
    label: label as ASLLabel,
  })
);

export const imageDirectory = "/test_dataset/images"