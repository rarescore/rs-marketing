import { cn } from "@/lib/cn";

type OnlevLogoProps = {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
};

export function OnlevLogo({ className, compact = false, inverse = false }: OnlevLogoProps) {
  return (
    <span
      className={cn("onlev-logo", compact && "onlev-logo--compact", inverse && "onlev-logo--inverse", className)}
      aria-label="ONLEV"
    >
      <svg className="onlev-logo__mark" viewBox="0 0 64 64" role="img" aria-hidden="true">
        <rect className="onlev-logo__frame" x="4.5" y="4.5" width="55" height="55" />
        <path className="onlev-logo__ink" d="M12 16.5a7.5 7.5 0 1 1 15 0v7.5H12v-7.5Zm18-7.5h6v15h-6V9Zm9 0h6v15h-6V9Z" />
        <path className="onlev-logo__ink" d="M12 34h7v14h10v6H12V34Zm20 0h15v5.5h-8v2h7v5h-7v2h8V54H32V34Z" />
        <path className="onlev-logo__beam" d="M47 34h6.2L47 54h-5.7L34 34h6.4l3.9 12.5L47 34Z" />
      </svg>
      {!compact ? (
        <span className="onlev-logo__word">
          <strong>ONLEV</strong>
          <small>Digital systems</small>
        </span>
      ) : null}
    </span>
  );
}
