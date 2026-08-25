import type { ReactNode } from "react";
import { SkipLink } from "@/components/a11y/skip-link";
import { OnlevFooter } from "./onlev-footer";
import { OnlevHeader } from "./onlev-header.client";

export function OnlevShell({ children }: { children: ReactNode }) {
  return (
    <div className="onlev-site">
      <SkipLink />
      <OnlevHeader />
      <main id="main-content">{children}</main>
      <OnlevFooter />
    </div>
  );
}
