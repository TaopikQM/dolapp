import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from "firebase/database";
import { rtdb } from '../config/firebase';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ulasanRef = ref(rtdb, 'ulasan');
    const unsubscribe = onValue(ulasanRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data from Firebase:", data);
      if (data) {
        const ulasanList = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].nama,
          image: data[key].foto,
          text: data[key].ulasan,
          status: data[key].status,
        }));
        const ulasandata = ulasanList.filter((ulasan) => ulasan.status === 'ACTIVE');
        console.log("Filtered active testimonials:", ulasandata);
        setTestimonials(ulasandata);
      } else {
        console.log("No data found in Firebase");
        setTestimonials([]);
      }
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

  return (
    <div className="w-full py-12 ">
      <h2 className="text-3xl font-bold text-center mb-8">Ulasan Web</h2>
      <div className="relative w-full flex justify-center items-center">
        <button
          className={`absolute left-0 p-2 bg-gray-200 rounded-full shadow-lg ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft />
        </button>
        <div className="flex overflow-hidden w-[90%]">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-[33.33%] p-4">
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
            ))}
          </div>
        </div>
        <button
          className={`absolute right-0 p-2 bg-gray-200 rounded-full shadow-lg ${currentIndex >= testimonials.length - 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNext}
          disabled={currentIndex >= testimonials.length - 3}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
