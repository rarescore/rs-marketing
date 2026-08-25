import { cn } from "@/lib/cn";

export function Grid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-[var(--grid-gap)] md:grid-cols-8 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}
