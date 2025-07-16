import { SignIcon } from "@/components/icons/SignIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { Separator } from "@radix-ui/react-separator";
import type { ASLLabel, Prediction } from "@/types/prediction";
import React from "react";
import { cn } from "@/lib/utils";
import { SquareCheck, SquareX } from "lucide-react";

interface PredictionCardProps {
  prediction: Prediction;
  trueLabel: ASLLabel
}

export default function PredictionCard({
  prediction,
  trueLabel,
  className,
  ...props
}: PredictionCardProps & React.ComponentProps<"div">) {
  return (
    <Card className={cn(className, "min-w-[250px]")} id={prediction.label} {...props}>
      <CardContent className="flex flex-col justify-between" >
        <div className="flex flex-col flex-grow">
          <div className="flex gap-2 items-center">
            <SignIcon char={prediction.label} />
            <Text element="h4" as={"h4"}>
              Prediction
            </Text>
            <div className="ml-auto w-[24px] flex justify-center">
              <Text element="p" as={"h4"}>
                {prediction.label}
              </Text>
            </div>
          </div>
          <Separator className="w-full h-px bg-gray-200 my-4" orientation="horizontal" />
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 justify-between">
              <Text element="h6" as={"h6"} className="font-medium">
                Confidence
              </Text>
              <Text element="p" as={"p"}>
                {(prediction.confidence * 100).toFixed(2)}%
              </Text>
            </div>
            <div className="flex gap-2 justify-between">
              <Text element="h6" as={"h6"} className="font-medium">
                Correct
              </Text>
              {
                prediction.label === trueLabel 
                ? <SquareCheck className="text-green-600" strokeWidth={1.5} />
                : <SquareX className="text-red-600" strokeWidth={1.5} />
              }
            </div>
          </div>
        </div>
        <div>
          <Separator className="w-full h-px bg-gray-200 my-4" orientation="horizontal" />
          <div className="flex gap-2 justify-between" >
            <Text element="h6" as={"h6"} className="font-medium">
              True Label
            </Text>
            <div className="w-[24px] flex justify-center">

            <Text element="p" as={"p"}>
              {trueLabel}
            </Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
