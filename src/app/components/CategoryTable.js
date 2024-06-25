import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Popup from './Popup'; // Sesuaikan dengan path file Popup.js

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [storedItemsPerPage, setStoredItemsPerPage] = useState(10); // State tambahan untuk menyimpan pilihan pengguna

  // Inisialisasi Firebase
  const rtdb = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    const categoryRef = ref(rtdb, 'menu_category');
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoryList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(categoryList);
      } else {
        setCategories([]);
      }
    });
  }, [rtdb]);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    update(ref(rtdb, `menu_category/${id}`), { status: newStatus })
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === id ? { ...category, status: newStatus } : category
          )
        );
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        alert('Terjadi kesalahan saat mengubah status kategori.');
      });
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditCategory(category.category);
    setIsEditing(true);
    setIsPopupOpen(true);
  };

  const handleSaveEdit = async () => {
    if (selectedCategory) {
      const categoryRef = ref(rtdb, `menu_category/${selectedCategory.id}`);
      const updatedCategory = {
        ...selectedCategory,
        category: editCategory,
        createdAt: new Date().toISOString(),
      };

      if (editImage) {
        try {
          const imageRef = storageRef(storage, `menu_category/${selectedCategory.id}`);
          await uploadBytes(imageRef, editImage);
          updatedCategory.mediaURL = await getDownloadURL(imageRef);

          if (selectedCategory.mediaURL) {
            const oldImageRef = storageRef(storage, selectedCategory.mediaURL);
            await deleteObject(oldImageRef);
          }
        } catch (error) {
          console.error('Error updating image:', error);
          alert('Terjadi kesalahan saat mengubah gambar.');
          return;
        }
      }

      try {
        await update(categoryRef, updatedCategory);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === selectedCategory.id ? updatedCategory : category
          )
        );
        setIsEditing(false);
        setEditImage(null);
        setIsPopupOpen(false);
        alert('Kategori berhasil diperbarui.');
      } catch (error) {
        console.error('Error updating category:', error);
        alert('Terjadi kesalahan saat memperbarui kategori.');
      }
    }
  };

  const handleDeleteCategory = async (id, imageUrl) => {
    const confirmation = window.confirm('Apakah Anda yakin ingin menghapus kategori ini?');
    if (confirmation) {
      const categoryRef = ref(rtdb, `menu_category/${id}`);
      try {
        // Hapus dari Realtime Database
        await remove(categoryRef);
  
        // Hapus dari Cloud Storage
        const storageRef = storage.refFromURL(imageUrl);
        await storageRef.delete();
  
        // Hapus kategori dari state
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
  
        // Tampilkan alert bahwa kategori berhasil dihapus hanya jika tidak ada kesalahan
        alert('Kategori berhasil dihapus.');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Terjadi kesalahan saat menghapus kategori.');
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsEditing(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

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
  const totalItems = categories.length;

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
        {/**<label htmlFor="itemsPerPage" className="ml-2">Items per page</label>
      */}</div>
      {/* Display total number of items */}
      <div className="mt-4 text-sm text-gray-500">
        Total Items: {totalItems}
      </div>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Media
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <img src={category.mediaURL} alt="Category" width="100" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {category.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleStatus(category.id, category.status)}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    category.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {category.status}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id, category.mediaURL)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {categories.length > itemsPerPage && (
        <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing  
            <span className="font-semibold text-gray-900 dark:text-blue-500"> {Math.min((currentPage - 1) * itemsPerPage + 1, categories.length)}-{Math.min(currentPage * itemsPerPage, categories.length)} </span> of  
            <span className="font-semibold text-gray-900 dark:text-blue-500"> {categories.length}</span>
          </span>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md mr-2"
                >
                  Previous
                </button>
              )}
              
              {[...Array(Math.ceil(categories.length / itemsPerPage)).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 ${page + 1 === currentPage ? 'bg-white text-blue-500 border border-blue-500' : 'bg-blue-500 text-white'} mx-2`}
              >
                {page + 1}
              </button>
            ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-1 bg-gray-300 text-gray-800 rounded-md ${categories.length <= itemsPerPage || currentPage * itemsPerPage >= categories.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={categories.length <= itemsPerPage || currentPage * itemsPerPage >= categories.length}
              >
                Next
              </button>
            </div>
            
            <div>
              <span className="text-sm text-gray-500 mr-2">Page {currentPage}</span>
              <span className="text-sm text-gray-500">of {Math.ceil(categories.length / itemsPerPage)}</span>
            </div>
          </div>
        </div>
      )}

     
      <Popup isOpen={isPopupOpen} onClose={togglePopup}>
        <div className="text-lg font-medium mb-4">Edit Category</div>
        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
          <div className="mb-4">
            <label className="block">Category:</label>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={togglePopup}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Popup>
    </div>
  );
};


export default CategoryTable;

