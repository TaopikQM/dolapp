
"use client";

import React, { useState } from 'react';

import Header from '../components/Header';

import SearchAw from '../components/SearchAw';

import ContainerAw from '../components/containerAw';

import Footer from '../components/Footer';

import CategoryDetailPage from '../components/CategoryDetailPage';


import AddWisataForm from '../components/AddWisataForm';

import WisataTable from '../components/WisataTable';


const addwisata = () => {

    const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  // Your component logic here
  return (
    
     <div>
     <Header />
     
        <ContainerAw>
            <h1>Add Wisata</h1>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleForm}>Add Wisata</button>
            </div>
            {showForm && <AddWisataForm />}
            <WisataTable />
        
        </ContainerAw>
     <Footer />
   </div>
  );
};

export default addwisata;
