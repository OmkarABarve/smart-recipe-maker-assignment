// --- Core domain types ---

export interface Ingredient {
  name: string;
  category: IngredientCategory;
}

export type IngredientCategory =
  | "protein"
  | "vegetable"
  | "fruit"
  | "dairy"
  | "grain"
  | "spice"
  | "condiment"
  | "other";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  tags: string[];
  image?: string;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  optional: boolean;
}

// --- Matching result types ---

export interface RecipeMatch {
  recipe: Recipe;
  score: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  substitutions: Substitution[];
}

export interface Substitution {
  missing: string;
  replacement: string;
  similarity: number;
}
