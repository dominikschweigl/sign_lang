import { Bar as BarRecharts, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'

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

const labelDistributionAugmentedData = [
  { label: '0', count: 560 },
  { label: '1', count: 448 },
  { label: '2', count: 448 },
  { label: '3', count: 448 },
  { label: '4', count: 560 },
  { label: '5', count: 448 },
  { label: '6', count: 560 },
  { label: '7', count: 448 },
  { label: '8', count: 504 },
  { label: '9', count: 560 },
  { label: 'a', count: 448 },
  { label: 'b', count: 560 },
  { label: 'c', count: 560 },
  { label: 'd', count: 504 },
  { label: 'e', count: 448 },
  { label: 'f', count: 448 },
  { label: 'g', count: 560 },
  { label: 'h', count: 448 },
  { label: 'i', count: 560 },
  { label: 'j', count: 560 },
  { label: 'k', count: 504 },
  { label: 'l', count: 560 },
  { label: 'm', count: 448 },
  { label: 'n', count: 448 },
  { label: 'o', count: 448 },
  { label: 'p', count: 560 },
  { label: 'q', count: 448 },
  { label: 'r', count: 448 },
  { label: 's', count: 560 },
  { label: 't', count: 416 },
  { label: 'u', count: 560 },
  { label: 'v', count: 560 },
  { label: 'w', count: 448 },
  { label: 'x', count: 448 },
  { label: 'y', count: 560 },
  { label: 'z', count: 560 },
]

const augmentedConfig = {
  count: {
    label: "Sample Count",
    color: "var(--color-gray-800)",
  },
} satisfies ChartConfig

export function DataAnalysisAugmentedChart() {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Augmented Label Distribution</CardTitle>
        <CardDescription>
          This chart shows the number of samples per label after applying data augmentation, making the dataset more balanced for training.
        </CardDescription>
      </CardHeader>
      <CardContent className="md:px-16">
        <ChartContainer config={augmentedConfig}>
          <BarChart
            accessibilityLayer
            data={labelDistributionAugmentedData}
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
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  formatter={(value, _) => `${value} samples`}
                />
              }
            />
            <BarRecharts dataKey="count" fill="var(--color-count)" radius={2}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total classes: 36 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Augmentation reduced class imbalance, helping the model generalize better across all classes.
        </div>
      </CardFooter>
    </Card>
  )
}