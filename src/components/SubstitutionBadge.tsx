import { Substitution } from "@/types";

interface SubstitutionBadgeProps {
  substitution: Substitution;
}

export default function SubstitutionBadge({
  substitution,
}: SubstitutionBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-medium"
      title={`Use "${substitution.replacement}" instead of "${substitution.missing}" (${Math.round(substitution.similarity * 100)}% similar)`}
    >
      <svg
        className="w-3 h-3 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
      <span className="line-through opacity-60">{substitution.missing}</span>
      <span>→</span>
      <span className="font-semibold">{substitution.replacement}</span>
    </span>
  );
}
