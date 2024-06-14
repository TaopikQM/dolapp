"use client";


import React from "react";
import Header from "../../../components/Header";

import SearchAw from "../../../components/SearchAw";

import ContainerAw from "../../../components/containerAw";

import DetailWis from "../../../components/DetailWis";

import DetailWis1 from "../../../components/DetailWis1";


import Footer from "../../../components/Footer";

import Transaksi1 from "../../../components/Transaksi-1";



export default function Transaksi(){
 
  return (
    <div>
      <Header />
      <SearchAw />
      <ContainerAw>
        <main className="flex flex-wrap">
        
          <h1>INi TRANSAKSI</h1>
            <div className="container mx-auto">
                <Transaksi1 />
            </div>
         
        </main>
        
        


      </ContainerAw>


      <Footer/>
    </div>
  );
}