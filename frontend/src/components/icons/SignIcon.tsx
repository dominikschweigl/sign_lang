import { CircleQuestionMark } from "lucide-react";
import iconMap from "./SignIconMap";
import type { ASLLabel } from "@/types/prediction";

interface Props {
  char: ASLLabel | "-";
  size?: number;
}

export function SignIcon({
  char,
  size = 36,
  strokeWidth = 0.5,
  ...props
}: Props & React.SVGAttributes<SVGSVGElement>) {
  const Icon = char === "-" ? null : iconMap[char];

  return Icon ? (
    <Icon width={size} height={size} strokeWidth={strokeWidth} {...props} />
  ) : (
    <CircleQuestionMark className="w-9 aspect-square" size={32} strokeWidth={1} {...props} />
  );
}
