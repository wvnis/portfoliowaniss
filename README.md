# Portfolio de Waniss Saggal

Portfolio Next.js publié sur GitHub Pages : https://wvnis.github.io/portfoliowaniss/

## Développement

```sh
npm ci
python scripts/fetch_news.py
npm run dev
```

Le script de veille utilise uniquement la bibliothèque standard de Python 3.12.

## Ajouter un récit au journal

Ajouter une entrée dans `data/journal.ts` : un `slug` unique, un titre, une date au format `AAAA-MM-JJ`, une catégorie, un résumé, les étapes et les liens. La liste du blog et la page de chaque article sont générées automatiquement. Ne conserver que les étapes réellement réalisées.

## Modifier les sources de veille

Les sources RSS se trouvent dans `data/news-sources.json`. Elles sont actuellement Frandroid et le Blog du Modérateur. Le script retient les titres liés à l’IA et au développement, supprime les doublons et conserve les articles récents (60 jours maximum, 60 articles maximum). Les mots-clés sont définis dans `scripts/fetch_news.py` et peuvent être ajustés. Aucun texte intégral d’article n’est republié.

La veille est récupérée lors de la compilation et, après intégration sur `main`, toutes les six heures par GitHub Actions. GitHub peut retarder les exécutions planifiées ; il ne s’agit pas d’un flux en temps réel. Si une source est indisponible, les derniers articles présents dans le fichier de cache sont conservés et un message apparaît dans le blog. La collecte à partir de `portfolio_2` ne publie pas le site de production.

## Validation

```sh
python -m unittest discover -s scripts -p "test_*.py"
npm run lint
npx tsc --noEmit
```

Pour compiler pour GitHub Pages, définir `GITHUB_PAGES=true`, puis exécuter `npm run build`. Le résultat statique est dans `out/`. Le workflow de validation fournit également une archive `portfolio-preview` pour la branche `portfolio_2`.

Les modifications du CV restent indépendantes : remplacer `public/cv-waniss.pdf` et `public/cv-preview.png` lorsqu’un nouveau CV est prêt.
