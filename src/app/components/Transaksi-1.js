'use client';

import { useEffect, useState } from 'react';
import { rtdb } from '../config/firebase'; // Sesuaikan dengan path ke file konfigurasi Firebase Anda
import { ref, push, get, set, update } from 'firebase/database';

export default function Transaksi() {
  const [detail, setDetail] = useState(null);
  const [step, setStep] = useState(1);
  const [tanggal, setTanggal] = useState('');
  const [jumlahTiket, setJumlahTiket] = useState(1);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nomorTelpon, setNomorTelpon] = useState('');
  const [virtualAccount, setVirtualAccount] = useState('');
  const [statusPembayaran, setStatusPembayaran] = useState('');

  useEffect(() => {
    const currentUrl = window.location.href;
    const idFromUrl = currentUrl.split('/detail/')[1].split('/')[0];

    const fetchPlaceDetail = async (placeId) => {
      try {
        const placeRef = ref(rtdb, `tempat_wisata_r/${placeId}`);
        const snapshot = await get(placeRef);
        if (snapshot.exists()) {
          setDetail(snapshot.val());
        } else {
          console.log('No such place!');
        }
      } catch (error) {
        console.error('Error fetching place:', error);
      }
    };

    fetchPlaceDetail(idFromUrl);
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleProsesTransaksi = () => {
    // Generate virtual account number based on phone number
    const virtualAccount = `VA-${nomorTelpon}`;
    setVirtualAccount(virtualAccount);

    const newTransactionRef = push(ref(rtdb, 'transaksi'), {
      id: detail.id,
      productName: detail.namaTempat,
      price: detail.harga,
      tanggal,
      jumlahTiket,
      nama,
      email,
      nomorTelpon,
      virtualAccount,
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1x24 hours
    });

    alert('Data transaksi berhasil disimpan!');
    console.log('Transaction ID:', newTransactionRef.key);
    setStep(step + 1);
  };

  useEffect(() => {
    if (virtualAccount) {
      // Listen for payment status updates
      const paymentRef = ref(rtdb, `transaksi/${virtualAccount}`);
      const unsubscribe = onValue(paymentRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setStatusPembayaran(data.status);
          if (data.status === 'berhasil') {
            alert('Pembayaran Berhasil!');
            // Redirect to profile detail page
            window.location.href = `/profil/${data.id}`;
          } else if (data.status === 'gagal') {
            alert('Pembayaran Gagal!');
          }
        }
      });

      return () => unsubscribe();
    }
  }, [virtualAccount]);

  if (!detail) return <div>Loading...</div>;

  return (
    <div>
      <h1>Detail Transaksi</h1>
      {step === 1 && (
        <div>
          <label>
            Pilih Tanggal:
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </label>
          <label>
            Jumlah Tiket:
            <input
              type="number"
              min="1"
              value={jumlahTiket}
              onChange={(e) => setJumlahTiket(e.target.value)}
              required
            />
          </label>
          <button onClick={handleNextStep}>Lanjut</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <label>
            Nama:
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Nomor Telpon:
            <input
              type="tel"
              value={nomorTelpon}
              onChange={(e) => setNomorTelpon(e.target.value)}
              required
            />
          </label>
          <button onClick={handlePrevStep}>Kembali</button>
          <button onClick={handleNextStep}>Lanjut</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Konfirmasi Pesanan</h2>
          <p>Nama Tempat Wisata: {detail.name}</p>
          <p>Harga: {detail.price}</p>
          <p>Tanggal: {tanggal}</p>
          <p>Jumlah Tiket: {jumlahTiket}</p>
          <p>Nama: {nama}</p>
          <p>Email: {email}</p>
          <p>Nomor Telpon: {nomorTelpon}</p>
          <button onClick={handlePrevStep}>Kembali</button>
          <button onClick={handleProsesTransaksi}>Proses Pembayaran</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Pembayaran</h2>
          <p>Silakan transfer ke virtual account berikut:</p>
          <p>Virtual Account: {virtualAccount}</p>
          <p>Total Harga: {detail.harga * jumlahTiket}</p>
          <p>Batas Waktu Pembayaran: 1x24 jam</p>
          {statusPembayaran === 'pending' && <p>Status: Menunggu Pembayaran</p>}
          {statusPembayaran === 'berhasil' && <p>Status: Pembayaran Berhasil</p>}
          {statusPembayaran === 'gagal' && <p>Status: Pembayaran Gagal</p>}
        </div>
      )}
    </div>
  );
}
