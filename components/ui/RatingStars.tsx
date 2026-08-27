import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  showScore?: boolean;
  reviewCount?: number;
}

export function RatingStars({
  rating,
  max = 5,
  size = 16,
  showScore = true,
  reviewCount
}: RatingStarsProps) {
  return (
    <div className="inline-flex items-center gap-1.5" id={`rating-${rating}`}>
      <div className="flex items-center text-amber-400">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              size={size}
              className={`${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-zinc-300'
              }`}
            />
          );
        })}
      </div>
      {showScore && (
        <span className="text-sm font-semibold text-zinc-900 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-zinc-600">
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
