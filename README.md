# Portfolio de Waniss Saggal

Portfolio Next.js publié sur GitHub Pages : https://wvnis.github.io/portfoliowaniss/

L’accueil conserve la version d’origine : les cases des projets ouvrent directement les liens fournis, avec les mêmes animations, et un bloc Blog est ajouté entre le CV et le contact.

## Développement

```sh
npm ci
python scripts/fetch_news.py
npm run dev
```

Le script de veille utilise uniquement la bibliothèque standard de Python 3.12.

## Ajouter un récit au journal

Ajouter une entrée dans `data/journal.ts` : un `slug` unique, un titre, une date au format `AAAA-MM-JJ`, une catégorie, un résumé, les étapes et les liens. La liste du blog et la page de chaque article sont générées automatiquement. Ne conserver que les étapes réellement réalisées.

Pour un récit détaillé, ajouter les champs facultatifs `introduction`, `objective`, `technologies`, `outcome` et `nextSteps`. Chaque étape peut aussi contenir un tableau `details` pour ajouter des paragraphes explicatifs.

Les champs `status`, `role`, `origin` et `challenge` permettent de préciser l’avancement, le rôle de l’auteur, le contexte et les difficultés. `objectiveTitle` et `outcomeTitle` adaptent les intitulés aux projets en cours. Les récits de Bonpass et du site d’artiste reprennent les informations fournies par Waniss ; aucune technologie ou fonctionnalité non confirmée n’y est ajoutée.

## Modifier les sources de veille

Les sources RSS se trouvent dans `data/news-sources.json`. Elles sont actuellement Frandroid et le Blog du Modérateur. Le script retient les titres liés à l’IA et au développement, supprime les doublons et conserve uniquement les articles des sept derniers jours (fenêtre glissante de 168 heures). Les mots-clés sont définis dans `scripts/fetch_news.py` et peuvent être ajustés. Aucun texte intégral d’article n’est republié. Le journal apparaît en premier sur toute la largeur, puis la veille en dessous.

La veille est récupérée lors de la compilation et, après intégration sur `main`, une fois par jour par GitHub Actions. Le workflow télécharge l’index déjà publié avant d’ajouter les nouveaux articles, afin de conserver l’historique d’un jour à l’autre même si un article sort du flux RSS. Les articles de plus de sept jours sont supprimés à chaque collecte et masqués automatiquement dans le navigateur, même si l’actualisation échoue. La page contrôle leur âge chaque minute, recharge les nouvelles données chaque jour et lors du retour sur l’onglet. Si une source est indisponible, ses articles encore valides sont conservés et un message apparaît dans le blog. GitHub peut retarder les exécutions planifiées. La collecte à partir de `portfolio_2` ne publie pas le site de production.

## Validation

```sh
python -m unittest discover -s scripts -p "test_*.py"
npm run lint
npx tsc --noEmit
```

Pour compiler pour GitHub Pages, définir `GITHUB_PAGES=true`, puis exécuter `npm run build`. Le résultat statique est dans `out/`. Le workflow de validation fournit également une archive `portfolio-preview` pour la branche `portfolio_2`.

Les modifications du CV restent indépendantes : remplacer `public/cv-waniss.pdf` et `public/cv-preview.png` lorsqu’un nouveau CV est prêt.
