"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="onlev-global-error" id="main-content">
          <p>ONLEV / Recovery</p>
          <h1>The experience lost its place.</h1>
          <p>Your information has not been submitted. Try the route again, or return to the showroom.</p>
          <div>
            <button type="button" onClick={reset}>Try again</button>
            <Link href="/">Return to ONLEV</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
