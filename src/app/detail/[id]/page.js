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

import useProtectedRoute from "../../hooks/useProtectedRoute";
import useAuth from "../../hooks/useAuth";

import Thanks from '../../components/Thanks'; // Import komponen Thanks
import Unfinish from '../../components/Unfinish'; // Import komponen Unfinish
import ErrorPayment from '../../components/ErrorPayment'; // Import komponen ErrorPayment




function DetailWisata() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [docData, setDocData] = useState(null);

  const [placeId, setPlaceId] = useState('');
  const [showThanks, setShowThanks] = useState(false); // State untuk mengontrol tampilan Thanks
  const [showUnfinish, setShowUnfinish] = useState(false); // State untuk mengontrol tampilan Unfinish
  const [showErrorPayment, setShowErrorPayment] = useState(false); // State untuk mengontrol tampilan ErrorPayment


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1];
      setPlaceId(id);
    }
  }, []);

  const loading = useProtectedRoute();
  useAuth();

   // Fungsi untuk menutup tampilan Thanks
   const handleCloseThanks = () => {
    setShowThanks(false);
  };

  // Fungsi untuk menampilkan Thanks setelah transaksi sukses
  const handleTransactionSuccess = () => {
    setShowThanks(true);
  };

  // Fungsi untuk menutup tampilan Unfinish
  const handleCloseUnfinish = () => {
    setShowUnfinish(false);
  };

  // Fungsi untuk menampilkan Unfinish jika transaksi tertunda
  const handleTransactionUnfinish = () => {
    setShowUnfinish(true);
  };

   // Fungsi untuk menutup tampilan ErrorPayment
   const handleCloseErrorPayment = () => {
    setShowErrorPayment(false);
  };

  // Fungsi untuk menampilkan ErrorPayment jika transaksi gagal
  const handleTransactionError = () => {
    setShowErrorPayment(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
   
    <div>
      <Header />
      <SearchAw />
      
      <ContainerAw>
      {showThanks && <Thanks onClose={handleCloseThanks} />} {/* Render komponen Thanks */}
        {showUnfinish && <Unfinish onClose={handleCloseUnfinish} />} {/* Render komponen Unfinish */}
        {showErrorPayment && <ErrorPayment onClose={handleCloseErrorPayment} />} {/* Render komponen ErrorPayment */}
      
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
