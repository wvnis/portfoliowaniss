import type { Metadata } from "next";
import { BlogContent } from "../../components/ui/blog-content";

export const metadata: Metadata = {
  title: "Blog & actualités tech | Waniss Saggal",
  description:
    "Mon journal de projets et les actualités tech du moment en intelligence artificielle et développement web.",
  alternates: { canonical: "https://wvnis.github.io/portfoliowaniss/blog/" },
  openGraph: {
    title: "Blog & actualités tech | Waniss Saggal",
    description: "Mon journal de projets et les actualités tech du moment.",
    url: "https://wvnis.github.io/portfoliowaniss/blog/",
    type: "website",
  },
};
export default function BlogPage() {
  return <BlogContent />;
}
