"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Mail, Menu, X } from "lucide-react";
import { LandingAccordionItem } from "./interactive-image-accordion";

type BlurTextProps = {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: CSSProperties;
};

type MenuItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

type SkillBlock = {
  title: string;
  items: string[];
};

type FormationItem = {
  date: string;
  title: string;
  school: string;
  description: string;
};

type ContactLink = {
  href: string;
  label: string;
  external?: boolean;
  icon?: ReactNode;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "HOME", href: "#home", highlight: true },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "FORMATION", href: "#formation" },
  { label: "CV", href: "#cv" },
  { label: "CONTACT", href: "#contact" },
];

const SKILL_BLOCKS: SkillBlock[] = [
  { title: "Langages", items: ["HTML", "CSS", "JavaScript", "Python", "SQL"] },
  { title: "Outils", items: ["VS Code", "GitHub", "Git", "Pack Office"] },
  {
    title: "Web",
    items: [
      "Intégration responsive",
      "Structure de page",
      "Interface claire et lisible",
    ],
  },
  {
    title: "Qualités",
    items: ["Sérieux", "Autonomie", "Curiosité", "Adaptabilité"],
  },
];

const FORMATION_ITEMS: FormationItem[] = [
  {
    date: "2025 - 2027",
    title: "BTS SIO - option SLAM",
    school: "École Aurlom",
    description:
      "Formation orientée développement d’applications, web, bases de données et logique de programmation.",
  },
  {
    date: "2023 - 2025",
    title: "Licence 1 Math-Info",
    school: "Université Gustave Eiffel",
    description:
      "Parcours universitaire avec des bases en mathématiques et en informatique.",
  },
  {
    date: "2022 - 2023",
    title: "Baccalauréat général",
    school: "Lycée Châtenay-Malabry",
    description: "Spécialités Mathématiques et NSI.",
  },
];

const CONTACT_LINKS: ContactLink[] = [
  {
    href: "mailto:saggalwaniss@gmail.com",
    label: "saggalwaniss@gmail.com",
    icon: <Mail className="w-4 h-4 shrink-0" />,
  },
  {
    href: "https://www.linkedin.com/in/waniss-saggal-bab193214",
    label: "LinkedIn",
    external: true,
  },
];

const BlurText = memo(function BlurText({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const translateY = direction === "top" ? "-20px" : "20px";

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${translateY})`,
            transition: `filter 0.5s ease-out ${index * delay}ms, opacity 0.5s ease-out ${index * delay}ms, transform 0.5s ease-out ${index * delay}ms`,
            willChange: "filter, opacity, transform",
          }}
        >
          {segment}
          {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
});

const SectionLabel = memo(function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="text-base md:text-lg tracking-[0.22em] text-neutral-500 mb-5">
      {children}
    </p>
  );
});

const SectionHeading = memo(function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-3xl md:text-5xl font-bold leading-tight ${className}`}>
      {children}
    </h2>
  );
});

const NavMenu = memo(function NavMenu({
  isDark,
  items,
  onClose,
}: {
  isDark: boolean;
  items: MenuItem[];
  onClose: () => void;
}) {
  const defaultColor = isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)";

  return (
    <div
      className="absolute top-full left-0 w-[200px] md:w-[240px] mt-2 ml-4 p-4 rounded-xl shadow-2xl z-[100]"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 5%)" : "hsl(0 0% 97%)",
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
        }`,
      }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={onClose}
          className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 rounded-md transition-colors duration-200"
          style={{
            color: item.highlight ? "#C3E41D" : defaultColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C3E41D";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = item.highlight
              ? "#C3E41D"
              : defaultColor;
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
});

const ThemeToggle = memo(function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full transition-colors duration-300"
      style={{ backgroundColor: isDark ? "hsl(0 0% 18%)" : "hsl(0 0% 85%)" }}
      aria-label="Basculer le thème"
    >
      <span
        className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full"
        style={{
          backgroundColor: isDark ? "#fff" : "#111",
          transform: isDark ? "translateX(28px)" : "translateX(0)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      />
    </button>
  );
});

const SkillCard = memo(function SkillCard({
  title,
  items,
  isDark,
}: SkillBlock & { isDark: boolean }) {
  return (
    <div
      className="rounded-3xl p-6 transition-colors duration-300"
      style={{
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
        }`,
        backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)",
      }}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2"
            style={{ color: isDark ? "#a3a3a3" : "#404040" }}
          >
            <span style={{ color: "#C3E41D", fontSize: "0.6rem" }}>●</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

