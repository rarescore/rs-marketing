import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const controlClassName =
  "min-h-12 w-full rounded-md border border-line bg-surface px-4 text-ink shadow-none transition-[border-color,box-shadow,background-color] duration-[var(--motion-control)] placeholder:text-ink-muted/70 hover:border-ink-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-45 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClassName, className)} {...props} />;
}

export function Textarea({
  className,
  rows = 5,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cn(controlClassName, "min-h-32 resize-y py-3", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClassName, "appearance-auto", className)} {...props}>
      {children}
    </select>
  );
}

export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn("text-sm font-medium leading-5 text-ink", className)} {...props} />
  );
}

export function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("m-0 text-sm leading-5 text-ink-muted", className)} {...props} />
  );
}

export function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("m-0 text-sm font-medium leading-5 text-danger", className)} {...props} />
  );
}
