
import React, { useEffect, useState } from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ref, onValue } from 'firebase/database'; // Pastikan Firebase sudah dikonfigurasi
import { rtdb } from '../config/firebase';
import Link from 'next/link'; // Import Link dari next/link




const CategoryDetailPage = ({item}) => {
  const [placeData, setPlaceData] = useState([]);

  const [category, setCategory] = useState('');
  const [combinedMedia, setCombinedMedia] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const decodedCategory = decodeURIComponent(currentUrl.split('/category/')[1]);
      //const decodedCategory = decodeURIComponent(category);
      setCategory(decodedCategory);
      //console.log('Kategori:', decodedCategory); // Tambahkan log ini
      
       
      const placeRef = ref(rtdb, `tempat_wisata_r`);
      onValue(placeRef, (snapshot) => {
        const data = snapshot.val();
        // Filter data untuk mendapatkan hanya data dengan category yang sesuai
        const filteredData = Object.values(data).filter(item => item.category === decodedCategory);
        const activePlaces = filteredData.filter(item => item.status === "ACTIVE"); // Filter berdasarkan status
     
        //console.log('Data:', activePlaces);
        setPlaceData(activePlaces);
        setOriginalPlaceData(activePlaces); // Simpan data awal ke state originalPlaceData


        // Gabungkan media dari placeData ke combinedMedia
        const combinedMedia = activePlaces.reduce((acc, place) => {
          const images = (place.imageUrls || []).map(url => ({ type: 'image', url, thumbnail: url }));
          const videos = (place.videoUrls || []).map(url => ({ type: 'video', url, thumbnail: 'path/to/video/thumbnail.jpg' }));
          return [...acc, ...images, ...videos];
        }, []);
        setCombinedMedia(combinedMedia);
      });
    }
  }, [category]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
   
  };


  const [activeRegion, setActiveRegion] = useState('Semua'); // State untuk wilayah aktif
  const [originalPlaceData, setOriginalPlaceData] = useState([]); // State untuk menyimpan data awal

  // Mengambil daftar wilayah unik dari placeData
  const regions = [...new Set(placeData.map(item => item.wilayah))];

  const handleRegionFilter = (region) => {
    if (region === 'Semua') {
      setActiveRegion('Semua');
      setPlaceData(originalPlaceData); // Kembalikan ke data awal tanpa filter
    } else {
      setActiveRegion(region === activeRegion ? 'Semua' : region);
      const filteredByRegion = placeData.filter(item => item.wilayah === region);
      setPlaceData(filteredByRegion);
    }
  };
  

  return (
    <div>
      <div className="container mx-auto">
      {placeData ? (
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center">{category}</h1>
        
          {/* Tombol Filter Wilayah */}
          <div className="flex justify-start space-x-4 mb-4 overflow-x-auto">
            <button
              className={`px-4 py-2 rounded-lg ${activeRegion === 'Semua' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => handleRegionFilter('Semua')}
            >
              Semua
            </button>
            {regions.map((region, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${activeRegion === region ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => handleRegionFilter(region)}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Daftar Tempat Wisata */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {placeData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
               <div className="w-full h-120 mb-4 rounded-lg overflow-hidden">
                  <Slider {...settings}>
                    {(item.imageUrls || []).map((imageUrl, index) => (
                      <div key={index} className="cursor-pointer w-full h-full">
                        <img
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                          className="rounded-md"
                        />
                      </div>
                    ))}
                    {(item.videoUrls || []).map((videoUrl, index) => (
                      <div key={index} className="cursor-pointer w-full h-full">
                        <video controls className="w-full h-100 object-cover">
                          <source src={videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </Slider>
                </div>


                   <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                      <p className="text-gray-600 mb-2">Alamat : {item.alamat}</p>
                      {item.price && (
                        <p className="text-gray-800 font-bold">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                        </p>
                      )}
                    </div>
                    <Link href={`/detail/${encodeURIComponent(item.id)}`} key={item.id}>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
                        Pesan Sekarang
                      </button>
                    </Link>
                  </div>
              </div>
            ))}
          </div>
        </div>
        )
          : (
          <p>Loading...</p>
        )}
        </div>
    </div>
      
      
  );
};

export default CategoryDetailPage;