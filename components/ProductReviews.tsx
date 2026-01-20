'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'Alex M.',
    rating: 5,
    date: '2024-01-15',
    comment: 'Authentic and in perfect condition. Exactly as described. Fast shipping too!',
    verified: true,
  },
  {
    id: '2',
    name: 'Sarah K.',
    rating: 5,
    date: '2024-01-10',
    comment: 'Amazing quality. This is the real deal. Very happy with my purchase.',
    verified: true,
  },
  {
    id: '3',
    name: 'James R.',
    rating: 4,
    date: '2024-01-05',
    comment: 'Great jersey, fits perfectly. Minor wear as described but overall excellent condition.',
    verified: true,
  },
];

export default function ProductReviews({ productId, reviews = mockReviews }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="border-t border-black/10 pt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xs font-light text-black/60 tracking-wider uppercase mb-2">Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(averageRating)
                      ? 'fill-black text-black'
                      : 'fill-none text-black/20'
                  }`}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-sm font-light text-black/60 tracking-tight">
              {averageRating.toFixed(1)} ({reviews.length})
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-black/5 pb-8 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-light text-black tracking-tight">{review.name}</p>
                  {review.verified && (
                    <span className="text-[10px] text-black/40 font-light tracking-wider uppercase border border-black/10 px-2 py-0.5">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating
                            ? 'fill-black text-black'
                            : 'fill-none text-black/20'
                        }`}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-light text-black/40 tracking-tight">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm font-light text-black/70 tracking-tight leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-8 text-xs font-light text-black/50 hover:text-black tracking-wider uppercase border-b border-black/20 hover:border-black/40 transition-colors"
        >
          {showAll ? 'Show Less' : `View All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  );
}

