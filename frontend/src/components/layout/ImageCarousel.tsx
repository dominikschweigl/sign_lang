"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ImagePreview from "./ImagePreview";

interface ImageCarouselProps {
  imageSrcs: string[];
  initial: number;
  onChange?: (index: number, imageSrc: string) => void
}

export default function ImageCarousel({ imageSrcs, initial, onChange }: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(initial);
  const [hasScrolledInitially, setHasScrolledInitially] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrent(index + 1);
      onChange?.(index, imageSrcs[index]);
    };

    api.on("select", handleSelect);
    return () => { 
      api.off("select", handleSelect);
    }
  }, [api, imageSrcs, onChange]);

  React.useEffect(() => {
    if (api && !hasScrolledInitially) {
      api.scrollTo(initial);
      setCurrent(initial + 1);
      setHasScrolledInitially(true);
      onChange?.(initial, imageSrcs[initial])
    }
  }, [api, hasScrolledInitially, initial]);

  return (
    <div className="mx-auto max-w-5xl">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className="py-3">
          {imageSrcs.map((src, index) => (
            <CarouselItem key={index} className={cn("basis-[33%]", {})}>
              <div
                className={cn("transition-transform duration-500", {
                  "scale-[0.6]": index !== current - 1,
                })}
              >
                <ImagePreview imageSrc={src} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
