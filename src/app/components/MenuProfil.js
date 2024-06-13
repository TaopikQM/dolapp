import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const MenuProfil = () => {
    const [isEditing, setIsEditing] = useState(false); // State untuk mengontrol apakah sedang dalam mode edit atau tidak
    const [newPhotoURL, setNewPhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);


  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await updateProfile(user, {
        photoURL: newPhotoURL,
      });
      setNewPhotoURL(''); // Reset new photo URL after saving
      setIsEditing(false); // Exit edit mode after saving
      alert('Profil berhasil diperbarui');
      setIsLoading(false);
      // window.location.reload(); // Reload to update UI with new profile photo
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await updateProfile(user, {
        photoURL: '',
      });
      alert('Profil berhasil dihapus');
      setIsLoading(false);
      // window.location.reload(); // Reload to update UI with removed profile photo
    } catch (error) {
      console.error('Error deleting profile photo:', error);
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true); // Set uploading state to true when file is selected
    setIsLoading(true);
    setProgress(0);
    try {
      // Delete old profile photo if it exists
      if (user.photoURL) {
        const oldPhotoRef = ref(storage, user.photoURL);
        await deleteObject(oldPhotoRef);
      }

      // Upload new file to Firebase Storage with progress tracking
      const fileRef = ref(storage, `profile/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('Error uploading file:', error);
          setIsLoading(false);
          setUploading(false); // Reset uploading state on error
        },
        async () => {
          const downloadURL = await getDownloadURL(fileRef);
          setNewPhotoURL(downloadURL);
          setIsLoading(false);
          setUploading(false); // Reset uploading state after successful upload
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsLoading(false);
      setUploading(false); // Reset uploading state on error
    }
  };

  const handleLogoutClick = () => {
    if (isConfirmingLogout) {
      handleLogout();
    } else {
      setIsConfirmingLogout(true);
    }
  };

 
  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      {user ? (
        <div className="flex flex-col items-center">
          {!isEditing ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://via.placeholder.com/150'}
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                alt="Foto Profil"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 mb-4">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-full"
                  onClick={() => setIsEditing(true)} // Set isEditing to true to enter edit mode
                >
                  Edit
                </button>
              </div>
              <div className="absolute bottom-0 right-0 mb-4">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-full"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">Edit Photo</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
              />
              {uploading && (
                <div className="mb-4">
                  <progress value={progress} max="100" className="w-full"></progress>
                </div>
              )}
              <div className="mt-4 flex justify-end">
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
          )}
          <h1 className="text-xl font-bold">{user.displayName}</h1>
          {/*<p className="text-gray-700">Software Developer</p>*/}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      {!isEditing && (
        <>
          {/*<div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
            <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
          </div>*/}
          <hr className="my-6 border-t border-gray-300" />
          <div className="flex flex-col gap-2">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Akun</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Tiket Aktif</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Riwayat Perjalanan</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Pusat Bantuan</button>
            <button onClick={handleLogoutClick} className="bg-red-600 text-white px-4 py-2 rounded text-[22px] font-medium">
              {isConfirmingLogout ? 'Yakin?' : 'Keluar'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuProfil;
