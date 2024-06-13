// src/app/ulasan/[placeId]/page.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UlasanPage = () => {
  const { placeId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data ulasan ke server, misalnya ke Firebase Realtime Database
      await firebase.database().ref(`tempat_wisata_r/${placeId}/reviews`).push({
        rating,
        comment,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
      // Berhasil menyimpan ulasan, reset formulir
      setRating(0);
      setComment('');
      alert('Ulasan berhasil ditambahkan!');
    } catch (error) {
      console.error('Gagal menambahkan ulasan:', error);
      alert('Terjadi kesalahan saat menambahkan ulasan.');
    }
  };
  

  return (
    <div>
      <h1>Ulasan untuk Tempat Wisata dengan ID: {placeId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Peringkat:</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div>
          <label>Komentar:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit">Kirim Ulasan</button>
      </form>
    </div>
  );
};

export default UlasanPage;
