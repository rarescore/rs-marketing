import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 font-medium leading-none transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--motion-control)] ease-[var(--ease-enter)] disabled:pointer-events-none disabled:opacity-45 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "border-accent bg-accent text-white shadow-soft hover:border-accent-strong hover:bg-accent-strong",
        secondary:
          "border-line bg-surface text-ink hover:border-ink-muted hover:bg-surface-raised",
        quiet:
          "border-transparent bg-transparent text-ink hover:bg-surface-raised",
        danger:
          "border-danger bg-danger text-canvas hover:brightness-110",
      },
      size: {
        sm: "min-h-11 px-4 text-sm",
        md: "min-h-12 px-5 text-base",
        lg: "min-h-14 px-7 text-base",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  width,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, width }), className)}
      {...props}
    />
  );
}
