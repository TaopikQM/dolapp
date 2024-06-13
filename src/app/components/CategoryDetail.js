import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase'; // asumsikan Anda memiliki koneksi ke Firestore di sini



const CategoryDetail = ({ match }) => {
    const { title } = useParams();
    const [places, setPlaces] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "tempat_wisata"),
        where("status", "==", "ACTIVE"),
        where("category", "==", title)
      ),
      (snapshot) => {
        const fetchedPlaces = [];
        snapshot.forEach((doc) => {
          fetchedPlaces.push({ id: doc.id, ...doc.data() });
        });
        setPlaces(fetchedPlaces);
      }
    );

    // Unsubscribe dari listener saat komponen dibongkar
    return () => unsubscribe();
  }, [title]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Tempat Wisata</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <div key={place.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={place.imageUrls}
              alt={place.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
            <p className="text-gray-600 mb-2">Alamat : {place.location}</p>
            <p className="text-gray-800 font-bold">Rp {place.price}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
              Pesan Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
