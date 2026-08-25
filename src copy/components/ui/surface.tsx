import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const surfaceVariants = cva("border border-line text-ink", {
  variants: {
    tone: {
      base: "bg-surface",
      raised: "bg-surface-raised shadow-soft",
      transparent: "bg-transparent",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    tone: "base",
    radius: "md",
    padding: "md",
  },
});

export interface SurfaceProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof surfaceVariants> {}

export function Surface({
  className,
  tone,
  radius,
  padding,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(surfaceVariants({ tone, radius, padding }), className)}
      {...props}
    />
  );
}
