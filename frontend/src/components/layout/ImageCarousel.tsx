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
import { Card, CardContent } from "../ui/card";
import ImagePreview from "./ImagePreview";

interface ImageCarouselProps {
  imageSrcs: string[];
  initial: number;
  onChange?: (index: number, imageSrc: string) => void;
  orientation: "horizontal" | "vertical" | undefined
}

export default function ImageCarousel({ imageSrcs, initial, onChange, orientation }: ImageCarouselProps) {
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
    orientation === "vertical" ?
    <Carousel className="w-full max-w-[calc(100%-60px)]" setApi={setApi} opts={{loop: true, align:"center"}} orientation="vertical">
      <CarouselContent className="h-[480px] cursor-grab">
            {imageSrcs.map((src, index) => (
             
            <CarouselItem key={index} className="flex items-center justify-center">
              <div
                className={cn("transition-transform duration-500 flex justify-center items-center", {
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
    :
    <Carousel className="w-full max-w-[calc(100%-60px)]" setApi={setApi} opts={{loop: true}} orientation="horizontal">
      <CarouselContent className="max-w-full pl-4">
            {imageSrcs.map((src, index) => (
            <CarouselItem key={index} className="flex items-center justify-center">
              <div
                className={cn("transition-transform duration-500 flex justify-center items-center", {
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
  );
}
