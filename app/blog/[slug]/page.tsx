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
          {(entry.status || entry.role || entry.origin) && (
            <dl className="mt-6 space-y-3 text-sm">
              {entry.status && (
                <div className="flex flex-wrap items-center gap-3">
                  <dt className="text-neutral-400">État du projet</dt>
                  <dd className="rounded-full border border-[#C3E41D]/30 px-3 py-1 text-[#C3E41D]">
                    {entry.status}
                  </dd>
                </div>
              )}
              {entry.role && (
                <div className="flex flex-wrap gap-2">
                  <dt className="text-neutral-400">Mon rôle</dt>
                  <dd className="text-neutral-200">{entry.role}</dd>
                </div>
              )}
              {entry.origin && (
                <div className="flex flex-wrap gap-2">
                  <dt className="text-neutral-400">Origine et contexte</dt>
                  <dd className="text-neutral-200">{entry.origin}</dd>
                </div>
              )}
            </dl>
          )}
        </header>
        {entry.introduction && (
          <section className="mb-10 space-y-4" aria-label="Contexte du projet">
            <h2 className="text-2xl font-semibold">Le point de départ</h2>
            {entry.introduction.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-neutral-300">
                {paragraph}
              </p>
            ))}
          </section>
        )}
        {entry.objective && (
          <section className="mb-10 rounded-2xl border border-[#C3E41D]/25 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-[#C3E41D]">
              {entry.objectiveTitle ?? "L’objectif de cette version"}
            </h2>
            <p className="mt-3 leading-relaxed text-neutral-300">
              {entry.objective}
            </p>
          </section>
        )}
        {entry.technologies && (
          <section className="mb-12" aria-label="Technologies utilisées">
            <h2 className="text-xl font-semibold">Les outils utilisés</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-white/15 px-3 py-2 text-sm text-neutral-300"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        )}
        {entry.challenge && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold">Le défi du projet</h2>
            <p className="mt-4 leading-relaxed text-neutral-300">
              {entry.challenge}
            </p>
          </section>
        )}
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
                {step.details?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 leading-relaxed text-neutral-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            </li>
          ))}
        </ol>
        {entry.outcome && (
          <section className="mt-12 border-t border-white/15 pt-8">
            <h2 className="text-2xl font-semibold">
              {entry.outcomeTitle ?? "Le résultat"}
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-300">
              {entry.outcome}
            </p>
          </section>
        )}
        {entry.nextSteps && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">La suite du journal</h2>
            <ul className="mt-4 space-y-3 text-neutral-300">
              {entry.nextSteps.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span aria-hidden="true" className="text-[#C3E41D]">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
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
