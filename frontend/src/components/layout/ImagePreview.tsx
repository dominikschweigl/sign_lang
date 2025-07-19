"use client";

interface ImagePreviewProps {
  imageSrc: string;
}

export default function ImagePreview({ imageSrc }: ImagePreviewProps) {
  return (
    <div className="relative w-fit">
      <img src={`${imageSrc}`} alt="ML Input" className="rounded-lg w-96 aspect-square" />
    </div>
  );
}
