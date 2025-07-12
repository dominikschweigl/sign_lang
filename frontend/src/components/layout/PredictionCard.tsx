import { SignIcon } from "@/components/icons/SignIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { Separator } from "@radix-ui/react-separator";
import type { Prediction } from "@/types/prediction";
import React from "react";
import { cn } from "@/lib/utils";

interface PredictionCardProps {
  prediction: Prediction;
}

export default function PredictionCard({
  prediction,
  className,
  ...props
}: PredictionCardProps & React.ComponentProps<"div">) {
  return (
    <Card className={cn(className, "min-w-[250px]")} id={prediction.label} {...props}>
      <CardContent>
        <div className="flex gap-2 items-center">
          <SignIcon char={prediction.label} />
          <Text element="h4" as={"h4"}>
            Prediction
          </Text>
          <Text element="p" as={"h4"} className="ml-auto">
            {prediction.label}
          </Text>
        </div>
        <Separator className="w-full h-px bg-gray-200 my-4" orientation="horizontal" />
        <div className="flex gap-2 justify-between">
          <Text element="h6" as={"h6"}>
            Confidence:
          </Text>
          <Text element="p" as={"p"}>
            {(prediction.confidence * 100).toFixed(2)}%
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}
