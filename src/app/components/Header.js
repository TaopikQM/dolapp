"use client"; // Tambahkan ini di bagian atas file

import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [user, setUser] = useState(null);

  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    // Listener untuk mengupdate informasi pengguna saat status login berubah
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Jika pengguna sudah login, set informasi pengguna ke state
        setUser(authUser);
      } else {
        // Jika tidak ada pengguna yang login, kosongkan state
        setUser(null);
      }
    });

    // Cleanup listener saat komponen unmount
    return () => unsubscribe();
  }, []);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user'); // Hapus data pengguna dari localStorage
     
      window.location.href = "/"; // Redirect ke halaman beranda setelah logout
    } catch (error) {
      console.error('Error logging out:', error);
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
    <header className="bg-white text-black w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mr-2" />
          </div>
        <nav className="hidden md:flex justify-center space-x-4 flex-1">
          <a
            href="/"
            className={`px-4 py-2 text-[22px] font-normal ${currentPath === '/' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}
          >
            Beranda
          </a>
           <a
            href="/admin"
            className={`px-4 py-2 text-[22px] font-normal ${currentPath === '/admin' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}
          >
            Promo
          </a>
          
          <a
            href="/AddProduct"
            className={`px-4 py-2 text-[22px] font-normal ${currentPath === '/detail' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}
          >
            Event
          </a>
          <a
            href="/profil"
            className={`px-4 py-2 text-[22px] font-normal ${currentPath === '/profil' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}
          >
            Profil
          </a>
        </nav>
        {user && (
          <div className="flex items-center gap-4">
            <div onClick={() => { window.location.href = "/profil"; }} className="cursor-pointer">
              <img src={user.photoURL} alt="Foto Profil" className="h-10 w-10 rounded-full" />
             </div>
             <div onClick={() => { window.location.href = "/profil"; }} className="cursor-pointer">
                <div className="font-medium dark:text-black">
                    <div className="font-semibold">{user.displayName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">USER</div>
                </div>
              </div>
            <button onClick={handleLogoutClick} className="bg-red-600 text-white px-4 py-2 rounded text-[22px] font-medium">
              {isConfirmingLogout ? 'Yakin?' : 'Keluar'}
            </button>
          </div>
        )}
        {!user && (
          <a href="/auth/login">
            <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded text-[22px] font-medium">
              Masuk
            </button>
          </a>
        )}
        <div className="md:hidden">
          <button
            id="menu-button"
            className="text-black focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
       {/**  <a href="/auth/login">
          <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded text-[22px] font-medium">Masuk</button></a>
            <div className="md:hidden">
              <button
                id="menu-button"
                className="text-black focus:outline-none"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
          </button>
        </div>*/}
      </div>
      {isMenuOpen && (
        <div
          id="menu"
          className="md:hidden flex flex-col items-start space-y-2 bg-white text-black p-4 absolute right-0 top-16 rounded shadow-lg w-full"
        >
          <a href="/" className={`block px-4 py-2 text-[22px] ${currentPath === '/' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}>Beranda</a>
          <a href="/promo" className={`block px-4 py-2 text-[22px] ${currentPath === '/promo' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}>Promo</a>
          <a href="/event" className={`block px-4 py-2 text-[22px] ${currentPath === '/event' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}>Event</a>
          <a href="/profil" className={`block px-4 py-2 text-[22px] ${currentPath === '/profil' ? 'bg-blue-600 text-white rounded' : 'hover:bg-blue-600 hover:text-white hover:rounded'}`}>Profil</a>
          <a href="/auth/login"> <button className="bg-blue-600 text-white px-4 py-2 rounded w-full text-left text-[22px]">Masuk</button></a>
        </div>
      )}
    </header>
  );
};

export default Header;




