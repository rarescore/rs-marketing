import { cn } from "@/lib/cn";

export function SkipLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "fixed left-4 top-4 z-[var(--layer-toast)] -translate-y-24 rounded-md bg-ink px-4 py-3 font-medium text-canvas transition-transform focus:translate-y-0",
        className,
      )}
      href="#main-content"
      {...props}
    >
      Skip to main content
    </a>
  );
}
