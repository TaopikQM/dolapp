import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

import { ref,  onValue  } from "firebase/database";
import { rtdb } from '../config/firebase';


const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [placeId, setPlaceId] = useState('');

  const [reviewRef, setReviewRef] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1];
      setPlaceId(id);
    }
  }, []);

  useEffect(() => {
    if (placeId) {
      const newReviewRef = ref(rtdb, `tempat_wisata_r/${placeId}/ulasan`);
      setReviewRef(newReviewRef);
    }
  }, [placeId]);

  useEffect(() => {
    if (reviewRef) {
      const unsubscribe = onValue(reviewRef, (snapshot) => {
        const reviewsData = [];
        let totalRating = 0;
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((key) => {
            const review = data[key];
            reviewsData.push(review);
            totalRating += review.rating;
          });
          setReviews(reviewsData);
          setTotalReviews(reviewsData.length);
          if (reviewsData.length > 0) {
            setAverageRating(totalRating / reviewsData.length);
          }
        } else {
          setReviews([]);
          setTotalReviews(0);
          setAverageRating(0);
        }
      });

      return () => unsubscribe();
    }
  }, [reviewRef]);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto grid gap-4 grid-cols-1">
      <h2 className="text-2xl font-semibold mt-4 mb-4">Review:</h2>

      <div className="mb-4">
        <p>Total ulasan: {totalReviews}</p>
        <p>Rata-rata rating: {averageRating.toFixed(1)} ({totalReviews > 0 ? totalReviews : '0'} ulasan)</p>
      </div>

      {visibleReviews.map((review, index) => (
        <div key={review.id} className="bg-gray-100 rounded-lg p-4 flex items-center">
          <div className="flex-1 ml-4">
            <p className="text-lg font-semibold">{review.name}</p>
            <p className="text-sm text-gray-600">{new Date(review.date).toLocaleString()}</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                  size={20}
                  className="mr-1"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{review.reviewText}</p>
          </div>
        </div>
      ))}

      {!showAllReviews && reviews.length > 5 && (
        <button onClick={() => setShowAllReviews(true)} className="text-sm text-gray-600 mt-2 underline">Lihat semua</button>
      )}
    </div>
  );
};

export default ReviewList;
