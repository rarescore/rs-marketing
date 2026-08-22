import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Showroom" };

export default function ShowroomPage() {
  redirect("/?industry=real-estate#three-doors");
}
