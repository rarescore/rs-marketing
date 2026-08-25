import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ONLEV — Client-winning digital systems",
    short_name: "ONLEV",
    description:
      "Complete website and client-acquisition systems for lead-driven local businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f12",
    theme_color: "#0d0f12",
    icons: [
      {
        src: "/brand/onlev-mark-light.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
