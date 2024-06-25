// app/admin/page.js
"use client"; // Tambahkan baris ini

import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import SearchAw from "../components/SearchAw";

import ContainerAw from "../components/containerAw";

import Footer from "../components/Footer";

import SearchResults from "../components/search";


const SearchPage = () => {

  return (
      
    <div>
      <Header />
      <SearchAw />
        <ContainerAw>
          
          <SearchResults />
        </ContainerAw>

      <Footer/>
      
      
    </div>
  );
};

export default SearchPage;