const FormationRow = memo(function FormationRow({
  date,
  title,
  school,
  description,
  isDark,
}: FormationItem & { isDark: boolean }) {
  return (
    <div
      className="grid md:grid-cols-[180px_1fr] gap-3 md:gap-4 pt-6"
      style={{
        borderTop: `1px solid ${
          isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"
        }`,
      }}
    >
      <div
        className="text-sm md:text-base"
        style={{ color: isDark ? "#737373" : "#666" }}
      >
        {date}
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-semibold">
          {title} —{" "}
          <span
            className="font-normal"
            style={{ color: isDark ? "#a3a3a3" : "#555" }}
          >
            {school}
          </span>
        </h3>
        <p
          className="mt-2 text-sm md:text-base leading-relaxed"
          style={{ color: isDark ? "#a3a3a3" : "#555" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
});

const ContactPill = memo(function ContactPill({
  href,
  label,
  icon,
  external,
  isDark,
}: ContactLink & { isDark: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full text-sm sm:text-base transition-colors duration-200"
      style={{
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"
        }`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </a>
  );
});

export default function Component() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const sectionClass =
    "max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-24";
  const fgColor = isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)";
  const bgColor = isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)";
  const mutedColor = isDark ? "#a3a3a3" : "#404040";

  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{ backgroundColor: bgColor, color: fgColor }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-200 rounded-md"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
              ) : (
                <Menu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div ref={menuRef}>
                <NavMenu
                  isDark={isDark}
                  items={MENU_ITEMS}
                  onClose={closeMenu}
                />
              </div>
            )}
          </div>

          <span
            className="text-lg sm:text-2xl select-none whitespace-nowrap"
            style={{
              color: fgColor,
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            Portfolio
          </span>

          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="relative min-h-screen flex flex-col"
          aria-label="Accueil"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2 sm:px-4">
            <div className="relative text-center flex flex-col items-center">
              <BlurText
                text="WANISS"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] xl:text-[210px]"
                style={{
                  color: "#C3E41D",
                  fontFamily: "'Fira Code', monospace",
                  display: "flex",
                }}
              />
              <BlurText
                text="SAGGAL"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[15vw] xl:text-[210px]"
                style={{
                  color: "#C3E41D",
                  fontFamily: "'Fira Code', monospace",
                  display: "flex",
                }}
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="relative rounded-full overflow-hidden shadow-2xl hover:scale-110 active:scale-105 transition-transform duration-300 cursor-pointer"
                  style={{
                    width: "clamp(55px, 8vw, 129px)",
                    height: "clamp(92px, 13.5vw, 218px)",
                  }}
                >
                  <Image
                    src="/moi.jpg"
                    alt="Photo de profil de Waniss Saggal"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 w-full px-6">
            <div className="flex justify-center">
              <BlurText
                text="Étudiant en BTS SIO SLAM, passionné par le développement web et applicatif."
                delay={150}
                animateBy="words"
                direction="top"
                className="text-sm sm:text-base md:text-lg lg:text-xl text-center transition-colors duration-300"
                style={{ fontFamily: "'Antic', sans-serif", color: mutedColor }}
              />
            </div>
          </div>
        </section>

        <section id="about" className={sectionClass} aria-label="À propos">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <SectionLabel>ABOUT</SectionLabel>
              <SectionHeading>
                Un portfolio étudiant pour présenter mon parcours et mes projets.
              </SectionHeading>
            </div>

            <div
              className="space-y-4 text-base md:text-lg leading-relaxed"
              style={{ color: mutedColor }}
            >
              <p>
                Je suis étudiant en BTS SIO option SLAM et je m’intéresse au
                développement web, à la programmation et à la création
                d’interfaces modernes.
              </p>
              <p>
                À travers mes projets scolaires et personnels, je développe mes
                compétences en HTML, CSS, JavaScript, Python et SQL.
              </p>
              <p>
                Mon objectif est de continuer à progresser techniquement et de
                construire un profil solide dans le développement applicatif.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className={sectionClass} aria-label="Compétences">
          <SectionLabel>SKILLS</SectionLabel>
          <SectionHeading className="mb-10">Compétences</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {SKILL_BLOCKS.map((block) => (
              <SkillCard key={block.title} {...block} isDark={isDark} />
            ))}
          </div>
        </section>

        <section id="projects" className={sectionClass} aria-label="Projets">
          <LandingAccordionItem />
        </section>

        <section id="formation" className={sectionClass} aria-label="Formation">
          <SectionLabel>FORMATION</SectionLabel>
          <SectionHeading className="mb-10">Parcours académique</SectionHeading>

          <div className="space-y-6">
            {FORMATION_ITEMS.map((item) => (
              <FormationRow
                key={`${item.title}-${item.school}`}
                {...item}
                isDark={isDark}
              />
            ))}
          </div>
        </section>

        <section id="cv" className={sectionClass} aria-label="CV">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionLabel>CV</SectionLabel>
              <SectionHeading className="mb-6">Mon CV en PDF</SectionHeading>
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: mutedColor }}
              >
                Retrouvez mon CV en version PDF pour découvrir mon parcours, ma
                formation en BTS SIO SLAM, mes compétences techniques et mes
                projets.
              </p>

              <a
                href="/cv-waniss.pdf"
                download
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold hover:opacity-85 active:scale-95 transition-all duration-200"
                style={{ backgroundColor: "#C3E41D", color: "#000" }}
              >
                Télécharger le CV
              </a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <a
                href="/cv-waniss.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir le CV en PDF"
                className="block w-[160px] sm:w-[180px] rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300"
                style={{
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"
                  }`,
                }}
              >
                <Image
                  src="/cv-preview.png"
                  alt="Aperçu du CV de Waniss Saggal"
                  width={180}
                  height={254}
                  className="w-full h-auto object-cover"
                />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className={sectionClass} aria-label="Contact">
          <div
            className="rounded-[2rem] p-6 sm:p-8 md:p-12"
            style={{
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              }`,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
            }}
          >
            <SectionLabel>CONTACT</SectionLabel>
            <SectionHeading className="mb-4">Me contacter</SectionHeading>

            <p
              className="text-base md:text-lg max-w-2xl mb-8"
              style={{ color: mutedColor }}
            >
              Disponible pour échanger autour d’un stage, d’une alternance ou
              d’un projet.
            </p>

            <div className="flex flex-wrap gap-3">
              {CONTACT_LINKS.map((link) => (
                <ContactPill key={link.label} {...link} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}