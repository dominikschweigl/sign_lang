"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Prediction } from "@/types/prediction";
import React from "react";

interface PredictionBarChartProps {
  predictions: Prediction[];
}

const chartConfig = {
  confidence: {
    label: "Confidence",
    color: "black",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function PredictionBarChart({
  predictions,
  ...props
}: PredictionBarChartProps & React.ComponentProps<"div">) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Prediction Confidence</CardTitle>
        <CardDescription>Model confidence scores for the top ASL sign predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-30 w-full">
          <BarChart
            accessibilityLayer
            data={predictions}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="confidence" type="number" hide tickFormatter={(value) => `${value * 100}%`} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  hideLabel={false}
                  color="var(--color-confidence)"
                  formatter={(value, name) => {
                    if (typeof value === "number") {
                      return (
                        <div className="flex items-center flex-nowrap gap-2 -mt-[2px]">
                          <div className="bg-[var(--color-confidence)] w-[10px] aspect-square rounded-[3px]"></div>
                          <div className="capitalize text-gray-500 font-medium">{name}</div>
                          {`${(value * 100).toFixed(2)}%`}
                        </div>
                      );
                    }
                    return value;
                  }}
                />
              }
            />
            <Bar dataKey="confidence" fill="var(--color-confidence)" radius={4}>
              <LabelList
                dataKey="label"
                position="insideLeft"
                offset={8}
                className="fill-(--color-white)"
                fontSize={12}
              />
              <LabelList
                dataKey="confidence"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value) => {
                  if (typeof value === "number") {
                    return `${(value * 100).toFixed(2)}%`;
                  }
                  return value;
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
