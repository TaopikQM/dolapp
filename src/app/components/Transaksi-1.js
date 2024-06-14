{/**import React from 'react';

const Transaksi1 = () => {
  return (
    <div className="relative w-[949px] h-[982px] mx-auto">
      <div className="w-[949px] h-[982px] top-0 left-0">
        <div className="w-[741px] left-[103px] absolute h-[77px] top-0">
          <div className="h-[77px]">
            <div className="relative w-[747px] h-[77px]">
              <img className="left-[407px] absolute w-[137px] h-[3px] top-[22px]" alt="Line" src="/line.svg" />
              <div className="w-[747px] left-0 absolute h-[77px] top-0">
                <div className="flex flex-col w-[50px] h-[49px] items-center justify-center px-3 py-1.5 absolute top-0 left-[359px] bg-[#bcbcbd] rounded-[90px]">
                  <div className="relative w-fit text-white text-base font-normal">
                    2
                  </div>
                </div>
                <div className="left-[664px] bg-[#bcbcbd] flex flex-col w-[50px] h-[49px] items-center justify-center px-3 py-1.5 absolute top-0 rounded-[90px]">
                  <div className="relative w-fit text-white text-base font-normal">
                    3
                  </div>
                </div>
                <div className="left-[43px] bg-[#006cff] flex flex-col w-[50px] h-[49px] items-center justify-center px-3 py-1.5 absolute top-0 rounded-[90px]">
                  <div className="relative w-fit text-white text-base font-normal">
                    1
                  </div>
                </div>
                <div className="absolute top-[53px] left-0 font-normal text-black text-base">
                  Detail Pembelian
                </div>
                <div className="absolute top-[53px] left-[636px] font-normal text-black text-base">
                  Pembayaran
                </div>
                <div className="absolute top-[53px] left-[321px] font-normal text-black text-base">
                  Detail Pemesan
                </div>
              </div>
              <img className="left-[526px] absolute w-[137px] h-[3px] top-[22px]" alt="Line" src="/image.svg" />
              <img className="left-56 absolute w-[137px] h-[3px] top-[22px]" alt="Line" src="/line-2.svg" />
              <img className="left-[90px] absolute w-[137px] h-[3px] top-[22px]" alt="Line" src="/line-3.svg" />
            </div>
          </div>
        </div>
        <div className="absolute w-[949px] h-[856px] top-[126px] left-0 rounded-[20px] bg-[#f6f8ff] shadow-[0px_2px_4px_#00000040]">
          <div className="absolute w-[826px] h-[126px] top-[75px] left-[63px]">
            <div className="absolute top-0 left-0 font-semibold text-black text-xl">
              Pilih Tanggal
            </div>
            <div className="absolute w-[126px] h-[76px] top-[50px] left-0">
              <div className="relative w-[124px] h-[76px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[7px] left-[7px] text-[#b4b4b4] text-xl text-center">
                  Senin <br />6 Mei 2024
                </div>
              </div>
            </div>
            <div className="absolute w-[126px] h-[76px] top-[50px] left-[140px]">
              <div className="relative w-[124px] h-[76px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[7px] left-2 text-[#b4b4b4] text-xl text-center">
                  Selasa <br />7 Mei 2024
                </div>
              </div>
            </div>
            <div className="absolute w-[126px] h-[76px] top-[50px] left-[280px]">
              <div className="relative w-[124px] h-[76px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[7px] left-[7px] text-[#b4b4b4] text-xl text-center">
                  Rabu <br />8 Mei 2024
                </div>
              </div>
            </div>
            <div className="absolute w-[126px] h-[76px] top-[50px] left-[420px]">
              <div className="relative w-[124px] h-[76px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[7px] left-[7px] text-[#b4b4b4] text-xl text-center">
                  Kamis <br />9 Mei 2024
                </div>
              </div>
            </div>
            <div className="absolute w-[126px] h-[76px] top-[50px] left-[560px]">
              <div className="relative w-[124px] h-[76px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[7px] left-1 text-[#b4b4b4] text-xl text-center">
                  Jumat<br />10 Mei 2024
                </div>
              </div>
            </div>
            <div className="absolute w-[126px] h-[76px] top-[50px] left-[700px]">
              <div className="relative w-[124px] h-[76px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[7px] left-[7px] text-[#b4b4b4] text-xl text-center">
                  Sabtu<br />11 Mei 2024
                </div>
              </div>
            </div>
            <div className="absolute w-[125px] h-[19px] top-3 left-[701px]">
              <img className="absolute w-[19px] h-[19px] top-0 left-0" alt="Group" src="/group-1321317111.png" />
              <div className="absolute w-[102px] top-0 left-[21px] text-[#005edc] text-sm font-medium">
                Lihat Kalender
              </div>
            </div>
          </div>
          <div className="absolute w-[826px] h-[274px] top-[245px] left-[63px]">
            <div className="absolute top-0 left-0 font-semibold text-black text-xl">
              Kategori Tiket
            </div>
            <div className="absolute w-[828px] h-[103px] top-[49px] left-0">
              <div className="relative w-[824px] h-[103px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-9 left-8 text-[#b4b4b4] text-xl text-center">
                  Reguler
                </div>
                <div className="left-[706px] absolute top-9 text-[#b4b4b4] text-xl text-center">
                  Rp 5000
                </div>
              </div>
            </div>
            <div className="absolute w-[830px] h-[103px] top-[171px] left-0">
              <div className="relative w-[824px] h-[103px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[21px] left-8 text-[#b4b4b4] text-xl text-center">
                  VIP
                </div>
                <div className="absolute top-[51px] left-8 text-[#b4b4b4] text-sm text-center">
                  Bebas Parkir&nbsp;&nbsp;|&nbsp;&nbsp;Guide Book (Exclusive)
                </div>
                <div className="left-[700px] absolute top-9 text-[#b4b4b4] text-xl text-center">
                  Rp 15000
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[826px] h-[126px] top-[570px] left-[63px]">
            <div className="absolute top-0 left-0 font-semibold text-black text-xl">
              Jumlah Tiket
            </div>
            <div className="absolute w-[828px] h-[81px] top-[45px] left-0">
              <div className="relative w-[824px] h-[81px] bg-white rounded-[20px] border border-solid border-[#b3b3b3]">
                <div className="absolute top-[25px] left-7 text-black text-xl text-center">
                  Pax
                </div>
                <div className="absolute top-[25px] left-[742px] text-black text-xl text-center">
                  0
                </div>
                <img
                  className="absolute w-6 h-6 top-7 left-[707px]"
                  alt="Decrease circle"
                  src="/decrease-circle.svg"
                />
                <img
                  className="absolute w-6 h-6 top-7 left-[766px]"
                  alt="Increase circle"
                  src="/increase-circle.svg"
                />
              </div>
            </div>
          </div>
          <div className="absolute w-[156px] h-[53px] top-[753px] left-[733px]">
            <div className="relative w-[154px] h-[53px] bg-[#006cff] rounded-[25px] flex items-center justify-center">
              <div className="h-5 text-white text-[22px] font-bold">
                Lanjutkan
              </div>
            </div>
          </div>
          <div className="absolute w-[156px] h-[53px] top-[753px] left-[63px]">
            <div className="relative w-[154px] h-[53px] bg-[#bcbcbd] rounded-[25px] flex items-center justify-center">
              <div className="h-5 text-white text-[22px] font-bold">
                Kembali
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaksi1;*/}
//import React, { useState } from 'react';
import { useState, useEffect } from 'react';
import { ref,push, set, onValue  } from "firebase/database";
import { rtdb } from '../config/firebase';
import TransactionTimeline from './TransactionTimeline'; // Impor komponen TransactionTimeline

