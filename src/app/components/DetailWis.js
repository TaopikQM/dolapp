import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {ReviewCardDesktop} from "./ReviewCardDesktop";
import RatingSummary from "./RatingSummary";

import { ref, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';

import ReviewList from "./ReviewList";

const DetailWis = () => {
  const [place, setPlaceId] = useState('');

  const [placeData, setPlaceData] = useState([]);
  const { openingHours } = placeData;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1];
      setPlaceId(id);

      const placeRef = ref(rtdb, `tempat_wisata_r/${id}`); // Mengambil referensi ke tempat wisata dengan ID tertentu
      onValue(placeRef, (snapshot) => {
        const data = snapshot.val();
        //console.log('Data Tempat Wisata:', data);
        setPlaceData(data);
      }, {
        onlyOnce: true // Mengambil data sekali saja
      });
    }
  }, []);

  const combinedMedia = [
    ...(placeData.imageUrls || []).map(url => ({ type: 'image', url, thumbnail: url })),
    ...(placeData.videoUrls || []).map(url => ({ type: 'video', url, thumbnail: 'path/to/video/thumbnail.jpg' })) // You might need a different approach to generate video thumbnails
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    customPaging: function(i) {
      return (
        
        <a className=" relative inline-block w-[70px] h-[20px] cursor-pointer">
          
          
          {combinedMedia[i].type === 'image' ? (
            <img src={combinedMedia[i].thumbnail} alt={`Thumbnail ${i + 1}`} className="w-16 h-16 object-cover rounded-md" />
          ) : (
            <video className="w-16 h-16 object-cover rounded-md">
              <source src={combinedMedia[i].url} type="video/mp4" />
            </video>
          )}
          </a>
      );
    },
    dotsClass: "slick-dotss slick-thumb"
  };

  const [isReviewPopupVisible, setIsReviewPopupVisible] = useState(false);

  const handleAddReviewClick = () => {
    setIsReviewPopupVisible(true);
    document.body.style.overflow = 'hidden'; // Disable scroll on the background
  };

  const handleClosePopup = () => {
    setIsReviewPopupVisible(false);
    document.body.style.overflow = 'auto'; // Enable scroll on the background
  };



  

  return (
    
    <div className="col-md-8">
      
      {/* Custom Detail Section 
      <h2>ID Tempat Wisata: {place}</h2> */}
      <div className="flex flex-col md:flex-row items-start gap-2 px-6 py-0 relative mb-5">
        <div className="w-full md:w-2/3 mb-5">
          <div className="font-semibold text-[#213d44] text-[36px] leading-30">
            {placeData.name}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <RatingSummary />
        </div>
      </div>
      <div className="px-6 py-0 relative mb-5">
        <div className=" [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-[#213d44] text-[22px] leading-6 px-9 mb-5">Deskripsi Wisata</div>
        <p className=" [font-family:'Noto_Sans-Medium',Helvetica] text-justify font-medium text-[#7f7f7f] text-sm leading-normal">
          {placeData.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start  px-6 py-0 relative mb-1">
        <div className=" md:w-1/3 mb-5 ">
          <div className="font-semibold text-[#213d44] text-2xl leading-6 mb-1 md:mb-0">
            Jam Operasional
          </div>
        </div>
        <div className="w-full md:w-2/3">
          : {openingHours?.open} - {openingHours?.close} WIB
        </div>
        
      </div>
      <div className="flex flex-col md:flex-row items-start  px-6 py-0 relative mb-1">
        
        <div className=" md:w-1/3 mb-5 ">
          <div className="font-semibold text-[#213d44] text-2xl leading-6 mb-1 md:mb-0">
            Alamat
          </div>
        </div>
        <div className="w-full md:w-2/3">
        : {placeData.alamat}
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-5 text-center">Photo Gallery</h3>
      {placeData && placeData.imageUrls && (
        <div className="relative pb-[50px]">
            <Slider {...settings}>
            {combinedMedia.map((media, index) => (
              <div key={index} className="relative w-full h-[600px] cursor-pointer overflow-hidden">
                {media.type === 'image' ? (
                  <img src={media.url} alt={`Media ${index + 1}`} className="w-full  object-contain rounded-md" style={{ maxHeight: '600px' }}/>
                ) : (
                  <video controls className="w-full  object-contoin rounded-md" style={{ maxHeight: '600px' }}>
                    <source src={media.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
            </Slider>
        </div>
      )}

      <div className="px-6 py-0 relative mb-5">
        <div className=" [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-[#213d44] text-[22px] leading-6 px-9 mb-5">Fasilitas</div>
        <p className="[font-family:'Noto_Sans-Medium',Helvetica] text-justify font-medium text-[#7f7f7f] text-sm leading-normal">
          {placeData.facilities}
        </p>
      </div>
      <div className="tour_head1 tout-map map-container">
        
        <h3 className="  h-[25px] top-0 left-[35px] [font-family:'Noto_Sans-SemiBold',Helvetica] font-semibold text-[#213d44] text-[22px] tracking-[0] leading-[24.2px] whitespace-nowrap">Location</h3>
        <iframe

          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0010659648477!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fc9ad0a04b51%3A0x6073cc130dca7e9!2sSurabaya%2C%20Surabaya%20City%2C%20East%20Java%2C%20Indonesia!5e0!3m2!1sen!2s!4v1622363310088!5m2!1sen!2s"
          allowFullScreen=""
          className="w-full h-96 border-0"
        ></iframe>
      </div>
      <button 
      onClick={handleAddReviewClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Add Review
      </button>
       {isReviewPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 m-2 p-2 bg-red-500 text-white rounded-full z-50"
              style={{ width: "40px", height: "40px" }}
            >
              X
            </button>
          </div>
          <div className="relative bg-white w-auto max-h-screen overflow-auto p-4 rounded-lg">
          {placeData && placeData && <ReviewCardDesktop placeData={place.id} />}
          </div>
        </div>
      )}
        <ReviewList />
      
      {/**<ReviewList />*/}
    </div>
  );
};

export default DetailWis;
