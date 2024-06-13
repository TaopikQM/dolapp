// category/[title]/page.js
"use client";

import React from 'react';

import Header from '../../components/Header';

import SearchAw from '../../components/SearchAw';

import ContainerAw from '../../components/containerAw';

import Footer from '../../components/Footer';

import CategoryDetailPage from '../../components/CategoryDetailPage';




const CategoryPage = () => {
  // Your component logic here
  return (
    
     <div>
     <Header />
     <SearchAw />
     
     <ContainerAw>
     
       <main className="flex flex-wrap">
         <div className="w-full md:w-3/3 p-8">
           <CategoryDetailPage/>
         </div>
         <div className="w-full md:w-0/3 p-8">
           
         </div>
       </main>
     </ContainerAw>
     <Footer />
   </div>
  );
};

export default CategoryPage;
