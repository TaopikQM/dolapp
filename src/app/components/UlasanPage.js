import React, { useState } from 'react';

const UlasanPage = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmitReview = async () => {
    setIsSubmitting(true);
    try {
      const reviewsRef = ref(rtdb, `tempat_wisata_r/${selectedPlaceId}/reviews`);
      await push(reviewsRef, {
        name: name,
        rating: rating,
        reviewText: reviewText,
        timestamp: serverTimestamp()
      });
      setIsSubmitted(true);
      setSubmissionMessage("Ulasan berhasil dikirim. Terima kasih!");
      setName("");
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmissionMessage("Terjadi kesalahan saat mengirim ulasan. Silakan coba lagi.");
    }
    setIsSubmitting(false);
  };
  

  return (
    <div className="relative w-[598px] h-auto bg-white rounded-lg p-6">
      <div className="w-full h-auto">
        <p className="font-semibold text-gsfdark-blue text-2xl text-center mb-4">
          Tinggalkan ulasan untuk <br />
          {place && place.name}
        </p>
        <p className="font-normal text-gsfdark-blue text-base text-center mb-4">
          Bagaimana penilaian anda?
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          className="w-full h-10 p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="star"
                  size={30}
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full h-40 p-2 border border-gray-300 rounded"
          placeholder="Tulis ulasan anda di sini..."
        ></textarea>
        <button 
          disabled={isSubmitting}
          className="w-full h-12 mt-4 bg-[#5465ff] text-white rounded-lg font-semibold"
          onClick={handleSubmitReview}
        >
          {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
        </button>
        {isSubmitted ? (
          <p className="text-xs text-gsfdark-blue mt-4">{submissionMessage}</p>
        ) : (
          <p className="text-xs text-gsfdark-blue mt-4">
            Semua ulasan di dolanrek.co diverifikasi dalam waktu 48 jam sebelum diposting untuk memastikan keaslian dan keakuratan.
          </p>
        )}
      </div>
    </div>
  );
};

export default UlasanPage;
