import type { Metadata } from "next";
import { getPractice } from "@/content/practices";
import { PracticeOverview } from "@/components/sections/practice-page";
import { pageMetadata } from "@/lib/seo";

const practice = getPractice("advisory");

export const metadata: Metadata = pageMetadata({ ...practice.seo, path: "/advisory" });

export default function AdvisoryPage() {
  return <PracticeOverview practice={practice} />;
}
