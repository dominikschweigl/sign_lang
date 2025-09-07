import { Bar as BarRecharts, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Hand } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const labelDistributionData = [
  { label: '0', count: 560 },
  { label: '1', count: 112 },
  { label: '2', count: 112 },
  { label: '3', count: 112 },
  { label: '4', count: 560 },
  { label: '5', count: 112 },
  { label: '6', count: 560 },
  { label: '7', count: 112 },
  { label: '8', count: 168 },
  { label: '9', count: 560 },
  { label: 'a', count: 112 },
  { label: 'b', count: 280 },
  { label: 'c', count: 560 },
  { label: 'd', count: 168 },
  { label: 'e', count: 112 },
  { label: 'f', count: 112 },
  { label: 'g', count: 560 },
  { label: 'h', count: 112 },
  { label: 'i', count: 280 },
  { label: 'j', count: 280 },
  { label: 'k', count: 168 },
  { label: 'l', count: 560 },
  { label: 'm', count: 112 },
  { label: 'n', count: 112 },
  { label: 'o', count: 112 },
  { label: 'p', count: 560 },
  { label: 'q', count: 112 },
  { label: 'r', count: 112 },
  { label: 's', count: 280 },
  { label: 't', count: 104 },
  { label: 'u', count: 560 },
  { label: 'v', count: 280 },
  { label: 'w', count: 112 },
  { label: 'x', count: 112 },
  { label: 'y', count: 280 },
  { label: 'z', count: 560 },
]

const distributionConfig = {
  count: {
    label: "sample-count",
    color: "var(--color-gray-800)",
  },
} satisfies ChartConfig

export function DataAnalysisChart() {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Label Distribution Analysis</CardTitle>
        <CardDescription>
          This chart shows the number of samples for each label, highlighting class imbalance in the dataset before training.
        </CardDescription>
      </CardHeader>
      <CardContent className="sm:px-16">
        <ChartContainer config={distributionConfig}>
          <BarChart
            accessibilityLayer
            data={labelDistributionData}
            height={200}
            margin={{ top: 10, right: 20, bottom: 10, left: -20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={true}
              tickCount={5}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  formatter={(value, name) => {
                      return (
                        <div className="flex items-center flex-nowrap gap-1 -mt-[2px] w-full">
                          <div className={`bg-[var(--color-gray-800)] w-[10px] aspect-square rounded-[3px]`}></div>
                          <div className="capitalize text-gray-500 font-medium">{name}</div>
                          <div className="ml-auto">{`${value} Samples`}</div>
                        </div>
                      );
                  }}
                />
              }
            />
            <BarRecharts dataKey="count" fill="var(--color-count)" radius={2}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total classes: 36 <Hand className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Uneven class distribution may affect training, requiring balancing techniques such as augmentation or weighting.
        </div>
      </CardFooter>
    </Card>
  )
}