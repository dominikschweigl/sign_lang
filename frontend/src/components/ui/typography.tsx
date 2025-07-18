import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    as: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      largeText: "text-lg font-semibold",
      smallText: "text-sm font-medium leading-none",
      mutedText: "text-sm text-muted-foreground",
    },
  },
});

type Element = keyof React.JSX.IntrinsicElements;

type TextProps<T extends Element> = { element: T } & VariantProps<typeof textVariants> &
  React.HTMLAttributes<HTMLElement>;

const Text = React.forwardRef<
  VariantProps<typeof textVariants> & React.HTMLAttributes<HTMLElement>,
  TextProps<Element>
>(({ className, element, as, ...props }, ref) => {
  const Component = element;

  const componentProps = {
    className: cn(textVariants({ as, className })),
    ...props,
  };

  return React.createElement(Component, componentProps);
});

Text.displayName = "Text";

export { Text };
