interface EmptyStateProps {
  type: "initial" | "no-results";
}

export default function EmptyState({ type }: EmptyStateProps) {
  if (type === "initial") {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-6" role="img" aria-label="ingredients">
          🥗
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          What&apos;s in your kitchen?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Start typing your available ingredients above. We&apos;ll find the
          best recipes you can make and suggest smart substitutions for anything
          you&apos;re missing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            "chicken breast",
            "garlic",
            "onion",
            "olive oil",
            "tomato",
            "rice",
            "egg",
            "soy sauce",
          ].map((suggestion) => (
            <span
              key={suggestion}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm"
            >
              {suggestion}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          Example ingredients to try
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-4">
      <div className="text-6xl mb-6" role="img" aria-label="thinking">
        🤔
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No matching recipes found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        Try adding more ingredients or different ones. The more you add, the
        better we can match recipes for you.
      </p>
    </div>
  );
}
