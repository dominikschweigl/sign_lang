import { useState, useEffect } from "react";
import { MathJax } from 'better-react-mathjax';

type FormulaProps = {
  tex: string;
  inline?: boolean;
};

export const Formula = ({ tex, inline = true }: FormulaProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MathJax inline={inline} dynamic className="text-[13px]">
      {inline ? `\\(${tex}\\)` : `\\[${tex}\\]`}
    </MathJax>
  );
};