import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import Link from 'next/link';
import { rtdb } from '../config/firebase'; // Sesuaikan dengan impor yang diperlukan dari konfigurasi Firebase

const Box = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Mendapatkan data dari Firebase Realtime Database
    const categoryRef = ref(rtdb, 'menu_category');
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Mengubah data menjadi array of objects
        const categoryList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Filter categories based on status ACTIVE
        const activeCategories = categoryList.filter(category => category.status === 'ACTIVE');
        // Mengupdate items dengan data dari categories yang aktif
        const updatedItems = activeCategories.map(category => ({
          title: category.title,
          category: category.category, // Sesuaikan dengan nama properti yang ada di Firebase
          mediaURL: category.mediaURL, // Sesuaikan dengan nama properti yang ada di Firebase
        }));
        setItems(updatedItems);
      } else {
        setItems([]);
      }
    });
  }, []);

  const renderItem = (item, index) => (
    <Link key={index} href={`/category/${encodeURIComponent(item.category)}`}>
      <div className="flex items-center mr-10 mb-10 w-[326px] h-[138px] bg-[#006cff] rounded-[20px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <img
          className="w-[166px] h-[138px] object-cover rounded-[20px]"
          alt={item.category} // Menggunakan item.category sebagai alt untuk gambar
          src={item.mediaURL} // Menggunakan item.mediaURL sebagai sumber gambar
        />
        <div className="flex-1 text-white text-[24px] font-semibold text-center leading-normal ml-1">
          <div>{item.category}</div> {/* Menampilkan category sebagai teks */}
        </div>
      </div>
    </Link>
  );

  const chunkSize = 3; // Maksimal 3 item per baris
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunkedItems.push(items.slice(i, i + chunkSize));
  }

  return (
    <div className="p-10 bg-white">
      <div className="flex flex-col justify-center items-center ">
        {chunkedItems.map((chunk, index) => (
          <div key={index} className="md:flex md:flex-row ">
            {chunk.map((item, itemIndex) => renderItem(item, itemIndex))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box;
