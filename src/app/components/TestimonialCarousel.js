import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from "firebase/database";
import { rtdb } from '../config/firebase';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const ulasanRef = ref(rtdb, 'ulasan');
    const unsubscribe = onValue(ulasanRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ulasanList = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].nama,
          image: data[key].foto,
          text: data[key].ulasan,
          status: data[key].status,
        }));
        const ulasandata = ulasanList.filter((ulasan) => ulasan.status === 'ACTIVE');
        setTestimonials(ulasandata);
        // Center the carousel if less than 3 testimonials
        setCurrentIndex(0);
      } else {
        setTestimonials([]);
      }
      setDataLoaded(true); // Data telah selesai dimuat
    });

    return () => {
      off(ulasanRef, 'value', unsubscribe);
    };
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderTestimonials = () => {
    return testimonials.map((testimonial, index) => (
      <div key={index} className="min-w-[33.33%] max-w-[33.33%] p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center h-full">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={testimonial.image}
            alt={`${testimonial.name}'s picture`}
          />
          <p className="text-lg font-semibold mb-2">{testimonial.name}</p>
          <p className="text-gray-600 flex-grow">{testimonial.text}</p>
        </div>
      </div>
    ));
  };

  const calculateTransform = () => {
    if (testimonials.length < 3) {
      return `translateX(${(3 - testimonials.length) * 16.67}%)`; // Center the items
    }
    return `translateX(-${currentIndex * 33.33}%)`;
  };

  return (
    <div className="w-full py-12 max-w-[1100px] mx-auto relative">
      {dataLoaded && testimonials.length > 0 && (
        <h2 className="text-3xl font-bold text-center mb-8">Ulasan Web</h2>
      )}
      {dataLoaded && (
        <React.Fragment>
          {testimonials.length > 3 && (
            <React.Fragment>
              <button
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <FaArrowLeft />
              </button>
              <button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg z-10 ${currentIndex >= testimonials.length - 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleNext}
                disabled={currentIndex >= testimonials.length - 3}
              >
                <FaArrowRight />
              </button>
            </React.Fragment>
          )}
          <div className="flex overflow-hidden w-full max-w-[1100px] mx-auto justify-center relative">
            <div className="flex transition-transform duration-300" style={{ transform: calculateTransform() }}>
              {renderTestimonials()}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default TestimonialCarousel;
