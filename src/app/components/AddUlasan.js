import React, { useState } from 'react';
import { ref as dbRef, push, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { rtdb, storage } from '../config/firebase';

const AddUlasan = () => {
  const [nama, setNama] = useState('');
  const [ulasan, setUlasan] = useState('');
  const [foto, setFoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const currentTime = new Date().toISOString();

      // Simpan data ulasan ke Firebase Realtime Database
      const newUlasanRef = push(dbRef(rtdb, 'ulasan'));
      const newUlasanKey = newUlasanRef.key;

      // Unggah foto ke Firebase Storage
      const fotoRef = storageRef(storage, `ulasan/${newUlasanKey}`);
      await uploadBytes(fotoRef, foto);
      const fotoURL = await getDownloadURL(fotoRef);

      // Data ulasan yang akan disimpan
      const ulasanData = {
        foto: fotoURL,
        nama,
        ulasan,
        status: 'ACTIVE',
        time: currentTime
      };
      await set(newUlasanRef, ulasanData);

      // Kosongkan inputan setelah data berhasil disimpan
      setNama('');
      setUlasan('');
      setFoto(null);
      setIsLoading(false);


      // Panggil prop onSubmitSuccess untuk menutup popup
      onSubmitSuccess();

      alert('Ulasan berhasil ditambahkan!');
      
    } catch (error) {
      console.error("Error adding ulasan:", error);
      alert('Terjadi kesalahan saat menambahkan ulasan.');
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Form Ulasan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto:</label>
          <input id="foto" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama:</label>
          <input id="nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="ulasan" className="block text-sm font-medium text-gray-700">Ulasan:</label>
          <textarea id="ulasan" value={ulasan} onChange={(e) => setUlasan(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Tambah Ulasan'}
        </button>
      </form>
    </div>
  );
};

export default AddUlasan;
