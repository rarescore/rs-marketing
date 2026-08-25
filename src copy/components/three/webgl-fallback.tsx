import { cn } from "@/lib/cn";

export function WebGLFallback({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative size-full overflow-hidden", className)} data-webgl-fallback>
      {children}
    </div>
  );
}
