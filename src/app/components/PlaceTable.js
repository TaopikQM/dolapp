import React, { useEffect, useState } from 'react';
import { db, storage } from '../config/firebase';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [newData, setNewData] = useState({
    name: '',
    location: '',
    facilities: '',
    description: '',
    price: '',
    category: '',
  });
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [deletedVideos, setDeletedVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tempat_wisata"));
        const fetchedPlaces = [];
        querySnapshot.forEach((doc) => {
          fetchedPlaces.push({ id: doc.id, ...doc.data() });
        });
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      const placeDoc = doc(db, "tempat_wisata", id);
      await updateDoc(placeDoc, { status: newStatus });

      setPlaces(prevPlaces =>
        prevPlaces.map(place =>
          place.id === id ? { ...place, status: newStatus } : place
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const openEditModal = (place) => {
    setCurrentPlace(place);
    setNewData(place);
    setNewImages([]);
    setNewVideos([]);
    setDeletedImages([]);
    setDeletedVideos([]);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setNewImages(files);
    } else if (name === 'videos') {
      setNewVideos(files);
    }
  };

  const handleDeleteMedia = (url, type) => {
    if (type === 'image') {
      setDeletedImages((prev) => [...prev, url]);
    } else if (type === 'video') {
      setDeletedVideos((prev) => [...prev, url]);
    }
  };

  const saveEdit = async () => {
    if (currentPlace) {
      try {
        const placeDoc = doc(db, "tempat_wisata", currentPlace.id);
        await updateDoc(placeDoc, newData);

        let updatedPlace = { ...currentPlace, ...newData };

        if (newImages.length > 0) {
          const imageUrls = await Promise.all(
            Array.from(newImages).map(async (image) => {
              const imageRef = ref(storage, `tempat_wisata/${placeDoc.id}/${image.name}`);
              await uploadBytes(imageRef, image);
              const imageUrl = await getDownloadURL(imageRef);
              return imageUrl;
            })
          );
          updatedPlace.imageUrls = [...(updatedPlace.imageUrls || []), ...imageUrls];
        }

        if (newVideos.length > 0) {
          const videoUrls = await Promise.all(
            Array.from(newVideos).map(async (video) => {
              const videoRef = ref(storage, `tempat_wisata/${placeDoc.id}/${video.name}`);
              await uploadBytes(videoRef, video);
              const videoUrl = await getDownloadURL(videoRef);
              return videoUrl;
            })
          );
          updatedPlace.videoUrls = [...(updatedPlace.videoUrls || []), ...videoUrls];
        }

        // Handle deletions
        for (const url of deletedImages) {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        }

        for (const url of deletedVideos) {
          const videoRef = ref(storage, url);
          await deleteObject(videoRef);
        }

        updatedPlace.imageUrls = updatedPlace.imageUrls.filter(url => !deletedImages.includes(url));
        updatedPlace.videoUrls = updatedPlace.videoUrls.filter(url => !deletedVideos.includes(url));

        await updateDoc(placeDoc, {
          imageUrls: updatedPlace.imageUrls,
          videoUrls: updatedPlace.videoUrls,
        });

        setPlaces(prevPlaces =>
          prevPlaces.map(place =>
            place.id === currentPlace.id ? updatedPlace : place
          )
        );

        setEditModalOpen(false);
        alert('Data saved successfully!');
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const deletePlace = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this place?");
    if (confirmDelete) {
      try {
        const placeDoc = doc(db, "tempat_wisata", id);
        await deleteDoc(placeDoc);

        setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {places.map((place) => (
            <tr key={place.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                <div>
                  <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                    {place.imageUrls && place.imageUrls.map((imageUrl, index) => (
                      <div key={index}>
                        <img src={imageUrl} alt={`Image ${index + 1}`} className="h-30 w-40 rounded-lg" />
                        <button onClick={() => handleDeleteMedia(imageUrl, 'image')} className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    ))}
                    {place.videoUrls && place.videoUrls.map((videoUrl, index) => (
                      <div key={index}>
                        <video controls className="h-30 w-40 rounded-lg">
                          <source src={videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button onClick={() => handleDeleteMedia(videoUrl, 'video')} className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="text-sm text-gray-900">{place.name}</div>
                <div className="text-sm text-gray-500">{place.location}</div>
                <div className="text-sm text-gray-500">{place.facilities}</div>
                <div className="text-sm text-green-500">{place.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                <div className="text-sm text-gray-500">{place.description}</div>
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
                <button onClick={() => openEditModal(place)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => deletePlace(place.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                      <input type="text" id="name" name="name" value={newData.name} onChange={handleEditChange} placeholder="Enter place name" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <input type="text" id="location" name="location" value={newData.location} onChange={handleEditChange} placeholder="Enter location" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
                      <input type="text" id="facilities" name="facilities" value={newData.facilities} onChange={handleEditChange} placeholder="Enter facilities" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <input type="text" id="description" name="description" value={newData.description} onChange={handleEditChange} placeholder="Enter description" className="mb-2 border p-2 rounded w-full" />
                      
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                      <input type="text" id="price" name="price" value={newData.price} onChange={handleEditChange} placeholder="Enter price" className="mb-2 border p-2 rounded w-full" />
                      
                      
                      
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

export default PlaceList;

