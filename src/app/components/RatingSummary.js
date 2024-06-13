import React, { useState, useEffect } from "react";

import { ref,get } from "firebase/database";
import { rtdb } from '../config/firebase';

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingSummary = () => {
  const [ratingAverage, setRatingAverage] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  
  useEffect(() => {
    const fetchRatingSummary = async () => {
      try {
        // Ambil ID tempat wisata dari URL
        const currentUrl = window.location.href;
        const id = currentUrl.split('/detail/')[1];
        
        // Buat referensi ke tempat wisata di Realtime Database
        const placeRef = ref(rtdb, `tempat_wisata_r/${id}/ulasan`);

        // Ambil data ulasan dari Realtime Database
        const snapshot = await get(placeRef);
        const ulasan = snapshot.val(); 

        if (ulasan) { // Periksa apakah ada ulasan
          let totalRating = 0;
          let totalReviews = 0;

          // Hitung total rating dan jumlah ulasan
          Object.values(ulasan).forEach((review) => {
            totalRating += review.rating;
            totalReviews++;
          });

          // Hitung rata-rata rating
          const averageRating = totalRating / totalReviews;

          // Set nilai rata-rata rating dan jumlah ulasan
          setRatingAverage(averageRating);
          setReviewCount(totalReviews);
        } else {
          // Jika tidak ada ulasan, atur ratingAverage dan reviewCount menjadi 0
          setRatingAverage(0);
          setReviewCount(0);
        }
      } catch (error) {
        console.error("Error fetching rating summary:", error);
      }
    };

    fetchRatingSummary();
  }, []);

  // Function to render star icons based on rating average
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

export default RatingSummary;
