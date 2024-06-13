import React, { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { rtdb } from '../config/firebase';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewSum = ({ id, onRatingUpdate }) => {
  const [ratingAverage, setRatingAverage] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);

  useEffect(() => {
    const reviewRef = ref(rtdb, `tempat_wisata_r/${id}/ulasan`);
  
    const fetchRatingSummary = () => {
      onValue(reviewRef, (snapshot) => {
        const ulasan = snapshot.val();
  
        let totalRating = 0;
        let totalReviews = 0;
  
        if (ulasan) {
          Object.values(ulasan).forEach((review) => {
            totalRating += review.rating;
            totalReviews++;
          });
        }
  
        if (totalReviews !== 0) {
          const averageRating = totalRating / totalReviews;
          // Periksa apakah nilai yang baru sama dengan nilai saat ini sebelum memanggil setState
          if (averageRating !== ratingAverage) {
            setRatingAverage(averageRating);
          }
          // Periksa apakah nilai yang baru sama dengan nilai saat ini sebelum memanggil setState
          if (totalReviews !== reviewCount) {
            setReviewCount(totalReviews);
          }
          // Panggil onRatingUpdate hanya jika nilai yang baru berbeda dari yang sebelumnya
          if (averageRating !== ratingAverage || totalReviews !== reviewCount) {
            onRatingUpdate(id, averageRating);
          }
        } else {
          // Periksa apakah nilai yang baru sama dengan nilai saat ini sebelum memanggil setState
          if (0 !== ratingAverage) {
            setRatingAverage(0);
          }
          // Periksa apakah nilai yang baru sama dengan nilai saat ini sebelum memanggil setState
          if (0 !== reviewCount) {
            setReviewCount(0);
          }
          // Panggil onRatingUpdate hanya jika nilai yang baru berbeda dari yang sebelumnya
          if (0 !== ratingAverage || 0 !== reviewCount) {
            onRatingUpdate(id, 0);
          }
        }
      });
    };
  
    fetchRatingSummary();
  
    // Bersihkan langganan saat komponen dibongkar
    return () => {
      off(reviewRef);
    };
  }, [id, onRatingUpdate]); // Tambahkan id dan onRatingUpdate sebagai dependensi
  // Tambahkan onRatingUpdate sebagai ketergantungan

  // Render star icons based on rating average
  const renderStarRating = () => {
    const stars = [];
    let roundedRating = Math.round(ratingAverage * 2) / 2;

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating - 0.5) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else if (i === roundedRating - 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        stars.push(<FaStar key={i} color="#e4e5e9" />);
      }
    }

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {stars} {/* Render star icons for average rating */}
        <div style={ratingBoxStyle}>
          {ratingAverage !== null && ratingAverage.toFixed(2)}
        </div>
        <p>( {reviewCount} )</p>
      </div>
    );
  };

  const ratingBoxStyle = {
    marginLeft: "5px",
    marginRight: "10px",
    padding: "5px 10px",
    borderRadius: "10px",
    backgroundColor: "#ffc107", // Orange color
  };

  return (
    <div>
      {ratingAverage !== null && reviewCount !== null ? (
        <div>
          {renderStarRating()}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ReviewSum;
