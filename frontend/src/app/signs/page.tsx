import React from "react";
import iconMap from "@/components/icons/SignIconMap"; // your provided map
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import type { ASLLabel } from "@/types/prediction";

// Full descriptions for tooltips
const aslDescriptions: Record<ASLLabel, string> = {
  A: "Closed fist with the thumb resting on the side of the index finger.",
  B: "Fingers extended straight up, together, with thumb across the palm.",
  C: "Hand forms the shape of the letter 'C'.",
  D: "Index finger points up, thumb touches middle finger forming a circle.",
  E: "Fingers curled down to touch the thumb, forming a claw-like shape.",
  F: "Thumb and index finger form a circle; other fingers are extended.",
  G: "Index finger and thumb extended, palm facing sideways.",
  H: "Index and middle fingers extended together, palm sideways.",
  I: "Little finger extended, all other fingers closed.",
  J: "Little finger draws a 'J' shape in the air.",
  K: "Index and middle fingers extended in a 'V', thumb between them.",
  L: "Thumb and index finger extended to form an 'L' shape.",
  M: "Thumb tucked under the first three fingers.",
  N: "Thumb tucked under the first two fingers.",
  O: "Fingers and thumb form an 'O' shape.",
  P: "Like 'K', but palm facing downward.",
  Q: "Like 'G', but palm facing downward.",
  R: "Index and middle fingers crossed, other fingers closed.",
  S: "Closed fist with thumb across the front of the fingers.",
  T: "Thumb tucked between the index and middle fingers.",
  U: "Index and middle fingers together and upright.",
  V: "Index and middle fingers form a 'V' shape.",
  W: "Index, middle, and ring fingers extended and spread.",
  X: "Index finger bent to form a hook shape.",
  Y: "Thumb and little finger extended, others closed.",
  Z: "Index finger draws a 'Z' shape in the air.",
  "0": "All fingers form a circle to represent '0'.",
  "1": "Index finger up, all others closed.",
  "2": "Index and middle fingers up, others closed.",
  "3": "Thumb, index, and middle fingers up (ASL style).",
  "4": "All fingers except thumb extended.",
  "5": "All five fingers spread out.",
  "6": "Thumb touches pinky, other fingers extended.",
  "7": "Thumb touches ring finger, others extended.",
  "8": "Thumb touches middle finger, others extended.",
  "9": "Thumb touches index finger, others extended.",
};

const ASLInfoPage: React.FC = () => {
  const labels: ASLLabel[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  ];

  return (
    <TooltipProvider>
<div className="-z-1 absolute bg-linear-to-b from-transparent from-0% to-gray-50 to-25% w-full h-[calc(100%-var(--spacing)*60)] top-60 left-0">
</div>

      <div className="container mx-auto py-10 px-4 mt-18 md:mt-32 relative">
        {/* Header */}
        <div className="relative z-10 text-center mb-12 md:mb-30">
          <h1 className="text-xl md:text-4xl font-bold mb-4">ASL Signs Reference</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            ASL is a visual language, using hand shapes and motions to communicate letters, numbers, and more. Below, you'll find 36 ASL signs (A-Z, 0-9). These are the signs that the model was trained to recognize.
          </p>
        </div>

        {/* ASL Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {labels.map((label) => {
            const Icon = iconMap[label];
            const description = aslDescriptions[label];

            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Card className="flex flex-col items-center justify-center p-4 hover:shadow-md transition">
                    <CardContent className="flex flex-col items-center space-y-2">
                      <Icon className="w-16 h-16" />
                      <span className="text-xl font-semibold">{label}</span>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ASLInfoPage;
