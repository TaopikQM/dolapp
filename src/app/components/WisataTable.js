import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, child, getDatabase, update } from 'firebase/database';
import { rtdb, storage } from '../config/firebase';
import { getDownloadURL, ref as storageRef, deleteObject, uploadBytes } from 'firebase/storage';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

import Map from './Map';

const WisataTable = () => {
  const [places, setPlaces] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [newFacilities, setNewFacilities] = useState(newData.facilities || []);
  const [newWahana, setNewWahana] = useState(newData.wahana || []);
 // State untuk menyimpan nilai latitude dan longitude yang digabungkan
 const [currentCoordinates, setCurrentCoordinates] = useState({ latitude: '', longitude: '' });

 const coordinatesString = `${currentCoordinates.latitude}, ${currentCoordinates.longitude}`;

  const handleFacilityChange = (index, value) => {
    const updatedFacilities = [...newFacilities];
    updatedFacilities[index] = value;
    setNewFacilities(updatedFacilities);
  };

  const addFacility = () => {
    setNewFacilities([...newFacilities, '']);
  };

  const removeFacility = (index) => {
    const updatedFacilities = newFacilities.filter((_, i) => i !== index);
    setNewFacilities(updatedFacilities);
  };

  const handleWahanaChange = (index, value) => {
    const updatedWahana = [...newWahana];
    updatedWahana[index] = value;
    setNewWahana(updatedWahana);
  };

  const addWahana = () => {
    setNewWahana([...newWahana, '']);
  };

  const removeWahana = (index) => {
    const updatedWahana = newWahana.filter((_, i) => i !== index);
    setNewWahana(updatedWahana);
  };
  
  useEffect(() => {
    const placesRef = ref(rtdb, 'tempat_wisata_r');
    onValue(placesRef, (snapshot) => {
      const data = snapshot.val();
      const placesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setPlaces(placesArray);
    });
  }, []);

  useEffect(() => {
    // Update state with new data when newData changes
    setNewFacilities(newData.facilities || []);
    setNewWahana(newData.wahana || []);
    setImageUrls(newData.imageUrls || []);
    setVideoUrls(newData.videoUrls || []);

  }, [newData]);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    update(ref(rtdb, `tempat_wisata_r/${id}`), { status: newStatus });
  };

  {/*const handleReviewButtonClick = (placeId) => {
    setSelectedPlaceId(placeId);
    router.push('/ulasan');
  };
  const handleReviewButtonClick = (placeId) => {
    // Panggil fungsi navigasi untuk berpindah ke halaman ulasan
    ///navigateToReviewPage(placeId);
    history.push('/ulasan/{placeId}');
  };*/}

  const deletePlace = (id) => {
    const placeRef = ref(rtdb, `tempat_wisata_r/${id}`);
    remove(placeRef);
  };

  const handleDeleteMedia = async (url, type) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this media?');
    if (isConfirmed) {
      try {
        // Hapus media dari Firebase Storage
        const mediaRef = storageRef(storage, url);
        await deleteObject(mediaRef);
        // Hapus URL media dari state lokal
        if (type === 'image') {
            const updatedImageUrls = imageUrls.filter(imageUrl => imageUrl !== url);
            setImageUrls(updatedImageUrls);
            update(ref(rtdb, `tempat_wisata_r/${selectedPlaceId}`), { imageUrls: updatedImageUrls });
        
        } else if (type === 'video') {
            const updatedVideoUrls = videoUrls.filter(videoUrl => videoUrl !== url);
            setVideoUrls(updatedVideoUrls);
            update(ref(rtdb, `tempat_wisata_r/${selectedPlaceId}`), { videoUrls: updatedVideoUrls });
        
        }
      } catch (error) {
        //console.error('Error deleting media:', error);
      }
      
{/** 
        // Hapus data dari database
        const placeId = url.split('/')[2];
        const database = getDatabase();
        const placeRef = ref(database, `tempat_wisata_r/${placeId}`);

        // Hapus URL media dari daftar yang tersimpan di database
        const mediaTypeRef = child(placeRef, `${type}Urls`);
        remove(mediaTypeRef, url); // Hapus URL media dari database
*/}}
};

  const openEditModal = (place) => {
    setNewData(place);
    setSelectedPlaceId(place.id);
    setCurrentCoordinates({
      latitude: place.coordinates.latitude,
      longitude: place.coordinates.longitude
    });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'coordinates') {
      setCurrentCoordinates({
        latitude: value.split(',')[0].trim(),
        longitude: value.split(',')[1].trim(),
      });
    } else {
      setNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewData({ ...newData, [name]: files });
  };

  const saveEdit = async () => {
    const placeRef = ref(rtdb, `tempat_wisata_r/${selectedPlaceId}`);
    
    const updates = { ...newData, coordinates: {
      latitude: currentCoordinates.latitude || '0',
      longitude: currentCoordinates.longitude || '0',
    },};
    
    if (newData.images) {
      const imageUrls = await Promise.all(
        Array.from(newData.images).map(async (image) => {
          const imageRef = storageRef(storage, `tempat_wisata_r/${selectedPlaceId}/${image.name}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        })
      );
      updates.imageUrls = imageUrls;
    }
    if (newData.videos) {
      const videoUrls = await Promise.all(
        Array.from(newData.videos).map(async (video) => {
          const videoRef = storageRef(storage, `tempat_wisata_r/${selectedPlaceId}/${video.name}`);
          await uploadBytes(videoRef, video);
          return getDownloadURL(videoRef);
        })
      );
      updates.videoUrls = videoUrls;
    }

    // Tambahkan perubahan fasilitas dan wahana ke dalam updates
    updates.facilities = newFacilities;
    updates.wahana = newWahana;

    update(placeRef, updates);
    setEditModalOpen(false);
  };

   // Pagination logic
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const [storedItemsPerPage, setStoredItemsPerPage] = useState(10); // State tambahan untuk menyimpan pilihan pengguna
 
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = places.slice(indexOfFirstItem, indexOfLastItem);
 
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
 
   // Handle items per page change
   const handleItemsPerPageChange = (event) => {
     const newItemsPerPage = Number(event.target.value);
     setStoredItemsPerPage(newItemsPerPage); // Simpan pilihan pengguna
     setItemsPerPage(newItemsPerPage); // Update items per page
     setCurrentPage(1); // Kembali ke halaman pertama
   };

   // Total number of items
  const totalItems = places.length;

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center">
        <select
          id="itemsPerPage"
          value={storedItemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border rounded px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
       {/**  <label htmlFor="itemsPerPage" className="ml-2">Items per page</label>*/}
      </div>
      {/* Display total number of items */}
      <div className="mt-4 text-sm text-gray-500">
        Total Items: {totalItems}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((place) => (
            <tr key={place.id}>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs">
              <div>
              <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                  {place.imageUrls && place.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="relative">
                          <img src={imageUrl} alt={`Image ${index + 1}`} className="h-max-30 w-40 rounded-lg" />
                          {place.imageUrls && (
                              <button onClick={() => handleDeleteMedia(imageUrl, 'image')} className="absolute top-0 left-1/2 transform -translate-x-1/2 mb-2 bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-900">
                                  Delete
                              </button>
                          )}
                      </div>
                  ))}
                  {place.videoUrls && place.videoUrls.map((videoUrl, index) => (
                      <div key={index} className="relative">
                          <video controls className="h-50 w-80 rounded-lg">
                              <source src={videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                          </video>
                          {place.videoUrls && (
                              <button onClick={() => handleDeleteMedia(videoUrl, 'video')} className="absolute top-0 left-1/2 transform -translate-x-1/2 mb-2 bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-900">
                                  Delete
                              </button>
                          )}
                      </div>
                  ))}
              </Carousel>
                </div>

              </td>
              <td className="px-6 py-4 whitespace-normal max-w-xs text-sm font-medium text-gray-900">
                <div className="text-sm text-gray-900">{place.name}</div>
                <div className="text-sm text-gray-500">{place.wilayah}</div>
                
                <div className="text-sm text-blue-600">
                  {Array.isArray(place.wahana) && place.wahana.length > 0 ? (
                    place.wahana.join(', ')
                  ) : (
                    <div>No Wahana Available</div>
                  )}
                </div>
                <div className="text-sm text-red-500">{place.informasiTam}</div>
                <div className="text-sm text-gray-500">
                  {Array.isArray(place.facilities) && place.facilities.length > 0 ? (
                    place.facilities.join(', ')
                  ) : (
                    <div>No Facilities Available</div>
                  )}
                </div>      
                <div className="text-sm text-gray-500">{place.openingHours.open} - {place.openingHours.close}</div>
                <div className="text-sm text-green-500">{place.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-normal max-w-xs">
                <div className="text-sm text-gray-500">{place.description}</div>
                <div className="text-sm text-red-600">Maps = {place.coordinates ? (
                  <p>
                    {Number.isFinite(parseFloat(place.coordinates.latitude)) ? parseFloat(place.coordinates.latitude) : '0'} ,<br />
                    {Number.isFinite(parseFloat(place.coordinates.longitude)) ? parseFloat(place.coordinates.longitude) : '0'}
                  </p>
                ) : (
                  <p>Data koordinat tidak tersedia</p>
                )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {place.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleStatus(place.id, place.status)}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${place.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {place.status}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {/* Container untuk baris pertama (Review) */}
                <div className="flex justify-center">
                  <Link href={`/detail/${encodeURIComponent(place.id)}`} key={place.id}>
                    <div className="text-green-600 hover:text-green-600 cursor-pointer">
                      Review
                    </div>
                  </Link>
                </div>

                {/* Baris Kedua */}
                <div className="flex flex-row items-center">
                  {/* Kolom Pertama di Baris Kedua */}
                  <button onClick={() => openEditModal(place)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                    Edit
                  </button>

                  {/* Kolom Kedua di Baris Kedua */}
                  <button onClick={() => deletePlace(place.id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

     {places.length > itemsPerPage && (
        <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing  
            <span className="font-semibold text-gray-900 dark:text-blue-500"> {Math.min((currentPage - 1) * itemsPerPage + 1, places.length)}-{Math.min(currentPage * itemsPerPage, places.length)} </span> of  
            <span className="font-semibold text-gray-900 dark:text-blue-500"> {places.length}</span>
          </span>
          
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mt-4">
            <li>
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  Previous
                </button>
              )}
            </li>
           
            {[...Array(Math.ceil(places.length / itemsPerPage)).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 ${page + 1 === currentPage ? 'bg-white text-blue-500 border border-blue-500' : 'bg-blue-500 text-white'} mx-2`}
              >
                {page + 1}
              </button>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${places.length <= currentPage * itemsPerPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white'}`}
                disabled={places.length <= currentPage * itemsPerPage}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      )}


      {editModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Place</h3>
                  <div className="mt-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" id="name" name="name" value={newData.name || ''} onChange={handleEditChange} placeholder="Enter place name" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <input type="text" id="description" name="description" value={newData.description || ''} onChange={handleEditChange} placeholder="Enter description" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="informationTam" className="block text-sm font-medium text-gray-700">Informasi Tambahan</label>
                      <input type="text" id="informationTam" name="informationTam" value={newData.informationTam || ''} onChange={handleEditChange} placeholder="Enter informasi tambahan" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                      <input type="text" id="alamat" name="alamat" value={newData.alamat || ''} onChange={handleEditChange} placeholder="Enter alamat" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="wilayah" className="block text-sm font-medium text-gray-700">Wilayah</label>
                      <input type="text" id="wilayah" name="wilayah" value={newData.wilayah || ''} onChange={handleEditChange} placeholder="Enter wilayah" className="mb-2 border p-2 rounded w-full" />
                    
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Koordinat Alamat Wisata:</label>
                        <input
                          type="text"
                          id="coordinates"
                          name="coordinates"
                          value={coordinatesString}
                          onChange={handleEditChange}
                          placeholder="Latitude, Longitude"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      {coordinatesString && (
                        <Map coordinates={coordinatesString} />
                      )}

                      <br/><br/>

                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                      <input type="text" id="price" name="price" value={newData.price || ''} onChange={handleEditChange} placeholder="Enter price" className="mb-2 border p-2 rounded w-full" />
                      
                      <label className="block text-sm font-medium text-gray-700">Wahana</label>
                        {newWahana.map((wahanaItem, index) => (
                          <div key={index} className="flex items-center mt-1">
                            <input
                              type="text"
                              value={wahanaItem}
                              onChange={(e) => handleWahanaChange(index, e.target.value)}
                              className=" mb-2 border p-2   block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                          className="mb-5 mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Add
                        </button>

                     
                      <label className="block text-sm font-medium text-gray-700">Facilities</label>
                        {newFacilities.map((facility, index) => (
                          <div key={index} className="flex items-center mt-1">
                            <input
                              type="text"
                              value={facility}
                              onChange={(e) => handleFacilityChange(index, e.target.value)}
                              className="mb-2 border p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                          className="mb-5 mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Add
                        </button>

{/** 
                      <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
                      <input type="text" id="facilities" name="facilities" value={newData.facilities || ''} onChange={handleEditChange} placeholder="Enter facilities" className="mb-2 border p-2 rounded w-full" />
*/}
                      
                     
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
                                name="timeopen"
                                value={newData.openingHours.open || ''} onChange={handleEditChange}
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
                                name="timeclose"
                                value={newData.openingHours.close || ''} onChange={handleEditChange}
                                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                min="00:00"
                                max="23:59"
                                />
                            </div>
                            </div>
                        
                      

                      <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
                      <input type="file" id="images" name="images" onChange={handleFileChange} multiple className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Videos</label>
                      <input type="file" id="videos" name="videos" onChange={handleFileChange} multiple className="mb-2 border p-2 rounded w-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={saveEdit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                <button onClick={() => setEditModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WisataTable;
