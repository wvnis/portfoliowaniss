export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  steps: { title: string; text: string }[];
  links: { label: string; href: string }[];
};

export const journal: JournalEntry[] = [
  {
    slug: "evolution-du-portfolio",
    title: "Faire évoluer mon portfolio",
    date: "2026-10-14",
    category: "Portfolio",
    summary:
      "Les étapes de cette nouvelle version : des projets accessibles, une navigation plus claire et un espace pour partager ma progression.",
    steps: [
      {
        title: "Partir de la première version",
        text: "Mon portfolio présente mon profil, mes compétences, mes projets et ma formation en BTS SIO SLAM. Je conserve son identité noire et verte ainsi que les cases animées de la section projets.",
      },
      {
        title: "Donner accès aux projets",
        text: "J’ajoute les liens du portfolio, du site réalisé pour un ami et de la version actuelle de Bonpass. Chaque projet qui possède un site peut maintenant être ouvert directement depuis sa case, sur ordinateur comme sur mobile.",
      },
      {
        title: "Améliorer la navigation",
        text: "L’accueil propose des accès directs aux projets et au CV. Le menu est en français, le thème choisi est mémorisé et la navigation au clavier est améliorée.",
      },
      {
        title: "Créer un journal et une veille",
        text: "Cette page rassemble deux espaces : un journal pour raconter les étapes de mes réalisations et une veille pour retrouver les articles de Frandroid et du Blog du Modérateur liés à l’IA et au développement.",
      },
    ],
    links: [
      {
        label: "Voir le code du portfolio",
        href: "https://github.com/wvnis/portfoliowaniss/tree/portfolio_2",
      },
    ],
  },
];
