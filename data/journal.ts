export type JournalEntry = {
  slug: string;
  title: string;
  date: string;
  category: string;
  status?: string;
  role?: string;
  origin?: string;
  summary: string;
  introduction?: string[];
  objective?: string;
  objectiveTitle?: string;
  technologies?: string[];
  steps: { title: string; text: string; details?: string[] }[];
  outcome?: string;
  outcomeTitle?: string;
  challenge?: string;
  nextSteps?: string[];
  links: { label: string; href: string }[];
};

export const journal: JournalEntry[] = [
  {
    slug: "bonpass-carte-fidelite-digitale",
    title: "Bonpass : développer mon idée de carte de fidélité digitale",
    date: "2026-10-14",
    category: "Bonpass",
    status: "En développement",
    role: "Développeur de l’application et à l’origine de l’idée",
    origin:
      "Un projet personnel que je développe au sein de mon entreprise, avec son soutien.",
    summary:
      "Bonpass est mon projet d’application de carte de fidélité digitale. Je raconte l’origine de l’idée, mon rôle de développeur et le défi d’avancer sur un projet ambitieux tout en construisant mes compétences.",
    introduction: [
      "Bonpass part d’une idée qui vient de moi : créer une application de carte de fidélité digitale. Je porte ce projet et j’en assure le développement. C’est une réalisation personnelle que je construis actuellement au sein de mon entreprise.",
      "Le projet représente un défi important pour moi. Je me suis lancé dans une application d’une ampleur supérieure à mon expérience de départ, et mon entreprise m’apporte de l’aide pour continuer à avancer.",
    ],
    objectiveTitle: "L’objectif de Bonpass",
    objective:
      "Transformer mon idée de carte de fidélité digitale en une application concrète, en poursuivant son développement et en progressant sur les compétences nécessaires au projet.",
    challenge:
      "La principale difficulté est l’ampleur de Bonpass par rapport à mes compétences de départ. Je développe l’application tout en continuant à apprendre. Le soutien de mon entreprise m’aide à avancer sur ce projet exigeant, dont l’idée et l’initiative viennent de moi.",
    steps: [
      {
        title: "Partir d’une idée personnelle",
        text: "L’idée de Bonpass est née de mon envie de créer une application autour de la fidélité digitale. Je suis à l’origine du concept et j’ai décidé de me lancer dans sa réalisation.",
        details: [
          "Ce journal permet de garder une trace de la progression du projet, depuis cette idée de départ jusqu’aux prochaines étapes du développement.",
        ],
      },
      {
        title: "Prendre le rôle de développeur",
        text: "Mon rôle dans Bonpass est celui du développeur de l’application. Je suis en train de la créer et de faire avancer mon idée vers une réalisation utilisable.",
        details: [
          "Le projet est encore en développement. Les fonctionnalités et les écrans pourront continuer à évoluer au fur et à mesure de son avancement ; je documenterai les réalisations concrètes dans les prochains récits.",
        ],
      },
      {
        title: "Développer le projet au sein de mon entreprise",
        text: "Je travaille sur Bonpass dans mon entreprise et je bénéficie de son aide pour progresser. Cet accompagnement fait partie du contexte dans lequel je construis l’application.",
        details: [
          "L’idée et l’initiative du projet viennent de moi. Mon entreprise m’apporte un soutien pour avancer dans le développement et faire face à un projet plus ambitieux que mon expérience initiale.",
        ],
      },
      {
        title: "Apprendre face à un projet ambitieux",
        text: "Bonpass est actuellement le projet qui me pose le plus de difficultés. Je me suis lancé alors que mes compétences étaient encore en construction, et je continue à apprendre en développant l’application.",
        details: [
          "Cette progression fait partie du projet : le journal doit aussi montrer les difficultés rencontrées et les étapes d’apprentissage, en plus des réalisations. Je pourrai y ajouter des exemples précis au fil du développement.",
        ],
      },
      {
        title: "Partager l’état actuel de Bonpass",
        text: "Le site actuel de Bonpass est accessible en ligne. Il constitue le lien que je partage pour présenter le projet pendant que je poursuis la création de l’application.",
        details: [
          "Bonpass reste un projet en cours. Les prochains articles permettront de suivre ses évolutions et de présenter les fonctionnalités au moment où elles seront réalisées.",
        ],
      },
    ],
    outcomeTitle: "Où en est Bonpass aujourd’hui ?",
    outcome:
      "Je suis toujours en train de développer Bonpass. Le projet repose sur mon idée de carte de fidélité digitale, avec un accompagnement de mon entreprise. Mon objectif est de continuer à faire avancer l’application et de raconter cette progression avec des exemples concrets dans le journal.",
    nextSteps: [
      "Poursuivre le développement de l’application et raconter les prochaines avancées.",
      "Présenter les fonctionnalités réalisées et les choix techniques au fur et à mesure.",
      "Illustrer les difficultés et les solutions trouvées avec des exemples et des captures.",
    ],
    links: [
      {
        label: "Découvrir le site actuel de Bonpass",
        href: "https://www.bonpass.crmformation.des-click.com/",
      },
    ],
  },
  {
    slug: "site-pour-un-ami-artiste",
    title: "Créer un site pour présenter les tableaux d’un ami artiste",
    date: "2026-10-14",
    category: "Site web",
    status: "En ligne",
    role: "Développeur du site",
    summary:
      "J’ai créé le site elsjnrt.com pour un ami artiste qui réalise les tableaux présentés. Ce projet s’inscrit dans mon activité de création de sites, qui concerne aussi les restaurateurs et d’autres profils.",
    introduction: [
      "J’ai réalisé ce site pour un ami artiste. Les tableaux présentés sont ses créations ; mon rôle est de développer le site qui permet de découvrir son travail en ligne.",
      "Ce projet fait partie de mon activité de création de sites internet. Je réalise également des sites pour des restaurateurs et je prévois une nouvelle réalisation dans les prochaines semaines, que j’ajouterai à mon portfolio.",
    ],
    objectiveTitle: "L’objectif du site",
    objective:
      "Donner une présence en ligne au travail de mon ami artiste et permettre aux visiteurs de découvrir ses tableaux sur un site dédié.",
    steps: [
      {
        title: "Un projet pour un ami artiste",
        text: "Le point de départ de cette réalisation est le travail artistique de mon ami et ses tableaux. J’ai créé un site pour présenter cet univers en ligne.",
        details: [
          "Les œuvres sont celles de l’artiste. Ma contribution dans ce projet est la création du site internet qui les présente.",
        ],
      },
      {
        title: "Créer le site internet",
        text: "J’ai assuré le développement du site. Cette réalisation permet de passer d’une collection de tableaux à une présence en ligne accessible à partir d’une adresse dédiée.",
        details: [
          "Le journal pourra être complété avec les choix techniques et des captures du site pour montrer plus précisément sa réalisation.",
        ],
      },
      {
        title: "Donner accès au résultat",
        text: "Le site est accessible à l’adresse elsjnrt.com. Son lien est également ajouté aux projets de mon portfolio pour permettre aux visiteurs de découvrir la réalisation.",
        details: [
          "Le site et son récit se complètent : le lien permet de voir le résultat, tandis que le journal présente le contexte du projet et mon rôle de développeur.",
        ],
      },
      {
        title: "Continuer mon activité de création web",
        text: "La création de sites ne se limite pas à ce projet artistique. Elle concerne aussi les restaurateurs et d’autres profils pour lesquels je crée des sites internet.",
        details: [
          "Un nouveau site est prévu dans les prochaines semaines. Je compte l’ajouter au portfolio et raconter sa réalisation lorsqu’il sera créé.",
        ],
      },
    ],
    outcome:
      "Le site réalisé pour mon ami artiste est en ligne et permet de découvrir ses tableaux. Il constitue une réalisation concrète de mon activité de développeur web, aux côtés de mon portfolio et de Bonpass, qui est toujours en développement.",
    nextSteps: [
      "Compléter ce récit avec les technologies utilisées et des captures du site.",
      "Ajouter le prochain site au portfolio une fois sa réalisation terminée.",
      "Documenter les futures créations de sites, notamment pour les restaurateurs.",
    ],
    links: [
      {
        label: "Voir le site de l’artiste",
        href: "https://elsjnrt.com/",
      },
    ],
  },
  {
    slug: "evolution-du-portfolio",
    title: "Faire évoluer mon portfolio",
    date: "2026-10-14",
    category: "Portfolio",
    role: "Développeur de mon portfolio",
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
      "Compléter les récits de Bonpass et du site pour mon ami avec les choix techniques et les captures des projets.",
      "Ajouter au portfolio le prochain site prévu dans les semaines à venir.",
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
