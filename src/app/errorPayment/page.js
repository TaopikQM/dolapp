"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { rtdb } from '../config/firebase'; // Sesuaikan path jika berbeda
import Link from 'next/link';

const ErrorPayment = () => {
    const [placeDetail, setPlaceDetail] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const orderId = searchParams.get('order_id');
        const placeId = orderId.split('.')[0];

        const fetchPlaceDetail = async (placeId) => {
            try {
                const placeRef = ref(rtdb, `tempat_wisata_r/${placeId}`);
                const snapshot = await get(placeRef);
                if (snapshot.exists()) {
                    setPlaceDetail(snapshot.val());
                } else {
                    console.log('No such place!');
                }
            } catch (error) {
                console.error('Error fetching place:', error);
            }
        };

        fetchPlaceDetail(placeId);
    }, []);

    return (
        <div className="bg-white flex justify-center items-center min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
                    <h3 className="text-lg font-bold text-center">Pesanan tiket Anda gagal. Transaksi kadaluwarsa.</h3>
                    {placeDetail && (
                        <div className="mt-4">
                            <p>ID Tiket: orderId</p>
                            <p>Nama Tempat: {placeDetail.name}</p>
                        </div>
                    )}
                    <Link href="/" className="underline text-blue-500 mt-4 block text-center">Kembali</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPayment;
