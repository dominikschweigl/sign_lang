
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import Image from 'next/image'

export function ConfusionMatrixCNNvsSVM() {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Confusion Matrix Comparison: CNN vs SVM</CardTitle>
        <CardDescription>
          Visual comparison of class-level performance between a Convolutional Neural Network (CNN) and a Support Vector Machine (SVM).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[110/50] rounded bg-white">
          <Image
            src="/cm_comparison.png"
            alt="Confusion matrix side-by-side comparison of CNN and SVM classifiers"
            fill
            className="object-contain"
            priority
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          CNN Overall Accuracy: 98.56% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Confusion matrices highlight per-class precision and recall, providing insights into strengths and weaknesses of CNN vs SVM.
        </div>
      </CardFooter>
    </Card>
  )
}