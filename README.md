# Smart Recipe Generator

A modern web app that matches recipes to the ingredients you already have, with smart substitution suggestions for anything you're missing.

## Features

- **Ingredient-based recipe matching** — Enter your available ingredients and get ranked results scored by match percentage.
- **Smart substitution suggestions** — Missing an ingredient? The app suggests swaps you can make from what you already have (e.g., use yogurt instead of sour cream).
- **Autocomplete ingredient input** — Tag-style input with suggestions from the recipe dataset, plus keyboard navigation.
- **47 curated recipes** — Spanning Italian, Mexican, Asian, Indian, American, Mediterranean, French, Thai, Middle Eastern, Japanese, Korean, and Spanish cuisines.
- **Responsive design** — Works great on mobile, tablet, and desktop.
- **Dark mode** — Automatic (system preference) with a manual toggle.

## Tech Stack

| Layer       | Technology               |
|-------------|--------------------------|
| Framework   | Next.js 14 (App Router)  |
| Language    | TypeScript               |
| Styling     | Tailwind CSS 3.4         |
| State       | React useState + useMemo |
| Data        | Static local dataset     |
| Deployment  | Vercel                   |

**Zero external runtime dependencies** beyond Next.js, React, and React DOM.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
git clone <your-repo-url>
cd Smart-Recipe-Maker-Assignment
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (metadata, fonts, dark-mode script)
│   ├── page.tsx                # Home page (ingredient input + results grid)
│   ├── not-found.tsx           # Custom 404 page
│   ├── globals.css             # Tailwind directives + custom tokens
│   └── recipe/[id]/page.tsx    # Recipe detail page (SSG)
├── components/
│   ├── IngredientInput.tsx     # Tag-style input with autocomplete
│   ├── RecipeCard.tsx          # Result card with score, matched/missing pills
│   ├── RecipeDetail.tsx        # Full recipe view with instructions
│   ├── SubstitutionBadge.tsx   # "Swap X → Y" chip
│   ├── MatchScoreBadge.tsx     # Circular score percentage badge
│   ├── Header.tsx              # App header with dark mode toggle
│   └── EmptyState.tsx          # Onboarding + no-results states
├── lib/
│   ├── matching.ts             # Scoring algorithm (pure functions)
│   ├── substitutions.ts        # Substitution map + lookup logic
│   ├── normalize.ts            # Ingredient text normalization
│   └── constants.ts            # App-wide configuration
├── data/
│   └── recipes.ts              # Curated recipe dataset (47 recipes)
└── types/
    └── index.ts                # TypeScript interfaces
```

## How the Matching Algorithm Works

For each recipe, the algorithm:

1. **Normalizes** all user ingredients (lowercase, strip plurals, resolve aliases).
2. **Compares** each required recipe ingredient against the user's list.
3. **Finds substitutions** for missing ingredients from what the user has.
4. **Scores** the recipe:

```
baseScore = (matchedCount / requiredCount) × 100
substitutionBonus = Σ(similarity × 0.6) / requiredCount × 100
finalScore = clamp(baseScore + substitutionBonus, 0, 100)
```

- Only required (non-optional) ingredients count toward the score.
- Substitutions count at 60% of a direct match, weighted by similarity.
- Results are sorted by score descending, capped at 20, with a 10% minimum threshold.

## Deployment

### Vercel (recommended)

1. Push to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework preset: **Next.js** (auto-detected).
4. No environment variables needed.
5. Deploy.

No database, no API keys, no serverless functions required.

## License

MIT
