import { CircleQuestionMark } from "lucide-react";
import iconMap from "./SignIconMap";

interface Props {
  char: string;
  size?: number;
}

export function SignIcon({
  char,
  size = 36,
  strokeWidth = 0.5,
  ...props
}: Props & React.SVGAttributes<SVGSVGElement>) {
  const Icon = iconMap[char.toUpperCase()];

  return Icon ? (
    <Icon width={size} height={size} strokeWidth={strokeWidth} {...props} />
  ) : (
    <CircleQuestionMark className="w-9 aspect-square" size={32} strokeWidth={1} {...props} />
  );
}
