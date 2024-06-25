import React, { useState } from 'react';
import { storage, rtdb } from '../config/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, set } from "firebase/database";

const AddMenuCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    const handleInputChange = (event) => {
        setNewCategory(event.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const uploadImage = async () => {
        if (!image) {
            throw new Error("No image selected");
        }
        try {
            const imageRef = storageRef(storage, `menu_category/${image.name}`);
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
        setIsLoading(true);
        try {
            const currentTime = new Date().toLocaleString();
            const imageURL = await uploadImage();

            const newCategoryRef = push(databaseRef(rtdb, 'menu_category'));
            const initialData = {
                category: newCategory,
                status: "ACTIVE",
                mediaURL: imageURL,
                createdAt: currentTime
            };

            await set(newCategoryRef, initialData);

            setNewCategory('');
            setIsLoading(false);
            alert("Category added successfully!");
        } catch (error) {
            setIsLoading(false);
            console.error("Error adding category: ", error);
            alert("Error adding category.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
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
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMenuCategory;
