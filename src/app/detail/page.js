"use client";


import React from "react";
import Header from "../components/Header";

import SearchAw from "../components/SearchAw";

import ContainerAw from "../components/containerAw";

import DetailWis from "../components/DetailWis";

import DetailWis1 from "../components/DetailWis1";


import Footer from "../components/Footer";


import useProtectedRoute from "../hooks/useProtectedRoute";
import useAuth from "../hooks/useAuth";



export default function Detail(){
  const loading = useProtectedRoute();
  useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Header />
      <SearchAw />
      <ContainerAw>
        <main className="flex flex-wrap">
        
          <div className="w-full md:w-2/3 p-8">
            <DetailWis />
          </div>
          <div className="w-full md:w-1/3 p-8">
            <DetailWis1 />
          </div>

        </main>
        
        


      </ContainerAw>


      <Footer/>
    </div>
  );
}