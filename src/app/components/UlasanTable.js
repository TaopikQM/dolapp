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

  return (
    <div className="overflow-x-auto">
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
          {ulasans.map((ulasan) => (
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
