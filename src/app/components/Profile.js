import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile, deleteUser } from 'firebase/auth';
import { ref, get, set, remove } from 'firebase/database';
import { rtdb } from '../config/firebase';

const Profile = ({ handleLogoutClick, isConfirmingLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGender, setNewGender] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        setNewDisplayName(user.displayName || '');
        setNewEmail(user.email || '');

        const userId = user.uid;
        const userRef = ref(rtdb, `users/${userId}`);
        
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setNewGender(userData.gender || '');
            setNewPhoneNumber(userData.phoneNumber || '');
            setNewBirthDate(userData.birthDate || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const currentTime = new Date().toISOString();
      await updateProfile(user, {
        displayName: newDisplayName,
      });

      const userId = user.uid;
      const userRef = ref(rtdb, `users/${userId}`);
      await set(userRef, {
        displayName: newDisplayName,
        gender: newGender || null,
        phoneNumber: newPhoneNumber || null,
        birthDate: newBirthDate || null,
        time: currentTime
      });

      setIsEditing(false);
      alert('Profil berhasil diperbarui');
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus akun Anda? Ini tidak dapat dibatalkan.');
  
    if (confirmDelete && user) {
      try {
        const userId = user.uid;
        const userRef = ref(rtdb, `users/${userId}`);
  
        // Hapus data pengguna dari Realtime Database
        await remove(userRef);
  
        // Hapus akun pengguna dari Authentication
        await deleteUser(user);
  
        alert('Akun Anda telah dihapus.');
        
        // Setelah menghapus akun, atur pengguna menjadi null untuk menunjukkan bahwa tidak ada pengguna yang sedang login.
        setUser(null);
  
        // Redirect or handle app state accordingly, such as navigating to a different page or displaying a login form.
        // For example, you can redirect users to the home page after deleting their account.
        window.location.href = '/'; // Redirect users to the home page after deleting their account.
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Terjadi kesalahan saat menghapus akun Anda.');
      }
    }
  };
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      <div>
        <div className="bg-blue-500 text-white py-4 text-center rounded-lg">
          <h1 className="text-3xl font-bold">Akun</h1>
        </div>
        {user && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            {isEditing ? (
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Edit Data</h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama:</label>
                  <input
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Tanggal Lahir:</label>
                  <input
                    type="date"
                    placeholder="Birth Date"
                    value={newBirthDate}
                    onChange={(e) => setNewBirthDate(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Jenis Kelamin:</label>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="gender"
                        value="Laki-laki"
                        checked={newGender === 'Laki-laki'}
                        onChange={() => setNewGender('Laki-laki')}
                      /> Laki-laki
                    </label>
                    <label className="inline-flex items-center ml-4">
                      <input
                        type="radio"
                        className="form-radio"
                        name="gender"
                        value="Perempuan"
                        checked={newGender === 'Perempuan'}
                        onChange={() => setNewGender('Perempuan')}
                      /> Perempuan
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nomor HP:</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
                <div className="flex justify-end w-full">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Nama:</p>
                  <p>{newDisplayName}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Tanggal Lahir:</p>
                  <p>{newBirthDate ? formatDate(newBirthDate) : 'Belum diatur'}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Jenis Kelamin:</p>
                  <p>{newGender ? newGender : 'Belum diatur'}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Email:</p>
                  <p>{newEmail}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Nomor HP:</p>
                  <p>{newPhoneNumber ? newPhoneNumber : 'Belum diatur'}</p>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={handleDeleteAccount}
                  >
                    Hapus Akun
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Edit Akun
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
