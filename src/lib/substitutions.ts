import { Substitution } from "@/types";

/**
 * Hand-curated substitution map.
 * Key = ingredient that a recipe requires (normalized name).
 * Value = array of possible replacements with a similarity score (0-1).
 */
export const SUBSTITUTION_MAP: Record<
  string,
  { replacement: string; similarity: number }[]
> = {
  // ── Dairy ──────────────────────────────────────────────
  butter: [
    { replacement: "margarine", similarity: 0.9 },
    { replacement: "olive oil", similarity: 0.7 },
    { replacement: "coconut oil", similarity: 0.65 },
  ],
  milk: [
    { replacement: "oat milk", similarity: 0.85 },
    { replacement: "almond milk", similarity: 0.8 },
    { replacement: "soy milk", similarity: 0.8 },
    { replacement: "coconut milk", similarity: 0.7 },
  ],
  cream: [
    { replacement: "coconut cream", similarity: 0.8 },
    { replacement: "coconut milk", similarity: 0.7 },
    { replacement: "milk", similarity: 0.6 },
  ],
  yogurt: [
    { replacement: "sour cream", similarity: 0.85 },
    { replacement: "coconut yogurt", similarity: 0.75 },
  ],
  "sour cream": [
    { replacement: "yogurt", similarity: 0.85 },
    { replacement: "cream cheese", similarity: 0.7 },
  ],
  mozzarella: [
    { replacement: "provolone", similarity: 0.8 },
    { replacement: "cheddar cheese", similarity: 0.6 },
  ],
  "cheddar cheese": [
    { replacement: "mozzarella", similarity: 0.65 },
    { replacement: "gruyere cheese", similarity: 0.7 },
  ],
  "feta cheese": [
    { replacement: "goat cheese", similarity: 0.8 },
    { replacement: "ricotta", similarity: 0.6 },
  ],
  "gruyere cheese": [
    { replacement: "swiss cheese", similarity: 0.85 },
    { replacement: "cheddar cheese", similarity: 0.6 },
  ],
  parmesan: [
    { replacement: "pecorino", similarity: 0.85 },
    { replacement: "nutritional yeast", similarity: 0.5 },
  ],

  // ── Proteins ───────────────────────────────────────────
  "chicken breast": [
    { replacement: "chicken thigh", similarity: 0.9 },
    { replacement: "turkey breast", similarity: 0.8 },
    { replacement: "tofu", similarity: 0.5 },
  ],
  "chicken thigh": [
    { replacement: "chicken breast", similarity: 0.9 },
    { replacement: "turkey thigh", similarity: 0.8 },
  ],
  "ground beef": [
    { replacement: "ground turkey", similarity: 0.85 },
    { replacement: "ground pork", similarity: 0.8 },
    { replacement: "ground chicken", similarity: 0.75 },
  ],
  "beef sirloin": [
    { replacement: "ground beef", similarity: 0.65 },
    { replacement: "chicken breast", similarity: 0.5 },
  ],
  bacon: [
    { replacement: "pancetta", similarity: 0.9 },
    { replacement: "turkey bacon", similarity: 0.8 },
  ],
  pancetta: [
    { replacement: "bacon", similarity: 0.9 },
  ],
  shrimp: [
    { replacement: "chicken breast", similarity: 0.5 },
    { replacement: "tofu", similarity: 0.45 },
  ],
  salmon: [
    { replacement: "trout", similarity: 0.85 },
    { replacement: "tuna", similarity: 0.7 },
  ],
  egg: [
    { replacement: "flax egg", similarity: 0.6 },
    { replacement: "chia egg", similarity: 0.6 },
    { replacement: "banana", similarity: 0.4 },
  ],
  tofu: [
    { replacement: "paneer", similarity: 0.7 },
    { replacement: "tempeh", similarity: 0.75 },
  ],
  paneer: [
    { replacement: "tofu", similarity: 0.7 },
    { replacement: "halloumi", similarity: 0.75 },
  ],

  // ── Grains / Carbs ────────────────────────────────────
  spaghetti: [
    { replacement: "penne", similarity: 0.85 },
    { replacement: "linguine", similarity: 0.9 },
    { replacement: "rice noodle", similarity: 0.6 },
  ],
  penne: [
    { replacement: "spaghetti", similarity: 0.85 },
    { replacement: "macaroni", similarity: 0.9 },
  ],
  macaroni: [
    { replacement: "penne", similarity: 0.9 },
    { replacement: "spaghetti", similarity: 0.8 },
  ],
  "rice noodle": [
    { replacement: "spaghetti", similarity: 0.6 },
    { replacement: "ramen noodle", similarity: 0.7 },
  ],
  "ramen noodle": [
    { replacement: "rice noodle", similarity: 0.7 },
    { replacement: "spaghetti", similarity: 0.55 },
  ],
  rice: [
    { replacement: "quinoa", similarity: 0.75 },
    { replacement: "couscous", similarity: 0.7 },
    { replacement: "bulgur wheat", similarity: 0.65 },
  ],
  flour: [
    { replacement: "almond flour", similarity: 0.6 },
    { replacement: "whole wheat flour", similarity: 0.85 },
  ],
  bread: [
    { replacement: "pita bread", similarity: 0.75 },
    { replacement: "tortilla", similarity: 0.6 },
  ],
  "pita bread": [
    { replacement: "bread", similarity: 0.75 },
    { replacement: "tortilla", similarity: 0.7 },
    { replacement: "naan", similarity: 0.8 },
  ],
  tortilla: [
    { replacement: "pita bread", similarity: 0.7 },
    { replacement: "bread", similarity: 0.6 },
  ],

  // ── Vegetables ─────────────────────────────────────────
  "bell pepper": [
    { replacement: "poblano pepper", similarity: 0.7 },
    { replacement: "zucchini", similarity: 0.5 },
  ],
  broccoli: [
    { replacement: "cauliflower", similarity: 0.8 },
    { replacement: "broccolini", similarity: 0.9 },
  ],
  spinach: [
    { replacement: "kale", similarity: 0.75 },
    { replacement: "swiss chard", similarity: 0.8 },
  ],
  zucchini: [
    { replacement: "yellow squash", similarity: 0.9 },
    { replacement: "eggplant", similarity: 0.6 },
  ],
  eggplant: [
    { replacement: "zucchini", similarity: 0.6 },
    { replacement: "portobello mushroom", similarity: 0.5 },
  ],
  mushroom: [
    { replacement: "zucchini", similarity: 0.4 },
  ],
  lettuce: [
    { replacement: "romaine lettuce", similarity: 0.9 },
    { replacement: "spinach", similarity: 0.7 },
  ],
  "romaine lettuce": [
    { replacement: "lettuce", similarity: 0.9 },
    { replacement: "spinach", similarity: 0.7 },
  ],
  carrot: [
    { replacement: "sweet potato", similarity: 0.5 },
    { replacement: "parsnip", similarity: 0.7 },
  ],
  potato: [
    { replacement: "sweet potato", similarity: 0.75 },
    { replacement: "cauliflower", similarity: 0.5 },
  ],
  cucumber: [
    { replacement: "zucchini", similarity: 0.5 },
    { replacement: "celery", similarity: 0.4 },
  ],
  tomato: [
    { replacement: "canned tomato", similarity: 0.8 },
    { replacement: "sun-dried tomato", similarity: 0.6 },
  ],
  "canned tomato": [
    { replacement: "tomato", similarity: 0.8 },
    { replacement: "tomato sauce", similarity: 0.75 },
  ],

  // ── Condiments / Sauces ────────────────────────────────
  "soy sauce": [
    { replacement: "tamari", similarity: 0.95 },
    { replacement: "coconut aminos", similarity: 0.8 },
  ],
  "fish sauce": [
    { replacement: "soy sauce", similarity: 0.6 },
  ],
  "tomato sauce": [
    { replacement: "canned tomato", similarity: 0.75 },
    { replacement: "tomato paste", similarity: 0.65 },
  ],
  mayonnaise: [
    { replacement: "yogurt", similarity: 0.55 },
    { replacement: "sour cream", similarity: 0.5 },
  ],
  tahini: [
    { replacement: "peanut butter", similarity: 0.7 },
    { replacement: "almond butter", similarity: 0.7 },
  ],
  "peanut butter": [
    { replacement: "almond butter", similarity: 0.85 },
    { replacement: "tahini", similarity: 0.7 },
    { replacement: "cashew butter", similarity: 0.85 },
  ],

  // ── Sweeteners ─────────────────────────────────────────
  sugar: [
    { replacement: "honey", similarity: 0.8 },
    { replacement: "maple syrup", similarity: 0.75 },
  ],
  honey: [
    { replacement: "maple syrup", similarity: 0.85 },
    { replacement: "agave", similarity: 0.8 },
    { replacement: "sugar", similarity: 0.7 },
  ],
  "maple syrup": [
    { replacement: "honey", similarity: 0.85 },
    { replacement: "agave", similarity: 0.8 },
  ],

  // ── Herbs / Spices ─────────────────────────────────────
  basil: [
    { replacement: "oregano", similarity: 0.65 },
    { replacement: "parsley", similarity: 0.6 },
  ],
  cilantro: [
    { replacement: "parsley", similarity: 0.7 },
    { replacement: "basil", similarity: 0.5 },
  ],
  parsley: [
    { replacement: "cilantro", similarity: 0.7 },
    { replacement: "chive", similarity: 0.5 },
  ],
  oregano: [
    { replacement: "basil", similarity: 0.65 },
    { replacement: "thyme", similarity: 0.7 },
  ],
  thyme: [
    { replacement: "oregano", similarity: 0.7 },
    { replacement: "rosemary", similarity: 0.6 },
  ],
  "garam masala": [
    { replacement: "curry powder", similarity: 0.7 },
  ],
  "curry powder": [
    { replacement: "garam masala", similarity: 0.7 },
  ],
  "green curry paste": [
    { replacement: "red curry paste", similarity: 0.8 },
  ],
  gochujang: [
    { replacement: "sriracha", similarity: 0.6 },
    { replacement: "chili paste", similarity: 0.7 },
  ],

  // ── Acids / Citrus ─────────────────────────────────────
  lemon: [
    { replacement: "lime", similarity: 0.85 },
    { replacement: "vinegar", similarity: 0.5 },
  ],
  lime: [
    { replacement: "lemon", similarity: 0.85 },
  ],
  "balsamic vinegar": [
    { replacement: "red wine vinegar", similarity: 0.7 },
    { replacement: "lemon", similarity: 0.5 },
  ],
  "red wine vinegar": [
    { replacement: "balsamic vinegar", similarity: 0.7 },
    { replacement: "white wine vinegar", similarity: 0.85 },
    { replacement: "lemon", similarity: 0.5 },
  ],

  // ── Oils ───────────────────────────────────────────────
  "olive oil": [
    { replacement: "vegetable oil", similarity: 0.75 },
    { replacement: "butter", similarity: 0.6 },
    { replacement: "coconut oil", similarity: 0.65 },
  ],
  "sesame oil": [
    { replacement: "vegetable oil", similarity: 0.5 },
    { replacement: "peanut oil", similarity: 0.7 },
  ],
  "vegetable oil": [
    { replacement: "olive oil", similarity: 0.75 },
    { replacement: "coconut oil", similarity: 0.7 },
  ],
  "coconut milk": [
    { replacement: "cream", similarity: 0.6 },
    { replacement: "almond milk", similarity: 0.55 },
  ],

  // ── Nuts ───────────────────────────────────────────────
  peanut: [
    { replacement: "cashew", similarity: 0.8 },
    { replacement: "almond", similarity: 0.7 },
  ],

  // ── Legumes ────────────────────────────────────────────
  chickpea: [
    { replacement: "white bean", similarity: 0.75 },
    { replacement: "lentil", similarity: 0.6 },
  ],
  "black bean": [
    { replacement: "kidney bean", similarity: 0.85 },
    { replacement: "pinto bean", similarity: 0.85 },
  ],
  "red lentil": [
    { replacement: "yellow lentil", similarity: 0.9 },
    { replacement: "green lentil", similarity: 0.75 },
  ],

  // ── Other ──────────────────────────────────────────────
  "vegetable broth": [
    { replacement: "chicken broth", similarity: 0.8 },
    { replacement: "beef broth", similarity: 0.7 },
  ],
  "beef broth": [
    { replacement: "vegetable broth", similarity: 0.7 },
    { replacement: "chicken broth", similarity: 0.75 },
  ],
  avocado: [
    { replacement: "hummus", similarity: 0.4 },
  ],
};

/**
 * Find the best substitution for a missing ingredient from the user's available ingredients.
 * Returns null if no substitution is possible.
 */
export function findSubstitution(
  missing: string,
  userIngredients: string[]
): Substitution | null {
  const candidates = SUBSTITUTION_MAP[missing];
  if (!candidates || candidates.length === 0) return null;

  const userSet = new Set(userIngredients);

  let best: { replacement: string; similarity: number } | null = null;
  for (const candidate of candidates) {
    if (userSet.has(candidate.replacement)) {
      if (!best || candidate.similarity > best.similarity) {
        best = candidate;
      }
    }
  }

  if (!best) return null;

  return {
    missing,
    replacement: best.replacement,
    similarity: best.similarity,
  };
}
