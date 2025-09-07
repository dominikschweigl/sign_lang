"use client";

interface ImagePreviewProps {
  imageSrc: string;
}

export default function ImagePreview({ imageSrc }: ImagePreviewProps) {
  return (
      <img src={`${imageSrc}`} alt="ML Input" className="rounded-lg aspect-square w-48 sm:w-64 lg:w-88" />
  );
}
