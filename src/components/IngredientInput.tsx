"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { normalize } from "@/lib/normalize";
import { getAllIngredientNames } from "@/data/recipes";
import {
  AUTOCOMPLETE_DEBOUNCE_MS,
  MAX_AUTOCOMPLETE_SUGGESTIONS,
} from "@/lib/constants";

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export default function IngredientInput({
  ingredients,
  onIngredientsChange,
}: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // All known ingredient names from the dataset
  const allNames = useMemo(() => getAllIngredientNames(), []);

  // Debounce the search query
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(inputValue.trim().toLowerCase());
    }, AUTOCOMPLETE_DEBOUNCE_MS);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputValue]);

  // Filter suggestions based on debounced query
  const suggestions = useMemo(() => {
    if (!debouncedQuery) return [];
    const normalizedIngredients = new Set(ingredients.map(normalize));
    return allNames
      .filter(
        (name) =>
          name.includes(debouncedQuery) &&
          !normalizedIngredients.has(normalize(name))
      )
      .slice(0, MAX_AUTOCOMPLETE_SUGGESTIONS);
  }, [debouncedQuery, allNames, ingredients]);

  const addIngredient = useCallback(
    (raw: string) => {
      const normalized = normalize(raw);
      if (!normalized) return;
      // Deduplicate
      const existing = new Set(ingredients.map(normalize));
      if (existing.has(normalized)) return;
      onIngredientsChange([...ingredients, raw.trim()]);
      setInputValue("");
      setShowSuggestions(false);
      setHighlightIndex(-1);
    },
    [ingredients, onIngredientsChange]
  );

  const removeIngredient = useCallback(
    (index: number) => {
      const updated = ingredients.filter((_, i) => i !== index);
      onIngredientsChange(updated);
    },
    [ingredients, onIngredientsChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        addIngredient(suggestions[highlightIndex]);
      } else if (inputValue.trim()) {
        addIngredient(inputValue);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightIndex(-1);
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      ingredients.length > 0
    ) {
      removeIngredient(ingredients.length - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // If user types a comma, add the text before the comma
    if (value.includes(",")) {
      const parts = value.split(",");
      const toAdd = parts[0].trim();
      if (toAdd) addIngredient(toAdd);
      setInputValue(parts.slice(1).join(","));
      return;
    }
    setInputValue(value);
    setShowSuggestions(true);
    setHighlightIndex(-1);
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="w-full">
      <label
        htmlFor="ingredient-input"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        What ingredients do you have?
      </label>

      <div
        className="flex flex-wrap items-center gap-2 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus-within:border-brand-500 dark:focus-within:border-brand-400 transition-colors min-h-[52px] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Tags */}
        {ingredients.map((ing, i) => (
          <span
            key={`${ing}-${i}`}
            className="inline-flex items-center gap-1 px-3 py-1 bg-brand-100 dark:bg-brand-900/40 text-brand-800 dark:text-brand-200 rounded-full text-sm font-medium"
          >
            {ing}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeIngredient(i);
              }}
              className="ml-0.5 hover:text-brand-600 dark:hover:text-brand-300 focus:outline-none"
              aria-label={`Remove ${ing}`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}

        {/* Input */}
        <input
          ref={inputRef}
          id="ingredient-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={
            ingredients.length === 0
              ? "Type an ingredient and press Enter..."
              : "Add more..."
          }
          className="flex-1 min-w-[150px] bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls="ingredient-suggestions"
          aria-activedescendant={
            highlightIndex >= 0
              ? `suggestion-${highlightIndex}`
              : undefined
          }
        />
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          id="ingredient-suggestions"
          role="listbox"
          className="mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-48 overflow-y-auto z-50 relative"
        >
          {suggestions.map((name, idx) => (
            <li
              key={name}
              id={`suggestion-${idx}`}
              role="option"
              aria-selected={idx === highlightIndex}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                idx === highlightIndex
                  ? "bg-brand-100 dark:bg-brand-900/40 text-brand-800 dark:text-brand-200"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                addIngredient(name);
              }}
              onMouseEnter={() => setHighlightIndex(idx)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      {/* Hint text */}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Enter</kbd> or type a <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">,</kbd> to add.{" "}
        <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">Backspace</kbd> to remove last.
      </p>
    </div>
  );
}
