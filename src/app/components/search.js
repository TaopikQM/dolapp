import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { rtdb } from '../config/firebase'; // Pastikan Anda memiliki konfigurasi Firebase di sini
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Link from 'next/link'; // Import Link dari next/link

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const q = searchParams.get('q')?.toLowerCase() || '';
      setQuery(q);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const placesRef = ref(rtdb, 'tempat_wisata_r');
      const snapshot = await get(placesRef);

      if (snapshot.exists()) {
        const places = Object.values(snapshot.val());
        // Filter tempat wisata berdasarkan status "ACTIVE"
        const activePlaces = places.filter(place => place.status === "ACTIVE");
      
        setData(activePlaces);

        const results = activePlaces.filter((item) => {
          const itemString = JSON.stringify(item).toLowerCase();
          return itemString.includes(query);
        });
        setSearchResults(results);
      } else {
        console.log('No data available');
        setData([]);
        setSearchResults([]);
      }
    }
    if (query) {
      fetchData();
    }
  }, [query]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="container mx-auto">
      {searchResults.length > 0 ? (
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center">Hasil Pencarian untuk: {query}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((item) => {
              let formattedPrice = null;
              if (item.price) {
                formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price);
              }
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="w-full h-96 mb-4 rounded-lg overflow-hidden">
                    <Slider {...settings}>
                      {(item.imageUrls || []).map((imageUrl, index) => (
                        <div key={index} className="cursor-pointer w-full h-full">
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            className="rounded-md"
                          />
                        </div>
                      ))}
                      {(item.videoUrls || []).map((videoUrl, index) => (
                        <div key={index} className="cursor-pointer w-full h-full">
                          <video controls className="w-full h-full object-cover">
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="truncate text-gray-600 mb-2">Alamat: {item.alamat}</p>
                  {formattedPrice && <p className="text-gray-800 font-bold">{formattedPrice}</p>}
                  <Link href={`/detail/${encodeURIComponent(item.id)}`} key={item.id}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
                      Pesan Sekarang
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SearchResults;
