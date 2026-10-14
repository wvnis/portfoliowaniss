import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal } from "../../../data/journal";

export const dynamicParams = false;
export function generateStaticParams() {
  return journal.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) return {};
  const url = `https://wvnis.github.io/portfoliowaniss/blog/${slug}/`;
  return {
    title: `${entry.title} | Waniss Saggal`,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      url,
      type: "article",
      publishedTime: entry.date,
    },
  };
}
export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) notFound();
  return (
    <main className="blog-shell min-h-screen px-6 py-10 text-white">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog/"
          className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm"
        >
          ← Retour au blog
        </Link>
        <header className="py-14">
          <p className="text-xs tracking-widest text-[#C3E41D]">
            {entry.category.toUpperCase()}
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            {entry.title}
          </h1>
          <time
            dateTime={entry.date}
            className="mt-5 block text-sm text-neutral-400"
          >
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "long",
              timeZone: "Europe/Paris",
            }).format(new Date(entry.date))}
          </time>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">
            {entry.summary}
          </p>
        </header>
        <ol className="space-y-10">
          {entry.steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[40px_1fr] gap-4 border-t border-white/15 pt-7"
            >
              <span className="text-xl font-semibold text-[#C3E41D]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <section>
                <h2 className="text-xl font-semibold">{step.title}</h2>
                <p className="mt-3 leading-relaxed text-neutral-300">
                  {step.text}
                </p>
              </section>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          {entry.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#C3E41D] px-5 py-3 text-sm font-semibold text-black"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <footer className="mt-14 border-t border-white/10 py-8 text-sm text-neutral-400">
          Waniss Saggal · Journal de progression
        </footer>
      </article>
    </main>
  );
}
