// pages/category/[title].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Sesuaikan dengan lokasi file konfigurasi firebase Anda

const CategoryDetail = () => {
  const router = useRouter();
  const { title } = router.query;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (title) {
      const fetchData = async () => {
        try {
          const q = query(collection(db, 'tempat_wisata'), where('category', '==', title));
          const querySnapshot = await getDocs(q);
          const fetchedPlaces = querySnapshot.docs.map(doc => doc.data());
          setPlaces(fetchedPlaces);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      };
      fetchData();
    }
  }, [title]);

  return (
    <div>
      <h1>Category: {title}</h1>
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetail;
