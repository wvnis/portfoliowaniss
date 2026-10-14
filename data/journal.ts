export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  introduction?: string[];
  objective?: string;
  technologies?: string[];
  steps: { title: string; text: string; details?: string[] }[];
  outcome?: string;
  nextSteps?: string[];
  links: { label: string; href: string }[];
};

export const journal: JournalEntry[] = [
  {
    slug: "evolution-du-portfolio",
    title: "Faire évoluer mon portfolio",
    date: "2026-10-14",
    category: "Portfolio",
    summary:
      "Comment faire évoluer un site déjà en ligne en conservant son accueil et ses animations : les liens des projets, le journal et les actualités tech, expliqués étape par étape.",
    introduction: [
      "Mon portfolio est le point de départ pour découvrir mon profil, ma formation en BTS SIO SLAM, mes compétences et mes projets. Il possède déjà une identité visuelle noire et verte, une photo de profil, un CV et une présentation des projets avec des cases animées.",
      "Pour cette mise à jour, je veux rendre les réalisations plus faciles à découvrir et ajouter un espace dans lequel expliquer leur progression. Le journal permet de raconter les étapes d’un projet ; les Actualités tech permettent de suivre les nouveautés publiées par Frandroid et le Blog du Modérateur.",
    ],
    objective:
      "Conserver la page d’accueil d’origine et ses animations, rendre les cases des projets directement cliquables et ajouter un accès au Blog entre le CV et le contact. Dans le Blog, le journal vient en premier, puis les actualités des sept derniers jours.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Pages",
      "Python · collecte RSS",
    ],
    steps: [
      {
        title: "Définir les changements utiles",
        text: "La première étape consiste à identifier ce qui doit évoluer dans le site. Les projets doivent pouvoir être ouverts depuis leurs cases et le portfolio doit proposer une page pour raconter les réalisations avec davantage de détails.",
        details: [
          "Le choix final est de conserver l’accueil d’origine : son style, ses textes et l’animation des projets. L’ajout du Blog se fait dans un bloc placé entre « Mon CV en PDF » et « Me contacter ». Le CV reste une mise à jour séparée.",
          "Ce cadre donne un objectif précis à la modification : ajouter les accès et les contenus demandés tout en gardant la présentation existante.",
        ],
      },
      {
        title: "Préparer une version sur portfolio_2",
        text: "La branche portfolio_2 sert à préparer les changements avant de les intégrer dans la version publiée du site. Elle permet de travailler sur les fichiers, de tester le résultat et de regarder un aperçu avant la mise en ligne.",
        details: [
          "Le portfolio est construit avec Next.js, React et TypeScript. Les styles utilisent Tailwind CSS et le site est exporté sous forme de pages statiques pour GitHub Pages.",
          "Les pages du Blog et du journal doivent donc être générées à la compilation. Cette contrainte est aussi prise en compte pour la récupération des actualités.",
        ],
      },
      {
        title: "Rendre les cases des projets cliquables",
        text: "Les liens ajoutés permettent d’ouvrir le portfolio lui-même, le site réalisé pour un ami et la version actuelle de Bonpass. Le clic porte directement sur la case du projet.",
        details: [
          "Les dimensions, les images, les transitions de largeur et les effets de texte de la présentation d’origine sont conservés. Le survol continue d’agrandir une case comme auparavant.",
          "Les sites s’ouvrent dans un nouvel onglet pour garder le portfolio accessible. Le clic est vérifié sur ordinateur et sur mobile, où les projets utilisent la présentation déjà prévue par le site.",
        ],
      },
      {
        title: "Ajouter le Blog à la bonne place",
        text: "Le bloc Blog prend place après le CV et avant le contact. Son bouton mène vers une page dédiée qui regroupe le journal de progression et les Actualités tech.",
        details: [
          "Les deux rubriques se suivent sur toute la largeur : le journal d’abord, puis les actualités en dessous. Cette organisation garde un ordre de lecture clair sur ordinateur comme sur téléphone.",
          "Le journal présente le contexte, les objectifs, les choix techniques et les étapes de chaque réalisation. Un article détaillé permet ensuite de suivre le déroulement du projet.",
        ],
      },
      {
        title: "Récupérer les actualités automatiquement",
        text: "Les sources choisies sont Frandroid et le Blog du Modérateur. La collecte utilise leurs flux RSS pour récupérer les titres, les dates et les liens des articles liés à l’IA et au développement.",
        details: [
          "Un script Python filtre les thèmes pertinents et retire les doublons. La page affiche le nom de la source et un lien vers l’article original. Les recherches et les filtres permettent de retrouver les sujets qui intéressent le lecteur.",
          "Une exécution quotidienne est prévue dans GitHub Actions après la publication de cette version sur la branche main. L’index déjà publié est repris avant d’ajouter les nouveaux articles, ce qui permet de garder l’historique d’un jour à l’autre.",
        ],
      },
      {
        title: "Limiter l’historique à une semaine",
        text: "La rubrique Actualités tech conserve une fenêtre glissante de sept jours. À chaque collecte, les articles trop anciens sont retirés de l’index, tandis que les articles récents des jours précédents restent disponibles.",
        details: [
          "La page contrôle aussi l’âge des articles dans le navigateur. Un article qui dépasse sept jours est masqué automatiquement, y compris si la récupération quotidienne rencontre un problème.",
          "Lorsqu’une source ne répond pas, les articles déjà disponibles sont conservés uniquement tant qu’ils restent dans cette période. Le lecteur peut ainsi consulter les contenus encore récents.",
        ],
      },
      {
        title: "Vérifier le résultat avant publication",
        text: "La compilation et la vérification du code contrôlent que les pages peuvent être générées pour GitHub Pages. Les tests de collecte vérifient le filtrage, la gestion de l’historique et la suppression des articles expirés.",
        details: [
          "Les vérifications dans le navigateur portent sur la disposition des rubriques, le clic sur les cases, l’ouverture du Blog et l’affichage sur ordinateur et mobile.",
          "L’accueil est comparé avec sa version d’origine pour vérifier que seul le bloc Blog a été ajouté et que les styles de l’animation des projets sont restés identiques. Le résultat est enregistré sur portfolio_2 et contrôlé par GitHub Actions.",
        ],
      },
    ],
    outcome:
      "Cette version conserve l’identité du portfolio et ajoute des accès directs aux projets. Le Blog rassemble un journal détaillé et des actualités tech actualisées quotidiennement après publication, avec un historique limité à une semaine. Les changements sont préparés sur une branche dédiée et vérifiés avant leur intégration.",
    nextSteps: [
      "Raconter la réalisation du site pour mon ami avec les étapes, les technologies et les captures du projet.",
      "Présenter Bonpass : son objectif, mon rôle, les fonctionnalités réalisées et les prochaines évolutions.",
      "Ajouter des exemples concrets aux articles pour illustrer les choix techniques et les difficultés rencontrées.",
    ],
    links: [
      {
        label: "Voir le code du portfolio",
        href: "https://github.com/wvnis/portfoliowaniss/tree/portfolio_2",
      },
    ],
  },
];
