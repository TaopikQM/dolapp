import Link from 'next/link';
import { useState, useEffect } from 'react';

function Navbar() {
  const [pathname, setPathname] = useState('');

  // Fungsi untuk mengupdate pathname saat lokasi berubah
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/">
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/dolanrek-f88ad.appspot.com/o/logo-awal%2FLogo.png?alt=media&token=f0ea354a-5ab3-480e-8af8-c703495d5433" alt="EnvironmentSafeguard" width="80" height="auto" className="inline-block align-top" />
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <div className={pathname === "/" || pathname === "/artikel" || pathname === "/artikeldetail" || pathname === "/komunitas" ? "text-black font-medium" : "text-gray-500"}>Home</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className={pathname === "/about" ? "text-black font-medium" : "text-gray-500"}>About</div>
                </Link>
              </li>
              <li className="relative">
                <button className="flex items-center text-black font-medium">
                  Donation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <ul className="absolute left-0 w-40 mt-2 bg-white shadow-lg rounded-md py-2 hidden">
                  <li>
                    <Link href="/ListAksi">
                      <div className={pathname === "/ListAksi" || pathname === "/aksidetail1" || pathname === "/aksidetail2" ? "text-black font-medium" : "text-gray-500"}>Aksi</div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Donasi">
                      <div className={pathname === "/Donasi" || pathname === "/Membership" || pathname === "/Satukali" || pathname === "/MetodePembayaran" ? "text-black font-medium" : "text-gray-500"}>Donation</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/Market">
                  <div className={pathname === "/Market" || pathname === "/DetailMarket" ? "text-black font-medium" : "text-gray-500"}>Shop</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            {/* Tampilkan tombol menu responsif di sini */}
          </div>
          <div className="ml-auto hidden md:block">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder="Search" className="pl-2 pr-8 py-1 border border-gray-300 rounded-md" />
              </div>
              <Link href="/signin">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