const Transaksi1 = () => {
  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [nama, setNama] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [email, setEmail] = useState('');
  const [metodePembayaran, setMetodePembayaran] = useState('');
  const [barcode, setBarcode] = useState('');
  const [waktuProses, setWaktuProses] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state isLoading
  const [isEmailValid, setIsEmailValid] = useState(true); // State tambahan untuk menandai validitas email

  const [nomorRekening, setNomorRekening] = useState('');
  const [jumlahTransfer, setJumlahTransfer] = useState('');
  const [totalBiaya, setTotalBiaya] = useState(0);

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1].split('/')[0];

      const placeRef = ref(rtdb, `tempat_wisata_r/${id}`);
      onValue(placeRef, (snapshot) => {
        const data = snapshot.val();
        //console.log('Data Tempat Wisata:', data);
        setPlace(data);
      }, {
        onlyOnce: true
      });
    }
  }, []);
  

  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString('id-ID', { weekday: 'long' });
    const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    dates.push({ day, dateStr });
  }

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const handleTicketChange = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleQuantityChange = (event) => {
    let newValue = parseInt(event.target.value, 10);
    // Limit maximum value to 10
    if (newValue > 10) {
      newValue = 10;
    }
    setQuantity(newValue);
  };

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleNomorTeleponChange = (event) => {
    const value = event.target.value; // Mengubah e.target.value menjadi event.target.value
    // Menggunakan RegExp untuk hanya membiarkan karakter angka
   const nomorTeleponFiltered = value.replace(/\D/g, '');
    setNomorTelepon(nomorTeleponFiltered);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmail(value);
    setIsEmailValid(isValidEmail || value === ''); // Set state isEmailValid berdasarkan validasi email
  };

  const handleMetodePembayaranChange = (event) => {
    setMetodePembayaran(event.target.value);
  };

  const handleProsesPembayaran = () => {
    // Simulate payment process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const generatedBarcode = '1234567890'; // Dummy barcode generation
      setBarcode(generatedBarcode);
      setWaktuProses(`Barcode berhasil di-generate pada ${new Date().toLocaleTimeString()}`);
    }, 2000); // Simulating 2 seconds delay for payment processing
  };

  const handleDataSubmission = async () => {
    setIsLoading(true); // Mulai proses upload
  
    try {
      const currentTime = new Date().toLocaleString();
  
      // Menggunakan push untuk membuat referensi baru ke node "transaksi"
      const newTransactionRef = push(ref(rtdb, 'transaksi'));
      const newTransactionKey = newTransactionRef.key;
  
      // Data transaksi yang akan disimpan
      const transactionData = {
        timestamp: currentTime,
        selectedDate,
        selectedTicket,
        quantity,
        nama,
        nomorTelepon,
        email,
        metodePembayaran,
        barcode: metodePembayaran === 'barcode' ? barcode : '',
        waktuProses: metodePembayaran === 'barcode' ? waktuProses : '',
        namaWisata: place?.nama, // Gunakan optional chaining untuk mengakses properti jika place belum terdefinisi
        idWisata: place?.id, // Gunakan optional chaining untuk mengakses properti jika place belum terdefinisi
        totalBiaya:calculateTotalBiaya(),
      };
  
      // Simpan data transaksi ke Firebase Realtime Database
      await set(newTransactionRef, transactionData);
  
      // Data berhasil disimpan, lakukan tindakan lanjutan di sini, misalnya menampilkan pesan sukses
      console.log("Data transaksi berhasil disimpan:", transactionData);
      
      // Kosongkan data inputan
      setSelectedDate(null);
      setSelectedTicket('');
      setQuantity(0);
      setNama('');
      setNomorTelepon('');
      setEmail('');
      setMetodePembayaran('');
      setBarcode('');
      setWaktuProses('');
      setTotalBiaya(0);
  
      // Kembali ke langkah pertama
      setValue(0);
  
      // Setelah proses selesai, berhenti menampilkan loading spinner
      setIsLoading(false);
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error("Error saving transaction data:", error);
      // Berhenti menampilkan loading spinner karena ada kesalahan
      setIsLoading(false);
    }
  };
  
   // Fungsi untuk menghitung total biaya berdasarkan tiket dan jumlah yang dipilih
  const calculateTotalBiaya = () => {
    if (!place) return 0; // Jika tempat wisata belum terpilih, kembalikan 0

    // Ambil harga tiket dari properti price
    const hargaTiket = place?.price;

    let total = quantity * hargaTiket;
    return total;
  };


  // Function to check if Step 2 form is valid
  const isStep2Valid = () => {
    return nama !== '' && nomorTelepon !== '' && isEmailValid; // Periksa isEmailValid juga di sini
   };

  // Handle next step button click
  const handleNextStep = () => {
    if (value === 1 && !isStep2Valid()) {
      alert('Silakan lengkapi form Detail Pemesan sebelum melanjutkan.');
      return;
    }
    setValue(value + 1);
  };

  const steps = ['Pilih Tanggal', 'Detail Pemesan', 'Pembayaran'];
  
   // Function to render selected data for tourism
   const renderSelectedData = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Detail Transaksi</h2>
          <p>Nama Wisata: {place?.name} {/**  ({place?.id})*/}</p>
          <p>Tanggal Dipilih: {selectedDate}</p> {/* Menampilkan tanggal yang dipilih */}
          <p>Nama: {nama}</p>
          <p>Nomor Telepon: {nomorTelepon}</p>
          <p>Email: {email}</p>
          <p>Metode Pembayaran: {metodePembayaran}</p>
          {metodePembayaran === 'barcode' && (
            <>
              <p>Barcode: {barcode}</p>
              <p>{waktuProses}</p>
            </>
          )}
          {metodePembayaran === 'bank_transfer' && (
            <>
              <p>Nomor Rekening: {nomorRekening}</p>
              <p>Jumlah Transfer: {jumlahTransfer}</p>
            </>
          )}
          <p>Total Biaya: {totalBiaya}</p> {/* Menampilkan total biaya transaksi */}
        </div>
      </div>
    );
  };
  
  
  return (
    <div className="container ">
       <TransactionTimeline steps={steps} currentStep={value} /> {/* Tambahkan komponen Timeline di sini */}

     
      
       <div className="mt-8">
        {/* Step 1: Choose Date */}
        {value === 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Pilih Tanggal</h2>
              <div className="grid grid-cols-7 gap-4">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    className={`btn ${selectedDate === date.dateStr ? 'btn-active' : 'btn-inactive'}`}
                    onClick={() => handleDateChange(date.dateStr)}
                    style={{
                      backgroundColor: selectedDate === date.dateStr ? '#3182CE' : 'white',
                      color: selectedDate === date.dateStr ? 'white' : 'black',
                      border: '1px solid #E5E7EB',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#3182CE';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = selectedDate === date.dateStr ? '#3182CE' : 'white';
                      e.target.style.color = selectedDate === date.dateStr ? 'white' : 'black';
                    }}
                  >
                    {date.day} <br /> {date.dateStr}
                  </button>
                ))}
            </div>
            <br/>
            <div className="mb-4">
              <label htmlFor="quantityInput">Jumlah Tiket:</label>
              <input
                id="quantityInput"
                type="number"
                min="1"
                max="10" // Set maximum number of tickets
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded-md px-4 py-2"
              />
            </div>
           
          </div>
        )}

         {/* Step 2: Customer Details */}
        {value === 1 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
            <div className="mt-4">
              <label className="block font-bold mb-2" htmlFor="nama">
                Name
              </label>
              <input
                type="text"
                id="nama"
                className="block w-full p-2 border border-gray-300 rounded"
                value={nama}
                onChange={handleNamaChange}
              />
            </div>
            <div className="mt-4">
              <label className="block font-bold mb-2" htmlFor="nomorTelepon">
                Phone Number
              </label>
              <input
                type="text"
                id="nomorTelepon"
                className="block w-full p-2 border border-gray-300 rounded"
                value={nomorTelepon}
                onChange={handleNomorTeleponChange}
              />
            </div>
            <div className="mt-4">
              <label className="block font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`block w-full p-2 border border-gray-300 rounded ${isEmailValid ? '' : 'border-red-500'}`}
                value={email}
                onChange={handleEmailChange}
              />
              {!isEmailValid && (
                <p className="text-red-500 mt-1">Please enter a valid email address.</p>
              )}
            </div>
           {/**  <div className="mt-8">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded mr-4 hover:bg-gray-600"
                onClick={() => setValue(value - 1)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>*/}
          </div>
        )}

        {/* Step 3: Payment */}
        {/* Step 3: Payment */}
{value === 2 && (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Payment</h2>

    {/* Display Selected Data */}
    <div className="mt-4">
      <h3 className="font-bold mb-2">Selected Date:</h3>
      <p>{selectedDate}</p>
    </div>
    <div className="mt-4">
      <h3 className="font-bold mb-2">Ticket Type:</h3>
      <p>{selectedTicket}</p>
    </div>
    <div className="mt-4">
      <h3 className="font-bold mb-2">Quantity:</h3>
      <p>{quantity}</p>
    </div>
    <div className="mt-4">
      <h3 className="font-bold mb-2">Total Price:</h3>
      <p>{calculateTotalBiaya()} IDR</p>
    </div>

    <div className="mt-8">
      <label className="block font-bold mb-2" htmlFor="metodePembayaran">
        Payment Method
      </label>
      <select
        id="metodePembayaran"
        className="block w-full p-2 border border-gray-300 rounded"
        value={metodePembayaran}
        onChange={handleMetodePembayaranChange}
      >
        <option value="">Select Payment Method</option>
        <option value="barcode">Barcode</option>
        <option value="bank_transfer">Bank Transfer</option>
      </select>
    </div>

    {metodePembayaran === 'barcode' && (
      <div className="mt-4">
        {/* Tampilkan Barcode di sini */}
        <p>Barcode: {barcodeId}</p>
        <p>Konfirmasi pembayaran dalam 24 jam.</p>
      </div>
    )}

    {metodePembayaran === 'bank_transfer' && (
      <div className="mt-4">
        <p>Bank Transfer Information:</p>
        <p>ID Transfer: {bankTransferId}</p>
        <p>Proses pembayaran berdasarkan informasi yang diberikan.</p>
      </div>
    )}

    <div className="mt-8">
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded mr-4 hover:bg-gray-600"
        onClick={() => setValue(value - 1)}
      >
        Back
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          if (metodePembayaran === 'barcode') {
            handleProsesPembayaran();
          } else {
            handleDataSubmission();
          }
        }}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
    </div>
  </div>
)}


        {/* Display Selected Data */}
        {value === 3 && (
          <div className="mb-8">
            {renderSelectedData()}
            <div className="mt-8">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setValue(0)} // Reset to Step 1
              >
                New Transaction
              </button>
            </div>
          </div>
        )}
         <div className="flex justify-end">
          {value > 0 && (
            <button className="btn btn-secondary mr-4" onClick={() => setValue(value - 1)}>
              Kembali
            </button>
          )}
          {value < 2 && (
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Lanjut
                </button>
              )}
          
        </div>
      </div>
    </div>
  );
};


export default Transaksi1;
