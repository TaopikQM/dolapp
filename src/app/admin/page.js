// app/admin/page.js
"use client"; // Tambahkan baris ini

import React from "react";
import AddPlaceForm from "../components/AddPlaceForm";


import PlaceTable from "../components/PlaceTable";

import Header from "../components/Header";

import SearchAw from "../components/SearchAw";

import ContainerAw from "../components/containerAw";

import Footer from "../components/Footer";
import AddWisataForm from "../components/AddWisataForm";
import WisataTable from "../components/WisataTable";
import { BrowserRouter } from 'react-router-dom';

import AddUlasan from "../components/AddUlasan";

import UlasanTable from "../components/UlasanTable";

import AddMenuCategory from "../components/AddMenuCategory";
import UserTable from "../components/UserTable";

import adminMenu from "../components/adminMenu";



const AdminPage = ({pageProps}) => {

  
  return (
      
    <div>
      
      <ContainerAw>

      <h1 className="text-2xl font-bold mb-4">Halaman Admin</h1>
       
      <main className="flex flex-wrap">
         <div className="w-full md:w-0/3 p-8">
           {/**<adminMenu />*/}
         </div>
         <div className="w-full md:w-3/3 p-8">
         <br />

          <br />
          <h1  className="text-2xl font-bold mb-4">ini data authetifikasi realtime database</h1>


          <br />
          <br />
          <h1  className="text-2xl font-bold mb-4">ini input category wisata realtime database</h1>

          <AddMenuCategory/>
          <br />
          <br />

          <h1  className="text-2xl font-bold mb-4">ini input wisata firestore database</h1>

          <AddPlaceForm />
          <PlaceTable />
          <br />
          <br />
          <h1  className="text-2xl font-bold mb-4">ini input wisata realtime database</h1>
          <AddWisataForm />
          <WisataTable  />
          <br />
          <br />
          <h1  className="text-2xl font-bold mb-4">ini input ulasan realtime database</h1>

          <AddUlasan />
          <UlasanTable />
                  </div>
                </main>
                
                  


      </ContainerAw>
      
      
    </div>
  );
};

export default AdminPage;
