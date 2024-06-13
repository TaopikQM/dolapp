import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { ref, push } from "firebase/database";
import { rtdb } from '../config/firebase';

export const ReviewCardDesktop = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1];
      setPlaceId(id);
    }
  }, []);

  const handleSubmitReview = async () => {
    setIsSubmitting(true);
    try {
      // Kirim data ulasan ke Realtime Database
      const reviewData = {
        rating: rating,
        reviewText: reviewText,
        name: name,
        date: new Date().toISOString() // Menggunakan waktu saat ini dalam format ISO
      };
      const reviewRef = ref(rtdb, `tempat_wisata_r/${placeId}/ulasan`);
      push(reviewRef, reviewData); // Menambahkan ulasan baru ke Realtime Database
      // Reset rating, teks ulasan, dan pesan penyerahan setelah berhasil dikirim
      setRating(0);
      setHover(0);
      setReviewText("");
      setName("");
      setSubmissionMessage("Ulasan berhasil dikirim!");
      setIsSubmitted(true);
      // Set timeout untuk kembali ke tampilan ulasan normal setelah 3 detik
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmissionMessage("");
      }, 30000);
    } catch (error) {
      console.error("Error adding review:", error);
      // Atur pesan penyerahan ke pesan kesalahan
      setSubmissionMessage("Terjadi kesalahan saat mengirim ulasan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-[598px] h-auto bg-white rounded-lg p-6">
      <div className="w-full h-auto">
        <p className="font-semibold text-gsfdark-blue text-2xl text-center mb-4">
          Tinggalkan ulasan untuk <br />
          {placeId && placeId.name}
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
        {isSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg">
              <div className="flex items-center justify-center">
                <FaStar size={30} color="#ffc107" />
                <FaStar size={30} color="#ffc107" />
                <FaStar size={30} color="#ffc107" />
                <FaStar size={30} color="#ffc107" />
                <FaStar size={30} color="#ffc107" />
                {/*<span className="ml-2">{rating}</span>*/}
              </div>
              <div>
                <p className="mt-4">{name}</p>
                <p>{reviewText}</p>
              </div>
              <p className="mt-4">{submissionMessage}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setIsSubmitted(false); setSubmissionMessage(""); }}>
                Lanjutkan Penelusuran
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
