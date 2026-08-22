import Image from "next/image";
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
      <span className="onlev-logo__mark" aria-hidden="true">
        <Image
          src="/brand/onlev-approved-boxed.png"
          alt=""
          width={1024}
          height={1024}
          sizes={compact ? "76px" : "56px"}
          priority={false}
        />
      </span>
      {!compact ? (
        <span className="onlev-logo__word">
          <strong>ONLEV</strong>
          <small>Digital systems</small>
        </span>
      ) : null}
    </span>
  );
}
