"use client";

import Image from "next/image";

interface ImagePreviewProps {
  imageSrc: string;
}

export default function ImagePreview({ imageSrc }: ImagePreviewProps) {
  return (
  <div className="relative rounded-lg aspect-square w-48 sm:w-64 lg:w-88">
    <Image
      src={imageSrc}
      alt="ML Input"
      fill
      className="rounded-lg object-cover" 
      sizes="(max-width: 640px) 12rem, (max-width: 1024px) 16rem, 22rem"
    />
  </div>
  );
}
