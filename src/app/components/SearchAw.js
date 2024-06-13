"use client"; // Tambahkan ini di bagian atas file

import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchAw = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative w-full h-[546px] md:h-[400px] lg:h-[546px]">
      <img
        className="absolute w-full h-full object-cover"
        alt="Kawah ijen"
        src="/img/kawah_ijen_jpg.jpeg"
      />
      <p className="absolute w-[80%] md:w-[600px] lg:w-[664px] top-[20%] md:top-[30px] lg:top-[92px] left-1/2 transform -translate-x-1/2 text-white text-center text-[24px] md:text-[36px] lg:text-[48px] leading-none">
        <span className="font-medium">Temukan Keindahan</span>
        <span className="font-black">
          {" "}
          <br />
          Di Setiap Langkahmu!
        </span>
      </p>
      <div className="absolute w-full top-[50%] md:top-[200px] lg:top-[282px] flex justify-center">
        <div className="relative w-[80%] md:w-[700px] lg:w-[1000px] h-[60px] md:h-[70px] lg:h-[89px] bg-[#f3f3f3] rounded-[20px] flex items-center">
          <form onSubmit={handleSearch} className="w-full flex items-center">
            <MagnifyingGlassIcon className="absolute w-[30px] md:w-[35px] lg:w-[45px] h-[30px] md:h-[35px] lg:h-[43px] ml-4 md:ml-8 lg:ml-10 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mulai Explore Jawa Timur"
              className="w-full pl-[60px] md:pl-[80px] lg:pl-[100px] text-[#919191] text-[16px] md:text-[24px] lg:text-[32px] font-medium bg-transparent border-none focus:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchAw;
