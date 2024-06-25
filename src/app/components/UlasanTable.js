import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, update } from "firebase/database";
import { rtdb } from '../config/firebase';

const UlasanTable = () => {
  const [ulasans, setUlasans] = useState([]);
  const [selectedUlasan, setSelectedUlasan] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNama, setEditNama] = useState('');
  const [editUlasan, setEditUlasan] = useState('');

  
  useEffect(() => {
    // Ambil data ulasan dari Firebase Realtime Database
    const ulasanRef = ref(rtdb, 'ulasan');
    onValue(ulasanRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ulasanList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setUlasans(ulasanList);
      } else {
        setUlasans([]);
      }
    });

  }, []);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    update(ref(rtdb, `ulasan/${id}`), { status: newStatus })
      .then(() => {
        setUlasans(ulasans.map(ulasan => ulasan.id === id ? { ...ulasan, status: newStatus } : ulasan));
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Terjadi kesalahan saat mengubah status ulasan.");
      });
  };


  const handleEditUlasan = (ulasan) => {
    setSelectedUlasan(ulasan);
    setEditNama(ulasan.nama);
    setEditUlasan(ulasan.ulasan);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (selectedUlasan) {
      const ulasanRef = ref(rtdb, `ulasan/${selectedUlasan.id}`);
      const updatedUlasan = {
        ...selectedUlasan,
        nama: editNama,
        ulasan: editUlasan,
      };

      try {
        await update(ulasanRef, updatedUlasan);
        setUlasans(ulasans.map(ulasan => ulasan.id === selectedUlasan.id ? updatedUlasan : ulasan));
        setIsEditing(false);
        alert('Ulasan berhasil diperbarui.');
      } catch (error) {
        console.error("Error updating ulasan:", error);
        alert('Terjadi kesalahan saat memperbarui ulasan.');
      }
    }
  };

  const handleDeleteUlasan = (id) => {
    const confirmation = window.confirm("Apakah Anda yakin ingin menghapus ulasan ini?");
    if (confirmation) {
      remove(ref(rtdb, `ulasan/${id}`))
        .then(() => {
          setUlasans(ulasans.filter((ulasan) => ulasan.id !== id));
          alert("Ulasan berhasil dihapus.");
        })
        .catch((error) => {
          console.error("Error deleting ulasan:", error);
          alert("Terjadi kesalahan saat menghapus ulasan.");
        });
    }
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [storedItemsPerPage, setStoredItemsPerPage] = useState(10); // State tambahan untuk menyimpan pilihan pengguna

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ulasans.slice(indexOfFirstItem, indexOfLastItem);

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
  const totalItems = ulasans.length;

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
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ulasan</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((ulasan) => (
            <tr key={ulasan.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={ulasan.foto} alt="Foto Ulasan" className="h-8 w-8 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ulasan.nama}</td>
              <td className="px-6 py-4 max-w-xs whitespace-pre-wrap break-words text-sm text-gray-500">{ulasan.ulasan}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleStatus(ulasan.id, ulasan.status)}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ulasan.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {ulasan.status}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ulasan.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleEditUlasan(ulasan)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => handleDeleteUlasan(ulasan.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ulasans.length > itemsPerPage && (
        <div class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing  
             <span className="font-semibold text-gray-900 dark:text-blue-500"> {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-{Math.min(currentPage * itemsPerPage, totalItems)} </span> of  
            <span className="font-semibold text-gray-900 dark:text-blue-500"> {totalItems}</span>
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
           
            {[...Array(Math.ceil(ulasans.length / itemsPerPage)).keys()].map((page) => (
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
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${ulasans.length <= currentPage * itemsPerPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white'}`}
                disabled={ulasans.length <= currentPage * itemsPerPage}
              >
                Next
              </button>
            </li>
          </ul>
      </div>
    )}


      {isEditing && (
        <div className="mt-4">
          <h3>Edit Ulasan</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
            <div>
              <label>Nama:</label>
              <input
                type="text"
                value={editNama}
                onChange={(e) => setEditNama(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
            <div>
              <label>Ulasan:</label>
              <textarea
                value={editUlasan}
                onChange={(e) => setEditUlasan(e.target.value)}
                className="border rounded px-2 py-1"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Simpan</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2">Batal</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UlasanTable;
