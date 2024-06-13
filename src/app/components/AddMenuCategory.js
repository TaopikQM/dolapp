import React, { useState, useEffect } from 'react';
import { storage, rtdb } from '../config/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, set, onValue, update } from "firebase/database";


const AddMenuCategory = () => {
    const [showInput, setShowInput] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Tambah state isLoading dan setIsLoading
    const [categories, setCategories] = useState([]); // State untuk menyimpan kategori yang ada
    const [image, setImage] = useState(null);

    useEffect(() => {
        const categoryRef = databaseRef(rtdb, 'menu_category');
        onValue(categoryRef, (snapshot) => { // Menggunakan onValue
            const data = snapshot.val();
            if (data) {
              const categoryList = Object.values(data);
              setCategories(categoryList);
            }
          });
      }, []);

  
    const handleAddCategory = () => {
      setShowInput(true);
    };
  
    const handleInputChange = (event) => {
      setNewCategory(event.target.value);
    };
  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };

      const toggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        update(ref(rtdb, `menu_category/${id}`), { status: newStatus });
      };
  
      const uploadImage = async () => {
        if (!image) {
            throw new Error("No image selected");
        }
        try {
            const imageRef = storageRef(storage, `images/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);
            return imageURL;
        } catch (error) {
            console.error("Error uploading image: ", error);
            throw new Error("Failed to upload image.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Mulai proses upload
        try {
        const currentTime = new Date().toLocaleString();
        const imageURL = await uploadImage();

        const newWisataRef = push(databaseRef(rtdb, 'menu_category'));
        const newWisataKey = newWisataRef.key;

        const initialData = {
            category: newCategory, 
            status: "ACTIVE",
            mediaURL: imageURL,
            createdAt: currentTime
        };

        await set(newWisataRef, initialData);

        console.log("Data saved to Realtime Database with key: ", newWisataKey);

        setNewCategory('');

        setIsLoading(false); // Selesai upload
        alert("Place added successfully!"); 
        //window.location.reload(); // Refresh the page
        } catch (error) {
            setIsLoading(false); // Selesai upload dengan kesalahan
        console.error("Error adding document: ", error);
        alert("Error adding place.");
        }
    };


  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap gap-10">
      {showInput ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Masukkan kategori baru"
            value={newCategory}
            onChange={handleInputChange}
            className="border border-gray-400 px-2 py-1 rounded-md mb-2"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="border border-gray-400 px-2 py-1 rounded-md mb-2"
          />
          <div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Simpan</button>
            <button onClick={() => setShowInput(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Batal</button>
          </div>
        </div>
      ) : (
        <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded-md mb-2">Tambah Kategori</button>
      )}
      <div className="flex flex-col items-center">
        {/* Tampilkan kategori-kategori yang ada di bawah tombol */}
        <table>
          <thead>
            <tr>
              <th>Media</th>
              <th>Category</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>
                  <img src={category.mediaURL} alt="Category" width="100" />
                </td>
                <td>{category.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleStatus(category.id, category.status)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {category.status}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(category)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(category)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddMenuCategory;
