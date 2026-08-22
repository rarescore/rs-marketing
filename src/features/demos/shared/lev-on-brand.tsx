import Image from "next/image";
import { cn } from "@/lib/cn";

type LevOnBrandProps = {
  className?: string;
  descriptor: string;
  compact?: boolean;
};

export function LevOnBrand({ className, descriptor, compact = false }: LevOnBrandProps) {
  return (
    <span className={cn("levon-brand", compact && "levon-brand--compact", className)}>
      <span className="levon-brand__mark" aria-hidden="true">
        <Image
          src="/brand/onlev-approved-boxed.png"
          alt=""
          width={1024}
          height={1024}
          sizes="56px"
          priority={false}
        />
      </span>
      <span className="levon-brand__copy">
        <strong>LEV &amp; ON</strong>
        <small>{descriptor}</small>
      </span>
    </span>
  );
}
