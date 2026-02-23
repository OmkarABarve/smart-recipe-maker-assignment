interface MatchScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950";
  if (score >= 50) return "text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950";
  return "text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950";
}

const sizeClasses = {
  sm: "w-10 h-10 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
};

export default function MatchScoreBadge({
  score,
  size = "md",
}: MatchScoreBadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border-2 font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}
      title={`${score}% match`}
      aria-label={`${score}% match`}
    >
      {score}%
    </div>
  );
}
