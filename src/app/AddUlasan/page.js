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



const AddUlasan = ({pageProps}) => {

  
  return (
      
    <div>
      <Header />
      <SearchAw />
      <ContainerAw>
        
        <h1  className="text-2xl font-bold mb-4">ini input ulasan realtime database</h1>
       
        <AddUlasan />
        


      </ContainerAw>
      <Footer/>
      
      
    </div>
  );
};

export default AddUlasan;
