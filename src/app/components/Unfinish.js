// components/Unfinish.js
import React from 'react';

const Unfinish = ({ onClose }) => {
  return (
    <div className="bg-yellow-500 text-white p-4 rounded-lg text-center relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        X
      </button>
      <h1 className="text-2xl font-bold">Transaksi Tertunda</h1>
      <p>Anda telah memesan pembayaran Anda. Silakan lanjutkan seperti yang diinstruksikan.</p>
    </div>
  );
};

export default Unfinish;
