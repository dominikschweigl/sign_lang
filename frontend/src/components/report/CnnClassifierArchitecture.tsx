import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

export function CnnClassifierArchitecture() {
    return <Card className="my-6">
          <CardHeader>
            <CardTitle>CNN Architecture</CardTitle>
            <CardDescription>
              Architecture diagram of the sign language classification model.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[260/25] rounded bg-white">
              <Image
                src="/sign_lang_model.onnx.png"
                alt="Sign language model architecture diagram"
                fill
                className="object-contain"
                priority
              />
            </div>
            <CardFooter className="flex justify-center gap-2">
              <figcaption className="text-sm text-center text-muted-foreground mt-4">
                Fig. 1: Architecture diagram of the sign language classification model.
              </figcaption>
            </CardFooter>
          </CardContent>
        </Card>
}