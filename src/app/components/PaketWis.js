import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PaketWis = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      image: '/img/rectangle_124.png',
      title: 'Family package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Honeymoon package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Group package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Friends package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Solo package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Adventure package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Religious package',
      destinations: '20+',
    },
    {
      image: '/img/rectangle_124.png',
      title: 'Water sports package',
      destinations: '20+',
    },
  ];

  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClickNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 relative">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Tour Packages</h2>
        <p className="text-gray-500">World's leading tour and travels Booking website, Over 30,000 packages worldwide.</p>
      </div>

      <Carousel 
        showThumbs={false} 
        infiniteLoop 
        showStatus={false} 
        showArrows={false} 
        dynamicHeight={false} 
        centerMode={true} 
        centerSlidePercentage={33.33}
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        className="carousel"
      >
        {items.map((item, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-500 mb-4">{item.destinations} destinations</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book now</button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <button className={`bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-full absolute top-1/2 -translate-y-1/2 left-0 ${currentIndex === 0 ? 'cursor-not-allowed' : ''}`} onClick={handleClickPrev}>
        &lt;
      </button>
      <button className={`bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-full absolute top-1/2 -translate-y-1/2 right-0 ${currentIndex === items.length - 1 ? 'cursor-not-allowed' : ''}`} onClick={handleClickNext}>
        &gt;
      </button>

      <style jsx>{`
        @media screen and (max-width: 768px) {
          .carousel {
            width: 50%;
          }
        }
        @media screen and (max-width: 480px) {
          .carousel {
            width: 100%;
          }
        }
        
      `}</style>
    </div>
  );
};

export default PaketWis;
