import type { Metadata } from "next";
import { BlogContent } from "../../components/ui/blog-content";

export const metadata: Metadata = {
  title: "Blog & veille | Waniss Saggal",
  description:
    "Mon journal de projets et ma veille en intelligence artificielle et développement web.",
  alternates: { canonical: "https://wvnis.github.io/portfoliowaniss/blog/" },
  openGraph: {
    title: "Blog & veille | Waniss Saggal",
    description: "Mon journal de projets et ma veille IA et développement.",
    url: "https://wvnis.github.io/portfoliowaniss/blog/",
    type: "website",
  },
};
export default function BlogPage() {
  return <BlogContent />;
}
