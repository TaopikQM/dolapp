// app/admin/page.js
"use client"; // Tambahkan baris ini

import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import SearchAw from "../components/SearchAw";

import ContainerAw from "../components/containerAw";

import Footer from "../components/Footer";

import Profile from "../components/Profile";

import MenuProfil from "../components/MenuProfil";

import { auth } from "../config/firebase";

const PrifilePage = () => {

    const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Stored user data:", storedUser); // Log untuk memastikan data diambil
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogoutClick = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user'); // Hapus data pengguna dari localStorage
      window.location.href = "/"; // Redirect to the home page after logout
    });
  };
  
  const isConfirmingLogout = false; // Ubah sesuai dengan logika Anda

  return (
      
    <div>
      <Header />
      <SearchAw />
      <ContainerAw>
          <h1 className="text-2xl font-bold mb-4">Halaman Profil</h1>
          <main className="flex flex-wrap">
            <div className="w-full md:w-1/3 p-8">
               <MenuProfil user={user} handleLogoutClick={handleLogoutClick} isConfirmingLogout={isConfirmingLogout} />
          
            </div>
            <div className="w-full md:w-2/3 p-8">
              <Profile user={user} handleLogoutClick={handleLogoutClick} isConfirmingLogout={isConfirmingLogout} />
          
            </div>
          </main>
        


      </ContainerAw>
      <Footer/>
      
      
    </div>
  );
};

export default PrifilePage;
