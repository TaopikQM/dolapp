// src/app/page.js
"use client"; // Tambahkan baris ini

import React from "react";
import Header from "./components/Header";
import SearchAw from "./components/SearchAw";
import ContainerAw from "./components/containerAw";
import Box from "./components/Box";
import TopCon from "./components/TopCon";
import EventCalender from "./components/EventCalender";
import Event from "./components/Event";
import PaketWis from "./components/PaketWis";
import TestimonialCarousel from "./components/TestimonialCarousel";
import Footer from "./components/Footer";


import RekomReal from "./components/RekomReal";
import WisataBaru from "./components/WisataBaru";





export default function Home() {
  const events = [
    { id: 1, title: 'Meeting', date: '2024-05-10' },
    { id: 2, title: 'Conference', date: '2024-05-15' },
    { id: 3, title: 'Vacation', date: '2024-05-20' },
  ];

  

  return (
    
    
      
    
    <div>
      
      <Header />
      <SearchAw />
      <ContainerAw>
        <Box/>
        
       {/**<RekomWis/> */} 
        <RekomReal/>
        
        <WisataBaru/>
        <EventCalender events={events}/>
        <Event/>
        {/**<TempatBa/>
        <TopCon/>
        <EventCalender events={events} />
        <Event/>
        <PaketWis />*/} 
        <TestimonialCarousel />
        
      </ContainerAw>
      <Footer/>
    
     {/*<div className="container mx-auto p-4">
      
        <h1 className="text-2xl font-bold mb-4">Wisata</h1>
        
        <AddPlaceForm />
        <PlaceTable />

  </div>*/}
    </div>
   
  );
}
