"use client";


import React, { useEffect } from "react";
import Header from "../../../components/Header";

import SearchAw from "../../../components/SearchAw";

import ContainerAw from "../../../components/containerAw";

import DetailWis from "../../../components/DetailWis";

import DetailWis1 from "../../../components/DetailWis1";


import Footer from "../../../components/Footer";

import Transaksi1 from "../../../components/Transaksi-1";

import TransaksiForm from "../../../components/TransaksiForm";


export default function Transaksi(){
  useEffect(()=>{
    const snapScript ="https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  },[])
 
  return (
    <div>
      <Header />
      <SearchAw />
      <ContainerAw>
      <main className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Lengkapi Data
        </h1>
        <div className="container mx-auto bg-white rounded-lg  max-w-lg">
          <TransaksiForm />
        </div>
      </main>
      </ContainerAw>


      <Footer/>
    </div>
  );
}