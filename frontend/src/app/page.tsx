"use client";

import ImageCarousel from "@/components/layout/ImageCarousel";
import { PredictionBarChart } from "@/components/layout/PredictionBarChart";
import PredictionCard from "@/components/layout/PredictionCard";
import { Button } from "@/components/ui/button";
import { classify } from "@/lib/classification";
import { cn, loadPublicImageAsFile } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { GitFork, Loader2 } from "lucide-react";
import type { Prediction, ASLLabel } from "@/types/prediction";
import { useCallback, useEffect, useState } from "react";
import { ImageLabel, labeledImages, imageDirectory } from "@/data/labels"



export default function Home() {
  const [chartData, setChartData] = useState<Prediction[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [isClassifying, setIsClassifying] = useState<boolean>(false);
  const [images, setImages] = useState<ImageLabel[]>([])

  const prediction = (chartData.length != 0 && chartData.reduce((prev, cur) => (cur.confidence > prev.confidence ? cur : prev))) || 
              {
                label: "-",
                confidence: 0,
              }

  const predict = useCallback(async (image: string) => {
    setIsClassifying(true)
    setChartData([])
    try {
      const classification = await classify(await loadPublicImageAsFile(`${image}`));
      setChartData(classification)
    } catch {
      setChartData([])
      setIsClassifying(false)
    }
    setIsClassifying(false)
  }, [setChartData, setIsClassifying])

  useEffect(() => {
    const randomImages =  labeledImages.toSorted(() => Math.random() - 0.5);
    setImages(randomImages.slice(0,50));
  }, []);

  return (
    <>
      <div className="-z-1 absolute bg-linear-to-b from-transparent from-0% to-gray-50 to-20% w-full h-[calc(100%-var(--spacing)*40)] top-40 left-0"></div>
      <div className="p-8 pb-8 sm:p-20 sm:px-10 lg:px-20 pt-28 sm:pt-40 font-[family-name:var(--font-geist-sans)]">
          <HorizontalLayout classname="hidden md:flex" images={images} isClassifying={isClassifying} selectedImage={selectedImage} prediction={prediction} chartData={chartData} predict={predict} setSelectedImage={setSelectedImage} />
          <VerticalLayout classname="md:hidden" images={images} isClassifying={isClassifying} selectedImage={selectedImage} prediction={prediction} chartData={chartData} predict={predict} setSelectedImage={setSelectedImage}/>
      </div>
    </>
  );
}


interface LayoutProps {
  images: ImageLabel[],
  isClassifying: boolean,
  selectedImage: string | undefined,
  prediction: Prediction,
  chartData: Prediction[],
  predict: (image: string) => Promise<void>,
  setSelectedImage: (image: string) => void,
  classname: string | undefined
}

const HorizontalLayout = ({images, isClassifying, selectedImage, prediction, chartData, predict, setSelectedImage, classname}: LayoutProps) => {
  return <>
    <main className={cn("flex gap-8 md:gap-12 lg:gap-20 row-start-2 items-center w-full ", classname)}>
        <div className="flex flex-col gap-4">
          <PredictionCard
            prediction={prediction}
            trueLabel={selectedImage && labeledImages.find(i => selectedImage.endsWith(i.filename))?.label || "-" as ASLLabel}
            className="w-full md:w-[280px] lg:w-[350px] xl:w-[440px]"
          />
          <PredictionBarChart
            predictions={[...chartData].sort((a, b) => b.confidence - a.confidence).slice(0, 3)}
            className="grow gap-4 md:gap-6"
          />
        </div>

        <div className="relative h-full items-center flex flex-col">
          <Button
            className="w-16 h-32 items-center justify-center z-1 disabled:bg-gray-400 disabled:opacity-100"
            color="black"
            disabled={isClassifying}
            onClick={() => selectedImage && predict(selectedImage)}
          >
            {
              isClassifying ? <Loader2 className="animate-spin size-5.5 md:size-7" /> :
              <GitFork className="text-white size-5.5 md:size-7 rotate-90" />
            }
          </Button>
          <Separator className="absolute h-[520px] w-px bg-gray-300 z-0 top-1/2 -translate-1/2" orientation="vertical" />
        </div>
        
        <ImageCarousel orientation="vertical" imageSrcs={images.map(i => `${imageDirectory}/${i.filename}`)} initial={0} onChange={(_,image) => {setSelectedImage(image); predict(image)}}/>
        
      </main>
  </>
}

const VerticalLayout = ({images, isClassifying, selectedImage, prediction, chartData, predict, setSelectedImage, classname}: LayoutProps) => {
  return <>
    <main className={cn("flex flex-col gap-12 md:gap-20 row-start-2 items-center w-full ", classname)}>
        <ImageCarousel orientation="horizontal" imageSrcs={images.map(i => `${imageDirectory}/${i.filename}`)} initial={0} onChange={(_,image) => {setSelectedImage(image); predict(image)}}/>
        <div className="relative w-full items-center flex flex-col">
          <Button
            className="w-28 md:w-40 h-14 md:h-[78px] items-center justify-center z-1 disabled:bg-gray-400 disabled:opacity-100"
            color="black"
            disabled={isClassifying}
            onClick={() => selectedImage && predict(selectedImage)}
          >
            {
              isClassifying ? <Loader2 className="animate-spin size-5.5 md:size-7" /> :
              <GitFork className="text-white size-5.5 md:size-7" />
            }
          </Button>
          <Separator className="absolute w-full h-px bg-gray-200 top-[50%] z-0" orientation="horizontal" />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <PredictionCard
            prediction={prediction}
            trueLabel={selectedImage && labeledImages.find(i => selectedImage.endsWith(i.filename))?.label || "-" as ASLLabel}
            className="w-full md:w-[280px] lg:w-[350px]"
          />
          <PredictionBarChart
            predictions={[...chartData].sort((a, b) => b.confidence - a.confidence).slice(0, 3)}
            className="grow gap-4 md:gap-6"
          />
        </div>
      </main>
  </>
}