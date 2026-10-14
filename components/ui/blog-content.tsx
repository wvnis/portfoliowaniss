"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, Radio, Search } from "lucide-react";
import { journal } from "../../data/journal";
import sources from "../../data/news-sources.json";

type NewsArticle = {
  id: string;
  title: string;
  url: string;
  sourceId: string;
  source: string;
  category: "IA" | "Développement";
  date: string;
};
type NewsData = {
  updatedAt: string | null;
  articles: NewsArticle[];
  warnings: string[];
};
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(date));

export function BlogContent() {
  const [news, setNews] = useState<NewsData | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tout");
  const [source, setSource] = useState("Toutes les sources");
  const [visibleCount, setVisibleCount] = useState(8);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const refreshNews = () =>
      fetch(`${basePath}/news.json`, {
        signal: controller.signal,
        cache: "no-store",
      })
        .then((response) => {
          if (!response.ok) throw new Error("News unavailable");
          return response.json();
        })
        .then((data: NewsData) => {
          setNews(data);
          setNow(Date.now());
          setFailed(false);
        })
        .catch((error: Error) => {
          if (error.name !== "AbortError") setFailed(true);
        });
    refreshNews();
    const refreshTimer = setInterval(refreshNews, 24 * 60 * 60 * 1000);
    const clockTimer = setInterval(() => setNow(Date.now()), 60 * 1000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setNow(Date.now());
        refreshNews();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      controller.abort();
      clearInterval(refreshTimer);
      clearInterval(clockTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [attempt]);
  const articles = useMemo(
    () =>
      (news?.articles ?? []).filter(
        (article) =>
          Date.parse(article.date) >= now - WEEK_IN_MS &&
          Date.parse(article.date) <= now &&
          (category === "Tout" || article.category === category) &&
          (source === "Toutes les sources" || article.sourceId === source) &&
          `${article.title} ${article.source}`
            .toLocaleLowerCase("fr")
            .includes(query.toLocaleLowerCase("fr")),
      ),
    [news, category, source, query, now],
  );
  return (
    <main className="blog-shell min-h-screen px-5 pb-6 pt-6 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm hover:border-[#C3E41D]"
          >
            <ArrowLeft size={16} /> Retour au portfolio
          </Link>
          <span className="text-sm font-semibold tracking-widest">
            WS<span className="text-[#C3E41D]">.</span> / JOURNAL
          </span>
        </header>
        <div className="py-14 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C3E41D]">
            APPRENDRE EN CONSTRUISANT
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Mes projets avancent.
            <br />
            <span className="text-[#C3E41D]">Le web aussi.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Mon journal pour partager les étapes de mes réalisations, puis les
            actualités tech du moment pour suivre l’IA et le développement.
          </p>
          <nav
            aria-label="Rubriques du blog"
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#journal"
              className="rounded-full bg-[#C3E41D] px-5 py-3 text-sm font-semibold text-black"
            >
              Mon journal ↓
            </a>
            <a
              href="#veille"
              className="rounded-full border border-white/20 px-5 py-3 text-sm"
            >
              Actualités tech ↓
            </a>
          </nav>
        </div>
        <div className="space-y-16 sm:space-y-20">
          <section id="journal" className="scroll-mt-8">
            <div className="mb-6 flex items-center gap-3">
              <BookOpen className="text-[#C3E41D]" size={24} />
              <h2 className="text-2xl font-semibold">Mon journal</h2>
            </div>
            <div className="mb-6 max-w-3xl space-y-3 text-sm leading-relaxed text-neutral-400">
              <p>
                Dans ce journal, je raconte la progression de mes projets : leur
                objectif, les outils utilisés, les principales étapes et les
                vérifications réalisées.
              </p>
              <p>
                Chaque récit donne le contexte et explique les choix qui
                permettent de passer de l’idée à une réalisation concrète.
              </p>
            </div>
            {journal.map((entry) => (
              <article
                key={entry.slug}
                className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                  <span className="rounded-full border border-[#C3E41D]/30 px-3 py-1 text-[#C3E41D]">
                    {entry.category}
                  </span>
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  <span>{entry.steps.length} étapes expliquées</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold leading-snug">
                  <Link
                    href={`/blog/${entry.slug}/`}
                    className="hover:text-[#C3E41D]"
                  >
                    {entry.title}
                  </Link>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                  {entry.summary}
                </p>
                <Link
                  href={`/blog/${entry.slug}/`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C3E41D]"
                >
                  Lire les étapes <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
            <div className="mt-5 border-l border-[#C3E41D]/40 pl-5 text-sm leading-relaxed text-neutral-400">
              <p className="font-medium text-neutral-200">
                À documenter ensuite
              </p>
              <p className="mt-2">
                Le site réalisé pour un ami et les prochaines étapes de Bonpass.
              </p>
            </div>
          </section>
          <section
            id="veille"
            className="scroll-mt-8 border-t border-white/10 pt-12 sm:pt-16"
          >
            <div className="mb-6 flex items-center gap-3">
              <Radio className="text-[#C3E41D]" size={24} />
              <h2 className="text-2xl font-semibold">Actualités tech</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-neutral-400">
              Titres et liens vers les articles de Frandroid et du Blog du
              Modérateur. Actualisation quotidienne, avec les actualités des
              sept derniers jours uniquement.
            </p>
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-5 sm:p-6">
              <div className="relative">
                <Search
                  aria-hidden="true"
                  size={18}
                  className="absolute left-4 top-3.5 text-neutral-500"
                />
                <label htmlFor="news-search" className="sr-only">
                  Rechercher dans les actualités
                </label>
                <input
                  id="news-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher une actualité…"
                  className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500"
                />
              </div>
              <div
                className="mt-4 flex flex-wrap gap-2"
                aria-label="Filtrer les thèmes"
              >
                {["Tout", "IA", "Développement"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-4 py-2 text-xs font-medium ${category === item ? "bg-[#C3E41D] text-black" : "border border-white/15 text-neutral-300"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label htmlFor="news-source" className="sr-only">
                Filtrer les sources
              </label>
              <select
                id="news-source"
                value={source}
                onChange={(event) => setSource(event.target.value)}
                className="mt-4 w-full rounded-xl border border-white/15 bg-[#151515] px-3 py-3 text-sm text-neutral-300"
              >
                <option>Toutes les sources</option>
                {sources.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="mt-6" aria-live="polite" aria-atomic="true">
                {failed ? (
                  <div className="py-6 text-sm text-neutral-300">
                    <p>
                      Les actualités ne peuvent pas être chargées pour le
                      moment.
                    </p>
                    <button
                      type="button"
                      onClick={() => setAttempt((value) => value + 1)}
                      className="mt-3 text-[#C3E41D] underline"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : !news ? (
                  <p className="py-6 text-sm text-neutral-400">
                    Chargement des actualités…
                  </p>
                ) : (
                  <>
                    <p className="mb-3 text-xs text-neutral-400">
                      {articles.length} actualité
                      {articles.length > 1 ? "s" : ""}
                      {news.updatedAt
                        ? ` · Actualisé le ${formatDate(news.updatedAt)}`
                        : ""}
                    </p>
                    {news.warnings.length > 0 && (
                      <p className="mb-4 text-xs leading-relaxed text-neutral-400">
                        Une ou plusieurs sources n’ont pas pu être actualisées.
                        Les articles disponibles des sept derniers jours sont
                        conservés.
                      </p>
                    )}
                    {articles.length === 0 && (
                      <p className="py-6 text-sm leading-relaxed text-neutral-300">
                        Aucune actualité ne correspond à ces filtres pour le
                        moment.
                      </p>
                    )}
                    {articles.slice(0, visibleCount).map((article) => (
                      <article
                        key={article.id}
                        className="border-t border-white/10 py-5"
                      >
                        <div className="mb-2 flex flex-wrap gap-2 text-[11px] text-neutral-400">
                          <span className="text-[#C3E41D]">
                            {article.category}
                          </span>
                          <span>· {article.source}</span>
                          <time dateTime={article.date}>
                            {formatDate(article.date)}
                          </time>
                        </div>
                        <h3 className="text-base font-medium leading-relaxed">
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#C3E41D]"
                          >
                            {article.title}
                            <ArrowUpRight
                              aria-hidden="true"
                              size={15}
                              className="ml-2 inline"
                            />
                          </a>
                        </h3>
                      </article>
                    ))}
                    {visibleCount < articles.length && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount((value) => value + 8)}
                        className="mt-3 w-full rounded-xl border border-white/20 px-5 py-3 text-sm hover:border-[#C3E41D]"
                      >
                        Voir plus d’actualités
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-400">
              <span>Sources :</span>
              {sources.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </section>
        </div>
        <footer className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/10 py-8 text-sm text-neutral-400">
          <span>Waniss Saggal · Blog & actualités</span>
          <Link href="/">Retour au portfolio</Link>
        </footer>
      </div>
    </main>
  );
}
