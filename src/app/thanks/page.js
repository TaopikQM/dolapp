"use client";
import React, { useEffect, useState } from 'react';
import { ref, get, update } from 'firebase/database';
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

        const updateTransactionStatus = async (orderId, status) => {
            try {
                const transactionRef = ref(rtdb, `transactions/${orderId}`);
                await update(transactionRef, { transaction_status: status });
                console.log('Transaction status updated:', status);
            } catch (error) {
                console.error('Error updating transaction status:', error);
            }
        };

        if (orderId && status) {
            updateTransactionStatus(orderId, status);
        }

        fetchPlaceDetail(placeId);
    }, []);

    return (
        <div className="bg-white flex justify-center items-center min-h-screen">
    <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
            <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
            {transactionStatus === 'pending' && (
                <>
                    <h3 className='text-center'>Pesanan Anda sedang diproses. Detail pesanan tiket:</h3>
                    {placeDetail && (
                        <div className='text-center'>
                            <p>ID Tiket: {placeDetail.id}</p>
                            <p>Nama Tempat: {placeDetail.name}</p>
                        </div>
                    )}
                    <Link href="/">
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Kembali</button>
                    </Link>
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
                    <Link href="/">
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Kembali</button>
                    </Link>
                </>
            )}
            {transactionStatus !== 'pending' && transactionStatus !== 'settlement' && (
                <>
                    <h3 className="text-lg font-bold text-center">Pesanan tiket Anda gagal. Transaksi kadaluwarsa.</h3>
                    {placeDetail && (
                        <div className='text-center'>
                            <p>ID Tiket: {placeDetail.id}</p>
                            <p>Nama Tempat: {placeDetail.name}</p>
                        </div>
                    )}
                    <Link href="/">
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Kembali</button>
                    </Link>
                </>
            )}
        </div>
    </div>
</div>

    );
};

export default Page;


