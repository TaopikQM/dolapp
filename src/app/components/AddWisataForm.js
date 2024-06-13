import React, { useState } from 'react';
import { storage, rtdb } from '../config/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, set, update } from "firebase/database";


const AddWisataForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [wilayah, setwilayah] = useState('');
  const [wahana, setWahana] = useState('');
  const [informationTam, setInformationTam] = useState('');
  const [facilities, setFacilities] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('');
  const [openingHours, setOpeningHours] = useState({ open: '', close: '' });
  const [alamat, setAlamat] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state isLoading



  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e) => {
    setVideos(Array.from(e.target.files));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFacilityChange = (index, value) => {
    const newFacilities = [...facilities];
    newFacilities[index] = value;
    setFacilities(newFacilities);
  };

  const addFacility = () => {
    setFacilities([...facilities, '']);
  };

  const removeFacility = (index) => {
    const newFacilities = facilities.filter((_, i) => i !== index);
    setFacilities(newFacilities);
  };

  const handleWahanaChange = (index, value) => {
    const newWahana = [...wahana];
    newWahana[index] = value;
    setWahana(newWahana);
  };

  const addWahana = () => {
    setWahana([...wahana, '']);
  };

  const removeWahana = (index) => {
    const newWahana = wahana.filter((_, i) => i !== index);
    setWahana(newWahana);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mulai proses upload
    try {
      const currentTime = new Date().toLocaleString();

      const newWisataRef = push(databaseRef(rtdb, 'tempat_wisata_r'));
      const newWisataKey = newWisataRef.key;

      const initialData = {
        name,
        description,
        facilities: Array.isArray(facilities) ? facilities : [], // Ensure facilities is an array
        price,
        category,
        openingHours,
        alamat,
        informationTam,
        wahana: Array.isArray(wahana) ? wahana : [], // Ensure wahana is an array
       
        wilayah,
        status: "ACTIVE",
        createdAt: currentTime
      };

      await set(newWisataRef, initialData);

      console.log("Data saved to Realtime Database with key: ", newWisataKey);

      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = storageRef(storage, `tempat_wisata_r/${newWisataKey}/${image.name}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          console.log(`Uploaded image: ${image.name}, URL: ${imageUrl}`);
          return imageUrl;
        })
      );

      const videoUrls = await Promise.all(
        videos.map(async (video) => {
          const videoRef = storageRef(storage, `tempat_wisata_r/${newWisataKey}/${video.name}`);
          await uploadBytes(videoRef, video);
          const videoUrl = await getDownloadURL(videoRef);
          console.log(`Uploaded video: ${video.name}, URL: ${videoUrl}`);
          return videoUrl;
        })
      );

      // Here, using update instead of set to avoid overwriting the entire node
      await update(databaseRef(rtdb, `tempat_wisata_r/${newWisataKey}`), {
        imageUrls,
        videoUrls
      });

      setName('');
      setDescription('');
      setwilayah('');
      setFacilities('');
      setPrice('');
      setImages([]);
      setVideos([]);
      setCategory('');
      setOpeningHours({ open: '', close: '' });
      setAlamat('');
      setWahana('');
      setInformationTam('');
      

      setIsLoading(false); // Selesai upload
      alert("Place added successfully!"); 
      window.location.reload(); // Refresh the page
    } catch (error) {
        setIsLoading(false); // Selesai upload dengan kesalahan
      console.error("Error adding document: ", error);
      alert("Error adding place.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="informationTam" className="block text-sm font-medium text-gray-700">Informasi Tambahan</label>
        <textarea
          id="informationTam"
          value={informationTam}
          onChange={(e) => setInformationTam(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      {/**<div>
        <label htmlFor="wahana" className="block text-sm font-medium text-gray-700">Wahana</label>
        <textarea
          id="wahana"
          value={wahana}
          onChange={(e) => setWahana(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>*/}
      <div>
        <label className="block text-sm font-medium text-gray-700">Wahana</label>
        {Array.isArray(wahana) && wahana.map((wahanaItem, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="text"
              value={wahanaItem}
              onChange={(e) => handleWahanaChange(index, e.target.value)}
              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeWahana(index)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addWahana}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </div>

      <div>
        <label htmlFor="wilayah" className="block text-sm font-medium text-gray-700">Wilayah</label>
        <input
          type="text"
          id="wilayah"
          value={wilayah}
          onChange={(e) => setwilayah(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
     {/**  <div>
        <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
        <input
          type="text"
          id="facilities"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>*/}
     <div>
        <label className="block text-sm font-medium text-gray-700">Facilities</label>
        {Array.isArray(facilities) && facilities.map((facility, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="text"
              value={facility}
              onChange={(e) => handleFacilityChange(index, e.target.value)}
              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeFacility(index)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addFacility}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <div className="flex flex-wrap">
          {[
            "Wisata Alam",
            "Wisata Budaya",
            "Wisata Religi",
            "Wisata Sejarah",
            "Taman Rekreasi",
            "Wisata Kuliner",
            "Pusat Perbelanjaan",
            "Tempat Menginap"
          ].map((categoryOption) => (
            <div key={categoryOption} className="mr-4 mb-2">
              <input
                type="radio"
                id={categoryOption}
                value={categoryOption}
                checked={category === categoryOption}
                onChange={handleCategoryChange}
                className="mr-1"
              />
              <label htmlFor={categoryOption} className="text-sm">{categoryOption}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="timeopen" className="block text-sm font-medium text-gray-700">Time Open</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
              </svg>
            </div>
            <input
              type="time"
              id="timeopen"
              value={openingHours.open}
              onChange={(e) => setOpeningHours({ ...openingHours, open: e.target.value })}
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="00:00"
              max="23:59"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
              </svg>
              </div>
              <input
                type="time"
                id="timeclose"
                value={openingHours.close}
                onChange={(e) => setOpeningHours({ ...openingHours, close: e.target.value })}
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="00:00"
                max="23:59"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
          <textarea
            id="alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Videos</label>
          <input
            type="file"
            id="videos"
            multiple
            accept="video/*"
            onChange={handleVideoChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading} // Tambahkan properti disabled berdasarkan isLoading
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
         {isLoading ? "Adding..." : "Add Wisata"} {/* Ubah label tombol berdasarkan isLoading */}
     
        </button>

        {/* Tampilkan popup loading saat isLoading true */}
        {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            )}
      </form>
  );
};

export default AddWisataForm;
