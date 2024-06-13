import React from "react";

export const Box2 = () => {
  const items = [
    { title: "Pusat Perbelanjaan", src: "/img/rectangle_124.png" },
    { title: "Tempat Menginap", src: "/img/rectangle_124.png" },
  ];

  return (
    <div className=" bg-white">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {items.map((item, index) => (
                <div key={index} className="flex items-center w-[326px] h-[138px] bg-[#006cff] rounded-[20px]">
                <img
                    className="w-[166px] h-[138px] object-cover rounded-[20px]"
                    alt={item.title}
                    src={item.src}
                />
                <div className="flex-1 text-white text-[24px] font-semibold text-center leading-normal ml-1">
                    {item.title.split(" ").map((text, i) => (
                    <div key={i}>{text}</div>
                    ))}
                </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Box2;



import React, { useState } from 'react';
import Image from 'next/image';

const PopDes = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Wisata Pantai',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/img/rectangle_124.png" // Ganti dengan jalur gambar yang benar
              alt="Pantai Pasir Putih Situbondo"
              width={300}
              height={200}
            />
            <h3 className="text-lg font-bold">Pantai Pasir Putih Situbondo</h3>
            <p className="text-gray-500">
              Pantai Pasir Putih Situbondo terkenal dengan pasir putihnya yang halus dan air lautnya yang jernih. Pantai ini juga memiliki banyak pohon kelapa yang rindang, sehingga cocok untuk bersantai dan menikmati pemandangan laut.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/img/rectangle_124.png" // Ganti dengan jalur gambar yang benar
              alt="Pantai Balekambang Malang"
              width={300}
              height={200}
            />
            <h3 className="text-lg font-bold">Pantai Balekambang Malang</h3>
            <p className="text-gray-500">
              Pantai Balekambang Malang terkenal dengan pulau kecilnya yang terdapat pura Hindu. Untuk mencapai pulau tersebut, pengunjung harus menyeberang dengan perahu.
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Wisata Gunung',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/img/rectangle_124.png" // Ganti dengan jalur gambar yang benar
              alt="Gunung Bromo Probolinggo"
              width={300}
              height={200}
            />
            <h3 className="text-lg font-bold">Gunung Bromo Probolinggo</h3>
            <p className="text-gray-500">
              Gunung Bromo Probolinggo terkenal dengan kalderanya yang luas dan pemandangan matahari terbitnya yang indah. Pengunjung dapat mendaki gunung ini untuk menikmati pemandangan alam yang menakjubkan.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/img/rectangle_124.png" // Ganti dengan jalur gambar yang benar
              alt="Gunung Semeru Lumajang"
              width={300}
              height={200}
            />
            <h3 className="text-lg font-bold">Gunung Semeru Lumajang</h3>
            <p className="text-gray-500">
              Gunung Semeru Lumajang merupakan gunung tertinggi di Jawa Timur. Gunung ini terkenal dengan pemandangannya yang indah dan jalur pendakiannya yang menantang.
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Wisata Budaya',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/img/rectangle_124.png" // Ganti dengan jalur gambar yang benar
              alt="Kampung Arab Malang"
              width={300}
              height={200}
            />
            <h3 className="text-lg font-bold">Kampung Arab Malang</h3>
            <p className="text-gray-500">
              Kampung Arab Malang terkenal dengan bangunan-bangunannya yang bergaya Timur Tengah dan kulinernya yang khas. Pengunjung dapat berfoto-foto di area kampung ini dan mencoba berbagai makanan khas Arab.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/img/rectangle_124.png" // Ganti dengan jalur gambar yang benar
              alt="Candi Singosari Malang"
              width={300}
              height={200}
            />
            <h3 className="text-lg font-bold">Candi Singosari Malang</h3>
            <p className="text-gray-500">
              Candi Singosari Malang adalah situs bersejarah yang berasal dari Kerajaan Singosari. Candi ini memiliki arsitektur yang indah dan penuh dengan nilai sejarah.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Discover Popular Destination</h1>
      <p className="text-center text-gray-500 mb-5">
        Di Jawa Timur banyak destinasi - destinasi wisata yang unik dan menarik. Banyak wisata yang belum terekspos di tiap daerah! Ayo jelajahi wisata daerah yang ada di Jawa Timur!
      </p>
      <div className="flex justify-center mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-lg ${
              activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default PopDes;

