import React, { useState, useEffect } from "react";
import { db } from '../config/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import ReviewSum from "./ReviewSum";
import { rtdb } from '../config/firebase';

const ReviewWis = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const placesRef = ref(rtdb, 'tempat_wisata_r');
    onValue(placesRef, (snapshot) => {
      const data = snapshot.val();
      const placesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setPlaces(placesArray);
    });
  }, []);

  return (
    <div>
      {places.map(place => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <ReviewSum id={place.id} />
        </div>
      ))}
    </div>
  );
};

export default ReviewWis;
