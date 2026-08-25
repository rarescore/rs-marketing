import { cn } from "@/lib/cn";

type SectionSpacing = "compact" | "standard" | "cinematic";

const spacing: Record<SectionSpacing, string> = {
  compact: "py-12 md:py-16",
  standard: "py-20 md:py-24",
  cinematic: "py-24 md:py-32",
};

export interface SectionProps extends React.ComponentProps<"section"> {
  spacing?: SectionSpacing;
}

export function Section({
  className,
  spacing: space = "standard",
  ...props
}: SectionProps) {
  return <section className={cn(spacing[space], className)} {...props} />;
}
