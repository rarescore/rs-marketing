import type { ReactNode } from "react";

export function LegalPage({ title, updated, introduction, children }: { title: string; updated: string; introduction: string; children: ReactNode }) {
  return (
    <article className="onlev-legal">
      <header><p className="onlev-kicker">ONLEV / onlev.site</p><h1>{title}</h1><p>{introduction}</p><small>Last updated {updated}</small></header>
      <div className="onlev-legal__body">{children}</div>
    </article>
  );
}
