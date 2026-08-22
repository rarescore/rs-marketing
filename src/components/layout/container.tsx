import { cn } from "@/lib/cn";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--content-max)] px-[var(--gutter)]", className)}
      {...props}
    />
  );
}
