import React, { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { rtdb } from '../config/firebase';
import { ref, onValue } from "firebase/database";
import Link from 'next/link';

import ReviewSum from "./ReviewSum";

const RekomReal = ({ router }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [places, setPlaces] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const placesRef = ref(rtdb, 'tempat_wisata_r');
    onValue(placesRef, (snapshot) => {
      const data = snapshot.val();
      const placesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      const activePlaces = placesArray.filter(place => place.status === "ACTIVE"); // Filter berdasarkan status
      
      setPlaces(activePlaces);
    });
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < places.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleRatingUpdate = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };
  
  // Filter tempat berdasarkan nilai ReviewSum yang tidak sama dengan 0.0
  const filteredPlaces = places.filter(place => ratings[place.id] !== 0.0);

  return (
    <div className="relative w-full max-w-[1100px] mx-auto">
      {filteredPlaces.length > 0 && (
        
        <div>
          <h1 className="text-2xl font-bold text-center mt-4">Rekomendasi Wisata</h1>
      
          <h2 className="text-lg font-semibold text-center mt-4 mb-2">{filteredPlaces[currentIndex].title}</h2>
          <div className="relative">
            {filteredPlaces.length > 3 && (
              <button
                className={`absolute left-0 top-[85%] transform -translate-y-1/2 bg-gray-200 p-2 rounded-full ${
                  currentIndex === 0 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
            )}
            <div className="flex overflow-hidden justify-center">
              {filteredPlaces.slice(currentIndex, currentIndex + 3).map((place, index) => (
                <div key={index} className="flex-shrink-0 w-1/3 p-2 cursor-pointer">
                  <a>
                    <div className="bg-white rounded-lg shadow-md" style={{ minHeight: '300px' }}>
                      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                        {place.imageUrls && place.imageUrls.map((imageUrl, index) => (
                          <div key={index}>
                            <img src={imageUrl} alt={`Image ${index + 1}`} className="h-60 w-full object-cover rounded-lg" />
                          </div>
                        ))}
                        {place.videoUrls && place.videoUrls.map((videoUrl, index) => (
                          <div key={index}>
                            <video controls className="h-50 w-80 object-cover rounded-lg">
                              <source src={videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ))}
                      </Carousel>
                      <Link href={`/detail/${encodeURIComponent(place.id)}`} key={place.id}>
                        <div className="p-4">
                          <p className="text-gray-600 text-sm">{place.category} | {place.location}</p>
                          <h3 className="text-lg font-bold">{place.name}</h3>
                          <p className="text-gray-600 text-sm">{place.review}</p>
                          {/*{<ReviewWis id={place.id} onRatingUpdate={handleRatingUpdate} />}
                        */}
                        {<ReviewSum id={place.id} onRatingUpdate={handleRatingUpdate}/>}
                        </div>
                      </Link>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            {filteredPlaces.length > 3 && (
              <button
                className={`absolute right-0 top-[85%] transform -translate-y-1/2 bg-gray-200 p-2 rounded-full ${
                  currentIndex >= filteredPlaces.length - 3 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handleNext}
                disabled={currentIndex >= filteredPlaces.length - 3}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RekomReal;
