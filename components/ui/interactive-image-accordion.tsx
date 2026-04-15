"use client";

import { memo, useCallback, useState } from "react";

type AccordionItemData = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
};

const ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    title: "Portfolio personnel",
    subtitle:
      "Site de présentation de mon profil, de mes compétences et de mes projets.",
    imageUrl: "/siteportfolio.png",
  },
  {
    id: 2,
    title: "Support utilisateur",
    subtitle:
      "Installation de logiciels, aide aux utilisateurs et maintenance de base.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Projet web à venir",
    subtitle:
      "Nouveau site web en préparation pour continuer à progresser en front-end.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Stage mai - juin",
    subtitle:
      "Expérience professionnelle à venir pour découvrir le travail en entreprise.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Projets d’apprentissage",
    subtitle:
      "Exercices et mini-projets en HTML, CSS, JavaScript, Python et SQL.",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },
];

const AccordionCard = memo(function AccordionCard({
  item,
  isActive,
  onActivate,
}: {
  item: AccordionItemData;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={item.title}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate();
      }}
      className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shrink-0"
      style={{
        height: "clamp(180px, 35vw, 380px)",
        width: isActive ? "clamp(110px, 26vw, 260px)" : "clamp(24px, 6vw, 44px)",
        transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "width",
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div
        className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 400ms ease 200ms, transform 400ms ease 200ms",
          willChange: "opacity, transform",
          pointerEvents: "none",
        }}
      >
        <p className="text-xs sm:text-base font-semibold leading-snug">
          {item.title}
        </p>
        <p className="mt-1 text-[11px] sm:text-sm text-white/80 leading-relaxed hidden sm:block">
          {item.subtitle}
        </p>
      </div>

      <span
        className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap text-white text-[10px] sm:text-sm font-semibold"
        style={{
          opacity: isActive ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      >
        {item.title}
      </span>
    </div>
  );
});

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-base md:text-lg tracking-[0.22em] text-neutral-500 mb-5">
            PROJECTS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Mes <span style={{ color: "#C3E41D" }}>projets</span>
          </h2>

          <p className="mt-6 text-neutral-400 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed">
            Voici une sélection de projets réalisés, en cours ou à venir, qui
            illustrent ma progression en développement web et en informatique.
          </p>

          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold hover:opacity-80 active:scale-95 transition-all duration-200"
              style={{
                backgroundColor: "#C3E41D",
                color: "#000",
              }}
            >
              Me contacter
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="hidden lg:flex items-center justify-center gap-2 sm:gap-3 overflow-hidden pb-2">
            {ACCORDION_ITEMS.map((item, index) => (
              <AccordionCard
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onActivate={() => handleActivate(index)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {ACCORDION_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden h-48 sm:h-56"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}