"use client";

import ImageCarousel from "@/components/layout/ImageCarousel";
import { PredictionBarChart } from "@/components/layout/PredictionBarChart";
import PredictionCard from "@/components/layout/PredictionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { classify } from "@/lib/classification";
import { loadPublicImageAsFile } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { CircleQuestionMark, GitFork } from "lucide-react";
import type { Prediction, ASLLabel } from "@/types/prediction";
import { useEffect, useState } from "react";

const images = [
  "AAEQVXISIYUSPAZJ.jpg",
  "AAEQVXISIYUSPAZJ_flipped_lr.jpg",
  "AAFUFKAHIGCMSTLC.jpg",
  "AAFUFKAHIGCMSTLC_flipped_lr.jpg",
  "AAFUFKAHIGCMSTLC_rotated_90.jpg",
  "AAGCPLLMPMRDZFPD.jpg",
  "AAGCPLLMPMRDZFPD_flipped_lr.jpg",
  "AAGCPLLMPMRDZFPD_rotated_270.jpg",
  "AAGCPLLMPMRDZFPD_rotated_90.jpg",
  "AAHUTLLLDVXFUDIO.jpg",
  "AAIDTXKMQDAHVCNS_flipped_lr.jpg",
];

export default function Home() {
  const [chartData, setChartData] = useState<Prediction[]>([]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-20 row-start-2 items-center">
        <ImageCarousel imageSrcs={images} initial={Math.ceil(images.length * Math.random())} />
        <div className="relative w-full items-center flex flex-col">
          <Button
            className="w-40 h-[78px] items-center justify-center z-1"
            color="black"
            onClick={async () =>
              setChartData(
                await classify(await loadPublicImageAsFile("/dataset/AAIDTXKMQDAHVCNS_flipped_lr.jpg"))
              )
            }
          >
            <GitFork className="text-white size-7" />
          </Button>
          <Separator className="absolute w-full h-px bg-gray-200 top-[50%] z-0" orientation="horizontal" />
        </div>
        <div className="flex gap-4 w-full">
          <PredictionCard
            prediction={
              (chartData.length != 0 &&
                chartData.reduce((prev, cur) => (cur.confidence > prev.confidence ? cur : prev))) || {
                label: "-",
                confidence: 0,
              }
            }
            className="w-[600px]"
          />
          <PredictionBarChart
            predictions={[...chartData].sort((a, b) => b.confidence - a.confidence).slice(0, 3)}
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
}
