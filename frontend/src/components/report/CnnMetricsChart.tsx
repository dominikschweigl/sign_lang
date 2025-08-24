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

const cnnChartData = [
  { label: '0', precision: 96.7, recall: 98.7 },
  { label: '1', precision: 98.2, recall: 96.6 },
  { label: '2', precision: 96.3, recall: 95.7 },
  { label: '3', precision: 100, recall: 100 },
  { label: '4', precision: 98.3, recall: 98.3 },
  { label: '5', precision: 100, recall: 98.5 },
  { label: '6', precision: 94.6, recall: 94.3 },
  { label: '7', precision: 100, recall: 99.2 },
  { label: '8', precision: 98.8, recall: 99.1 },
  { label: '9', precision: 100, recall: 100 },
  { label: 'a', precision: 98.0, recall: 98.6 },
  { label: 'b', precision: 100, recall: 100 },
  { label: 'c', precision: 100, recall: 100 },
  { label: 'd', precision: 98.5, recall: 98.5 },
  { label: 'e', precision: 100, recall: 98.5 },
  { label: 'f', precision: 100, recall: 97.6 },
  { label: 'g', precision: 100, recall: 100 },
  { label: 'h', precision: 98.7, recall: 100 },
  { label: 'i', precision: 100, recall: 100 },
  { label: 'j', precision: 100, recall: 100 },
  { label: 'k', precision: 97.2, recall: 100 },
  { label: 'l', precision: 100, recall: 100 },
  { label: 'm', precision: 96.2, recall: 95.5 },
  { label: 'n', precision: 95.4, recall: 96.3 },
  { label: 'o', precision: 98.6, recall: 96.0 },
  { label: 'p', precision: 100, recall: 100 },
  { label: 'q', precision: 100, recall: 98.7 },
  { label: 'r', precision: 97.5, recall: 98.5 },
  { label: 's', precision: 98.0, recall: 100 },
  { label: 't', precision: 100, recall: 96.4 },
  { label: 'u', precision: 98.7, recall: 98.5 },
  { label: 'v', precision: 98.2, recall: 97.9 },
  { label: 'w', precision: 92.4, recall: 94.3 },
  { label: 'x', precision: 97.2, recall: 100 },
  { label: 'y', precision: 100, recall: 100 },
  { label: 'z', precision: 98.0, recall: 100 },
]

// 🧾 Tooltip and bar config
const chartConfig = {
  precision: {
    label: 'Precision (%)',
    color: 'var(--color-gray-800)',
  },
  recall: {
    label: 'Recall (%)',
    color: 'var(--color-gray-400)',
  },
} satisfies ChartConfig

export function CnnMetricsChart() {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Per-Class Performance</CardTitle>
        <CardDescription>
          This graph shows precision and recall for each class. Precision is the proportion of correct positive predictions, and recall is the proportion of actual positives that were correctly identified.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} >
          <BarChart
            accessibilityLayer
            data={cnnChartData}
            margin={{ top: 10, right: 20, bottom: 10, left: -20 }}
            barGap={0}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis 
              dataKey={"precision"}
              tickLine={true}
              tickCount={6}
              tickFormatter={v => `${v}%`}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  formatter={(value, name) => {
                    if (typeof value === "number") {
                      return (
                        <div className="flex items-center flex-nowrap gap-1 -mt-[2px] w-full">
                          <div className={`bg-[var(--color-${name.toString().toLowerCase()})] w-[10px] aspect-square rounded-[3px]`}></div>
                          <div className="capitalize text-gray-500 font-medium">{name}</div>
                          <div className="ml-auto">{`${(value).toFixed(2)}%`}</div>
                        </div>
                      );
                    }
                    return value;
                  }}
                />
              }
            />
            <BarRecharts dataKey="precision" fill="var(--color-precision)" radius={2}/>
            <BarRecharts dataKey="recall" fill="var(--color-recall)" radius={2}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Overall accuracy: 98.56% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Metrics based on validation set evaluation of the CNN classifier.
        </div>
      </CardFooter>
    </Card>
  )
}