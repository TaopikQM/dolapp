"use client";

import React, { useState } from 'react';
import { db, storage } from '../config/firebase';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddPlaceForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [facilities, setFacilities] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('');

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleVideoChange = (e) => {
    setVideos(Array.from(e.target.files));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "tempat_wisata"), {
        name,
        description,
        location,
        facilities,
        price,
        category,
        status: "ACTIVE" // Default status
      });

      console.log("Document written with ID: ", docRef.id);

      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(storage, `tempat_wisata/${docRef.id}/${image.name}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          console.log(`Uploaded image: ${image.name}, URL: ${imageUrl}`);
          return imageUrl;
        })
      );

      const videoUrls = await Promise.all(
        videos.map(async (video) => {
          const videoRef = ref(storage, `tempat_wisata/${docRef.id}/${video.name}`);
          await uploadBytes(videoRef, video);
          const videoUrl = await getDownloadURL(videoRef);
          console.log(`Uploaded video: ${video.name}, URL: ${videoUrl}`);
          return videoUrl;
        })
      );

      await updateDoc(doc(db, "tempat_wisata", docRef.id), {
        imageUrls,
        videoUrls
      });

      setName('');
      setDescription('');
      setLocation('');
      setFacilities('');
      setPrice('');
      setImages([]);
      setVideos([]);
      setCategory('');

      alert("Place added successfully!");
    } catch (error) {
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
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
        <input
          type="text"
          id="facilities"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
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
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Videos</label>
        <input
          type="file"
          id="videos"
          multiple
          onChange={handleVideoChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Place
      </button>
    </form>
  );
};

export default AddPlaceForm;
