"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { rtdb } from '../config/firebase'; // Sesuaikan path jika berbeda
import Link from 'next/link';

const Page = () => {
    const [placeDetail, setPlaceDetail] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const orderId = searchParams.get('order_id');
        const status = searchParams.get('transaction_status');
        setTransactionStatus(status);

        const placeId = orderId.split('dol')[0]; // Sesuaikan dengan format order_id Anda

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
        <div className='flex flex-col justify-center items-center min-h-screen gap-4'>
            {transactionStatus === 'pending' && (
                <>
                    <h3 className='text-center'>Pesanan Anda sedang diproses. Detail pesanan tiket:</h3>
                    {placeDetail && (
                        <div className='text-center'>
                            <p>ID Tiket: {placeDetail.id}</p>
                            <p>Nama Tempat: {placeDetail.name}</p>
                        </div>
                    )}
                    <Link href="http://localhost:3000/"><a className="text-center">Kembali</a></Link>
                </>
            )}
            {transactionStatus === 'settlement' && (
                <>
                    <h3 className='text-center'>Terimakasih, transaksi Anda telah berhasil. Detail pesanan tiket:</h3>
                    {placeDetail && (
                        <div className='text-center'>
                            <p>ID Tiket: {placeDetail.id}</p>
                            <p>Nama Tempat: {placeDetail.name}</p>
                        </div>
                    )}
                    <Link href="http://localhost:3000/"><a className="text-center">Kembali</a></Link>
                </>
            )}
            {transactionStatus !== 'pending' && transactionStatus !== 'settlement' && (
                <h3 className='text-center'>Status transaksi tidak diketahui.</h3>
            )}
        </div>
    );
};

export default Page;

export default Page;


