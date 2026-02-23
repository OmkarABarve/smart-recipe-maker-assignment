/**
 * Ingredient text normalization utilities.
 *
 * Pipeline:
 *  1. Lowercase
 *  2. Trim whitespace
 *  3. Strip common qualifiers (fresh, dried, frozen, chopped, etc.)
 *  4. Remove simple plurals ("s" suffix) + known irregular plurals
 *  5. Resolve aliases / synonyms to a canonical name
 */

// ── Irregular plural map ─────────────────────────────────────
const IRREGULAR_PLURALS: Record<string, string> = {
  tomatoes: "tomato",
  potatoes: "potato",
  anchovies: "anchovy",
  berries: "berry",
  blueberries: "blueberry",
  strawberries: "strawberry",
  cherries: "cherry",
  leaves: "leaf",
  loaves: "loaf",
  halves: "half",
  olives: "olive",
};

// ── Qualifiers to strip ──────────────────────────────────────
const QUALIFIERS = [
  "fresh",
  "dried",
  "frozen",
  "chopped",
  "diced",
  "minced",
  "sliced",
  "grated",
  "shredded",
  "crushed",
  "ground",
  "whole",
  "raw",
  "cooked",
  "canned",
  "boneless",
  "skinless",
  "organic",
  "large",
  "small",
  "medium",
  "thin",
  "thick",
  "ripe",
  "peeled",
];

const qualifierPattern = new RegExp(
  `\\b(${QUALIFIERS.join("|")})\\b`,
  "gi"
);

// ── Alias / synonym map (bidirectional where needed) ─────────
// Maps alternate names → canonical name used in the recipe dataset.
const ALIASES: Record<string, string> = {
  // Vegetables
  capsicum: "bell pepper",
  aubergine: "eggplant",
  courgette: "zucchini",
  "spring onion": "green onion",
  scallion: "green onion",
  "green shallot": "green onion",
  "roma tomato": "tomato",
  "cherry tomato": "tomato",
  "plum tomato": "tomato",
  "baby spinach": "spinach",

  // Proteins
  "chicken thigh": "chicken thigh",
  "chicken leg": "chicken thigh",
  "chicken drumstick": "chicken thigh",
  beef: "ground beef",
  "minced beef": "ground beef",
  "beef mince": "ground beef",
  prawn: "shrimp",
  "king prawn": "shrimp",
  "paneer cheese": "paneer",
  "firm tofu": "tofu",
  "silken tofu": "tofu",

  // Dairy / alternatives
  "heavy cream": "cream",
  "double cream": "cream",
  "whipping cream": "cream",
  "single cream": "cream",
  "greek yogurt": "yogurt",
  "plain yogurt": "yogurt",
  "natural yogurt": "yogurt",
  "mozzarella cheese": "mozzarella",
  "cheddar": "cheddar cheese",
  "parmesan cheese": "parmesan",
  "parmigiano": "parmesan",
  "feta": "feta cheese",
  "gruyere": "gruyere cheese",

  // Grains / carbs
  "spaghetti noodle": "spaghetti",
  "penne pasta": "penne",
  "basmati rice": "rice",
  "jasmine rice": "rice",
  "white rice": "rice",
  "brown rice": "rice",
  "long grain rice": "rice",
  "all purpose flour": "flour",
  "plain flour": "flour",
  "ap flour": "flour",
  "rolled oat": "oat",
  "old fashioned oat": "oat",

  // Condiments / sauces
  "soya sauce": "soy sauce",
  "tamari": "soy sauce",
  "extra virgin olive oil": "olive oil",
  "evoo": "olive oil",
  "canola oil": "vegetable oil",
  "sunflower oil": "vegetable oil",
  "rapeseed oil": "vegetable oil",

  // Spices
  "red pepper flake": "chili flakes",
  "crushed red pepper": "chili flakes",
  "cayenne": "chili powder",
  "cayenne pepper": "chili powder",
  "coriander": "cilantro",
  "fresh coriander": "cilantro",

  // Other
  "lemon juice": "lemon",
  "lime juice": "lime",
};

/**
 * Normalize a single ingredient string to its canonical form.
 */
export function normalize(raw: string): string {
  let text = raw.toLowerCase().trim();

  // Strip qualifiers
  text = text.replace(qualifierPattern, "").trim();

  // Collapse multiple spaces
  text = text.replace(/\s{2,}/g, " ");

  // Resolve irregular plurals first (before generic s-strip)
  if (IRREGULAR_PLURALS[text]) {
    text = IRREGULAR_PLURALS[text];
  }

  // Simple plural strip: remove trailing "s" if the word is > 3 chars
  // but avoid stripping words like "peas" → "pea" correctly, "asparagus" → keep
  const words = text.split(" ");
  const depluralized = words.map((w) => {
    if (IRREGULAR_PLURALS[w]) return IRREGULAR_PLURALS[w];
    if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) {
      return w.slice(0, -1);
    }
    return w;
  });
  text = depluralized.join(" ");

  // Resolve aliases
  if (ALIASES[text]) {
    text = ALIASES[text];
  }

  return text;
}

/**
 * Normalize an array of ingredient strings.
 */
export function normalizeAll(items: string[]): string[] {
  return items.map(normalize);
}
