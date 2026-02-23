"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import IngredientInput from "@/components/IngredientInput";
import RecipeCard from "@/components/RecipeCard";
import EmptyState from "@/components/EmptyState";
import { matchRecipes } from "@/lib/matching";

export default function HomePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  const results = useMemo(
    () => matchRecipes(ingredients),
    [ingredients]
  );

  const hasIngredients = ingredients.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <section className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Find Recipes with What You Have
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            Enter the ingredients in your kitchen and we&apos;ll match you with
            the best recipes — plus smart substitution suggestions.
          </p>
        </section>

        {/* Ingredient input */}
        <section className="mb-8">
          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
          />
        </section>

        {/* Results */}
        <section>
          {!hasIngredients && <EmptyState type="initial" />}

          {hasIngredients && results.length === 0 && (
            <EmptyState type="no-results" />
          )}

          {hasIngredients && results.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Matching Recipes
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({results.length} found)
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((match) => (
                  <RecipeCard key={match.recipe.id} match={match} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Smart Recipe Generator — Built with Next.js, TypeScript &amp; Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
