"use client"
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../config/firebase';
import Link from 'next/link';

import DetailWis from "../../components/DetailWis";
import DetailWis1 from "../../components/DetailWis1";
import Header from '../../components/Header';
import SearchAw from '../../components/SearchAw';
import ContainerAw from '../../components/containerAw';
import Footer from '../../components/Footer';

function DetailWisata() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [docData, setDocData] = useState(null);

  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1];
      setPlaceId(id);
    }
  }, []);

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
      <Footer />
    </div>
  );
}

export default DetailWisata;
