import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Popup from './Popup';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; // Import plugin for isSameOrAfter
dayjs.extend(isSameOrAfter); // Extend dayjs with isSameOrAfter plugin


const TransactionAktif = () => {
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const auth = getAuth();
  const [selectedId, setSelectedId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTdClick = (id) => {
    const selectedTransaction = filteredData.find(data => data.id === id);
    setSelectedId(selectedTransaction);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchTransactions = () => {
      const transactionsRef = ref(rtdb, 'transactions');
      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const transactionsArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          setTransactions(transactionsArray);
          //console.log('All Transactions Data:', transactionsArray); // Log semua data transaksi
        }
      });
    };

    const fetchNotifications = () => {
      const notificationsRef = ref(rtdb, 'notifications');
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const notificationsArray = Object.entries(data).map(([order_id, value]) => ({ order_id, ...value }));
          setNotifications(notificationsArray);
         // console.log('All Notifications Data:', notificationsArray); // Log semua data notifikasi
        }
      });
    };

    fetchTransactions();
    fetchNotifications();
  }, []);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const today = dayjs().format('YYYY-MM-DD');
  
        const filteredTransactions = transactions.filter((transaction) => {
          return (
            transaction.receivedData &&
            transaction.receivedData.userEmail === userEmail &&
            dayjs(transaction.receivedData.visitDate).isSameOrAfter(today, 'day')
          );
        });
  
        console.log('Filtered Transactions Data:', filteredTransactions);
  
        const mergedData = filteredTransactions.map((transaction) => {
          const matchingNotifications = notifications.filter(
            (notification) => notification.order_id === transaction.id
          );
  
          if (matchingNotifications.length > 0) {
            return {
              ...transaction,
              notifications: matchingNotifications
            };
          } else {
            return transaction;
          }
        });
  
        console.log('Merged Data:', mergedData);
        setFilteredData(mergedData);
      }
    });
  
    return () => unsubscribe();
  }, [transactions, notifications, auth]);
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500 text-white'; // Warna orange untuk Pending
      case 'settlement':
        return 'bg-green-500 text-white'; // Warna hijau untuk Settlement
      case 'expired':
        return 'bg-red-500 text-white'; // Warna merah untuk Kadaluwarsa
      default:
        return 'bg-gray-300 text-gray-700'; // Default warna abu-abu
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Nomor VA berhasil disalin: ' + text);
    }).catch((err) => {
      //console.error('Gagal menyalin teks: ', err);
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      <div className="bg-blue-500 text-white py-4 text-center rounded-lg">
          <h1 className="text-3xl font-bold">Transaksi Aktif</h1>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Nama Tempat</th>
            {/*<th className="py-2 px-4 border-b">Harga</th>
            <th className="py-2 px-4 border-b">Jumlah</th>*/}
            <th className="py-2 px-4 border-b">Tanggal Kunjungan</th>
            {/*<th className="py-2 px-4 border-b">Gross Amount</th>*/}
            <th className="py-2 px-4 border-b">VA Number</th>
            <th className="py-2 px-4 border-b">Bank</th>
            <th className="py-2 px-4 border-b">Status</th> {/* Kolom untuk Status */}
          
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? filteredData.map((data) => (
            <tr key={data.id}>
              {/*<td className="py-2 px-4 border-b">{data.id}</td>*/}
              <td className="py-2 px-4 border-b cursor-pointer text-blue-500 underline" onClick={() => handleTdClick(data.id)}>
                {data.id.length > 10 ? `${data.id.slice(0, 10)}...` : data.id}
              </td>

              <td className="py-2 px-4 border-b">{data.receivedData.placeName}</td>
              {/*<td className="py-2 px-4 border-b">{data.receivedData.price}</td>
              <td className="py-2 px-4 border-b">{data.receivedData.quantity}</td>*/}
              <td className="py-2 px-4 border-b">{data.receivedData.visitDate}</td>
              {/*<td className="py-2 px-4 border-b">{data.transactionDetails.gross_amount || '0'}</td>*/}
              
              <td className="py-2 px-4 border-b">
                {(data.notifications && data.notifications.map(notification => (
                  <span
                    key={notification.order_id}
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => {
                      if (notification.payment_type === "bank_transfer") {
                        handleCopy(notification.va_numbers.map(va => va.va_number));
                      } else if (notification.payment_type === "cstore") {
                        handleCopy([notification.payment_code]);
                      }
                    }}
                  >
                    {notification.payment_type === "bank_transfer" && notification.va_numbers 
                      ? notification.va_numbers.map(va => `${va.va_number}`).join(', ')
                      : notification.payment_type === "cstore"
                      ? notification.payment_code
                      : null}
                  </span>
                ))) || '0'}
              </td>

              <td className="py-2 px-4 border-b">
                {(data.notifications && data.notifications.map(notification => (
                  <span key={notification.order_id}>
                    {notification.payment_type === "bank_transfer" && notification.va_numbers 
                      ? notification.va_numbers.map(va => ` ${va.bank}`).join(', ')
                      : notification.payment_type === "cstore"
                      ? notification.store
                      : null}
                  </span>
                ))) || '0'}
              </td>

              <td className="py-2 px-4 border-b">
                {(data.notifications && data.notifications.map(notification => (
                  <span
                    key={notification.order_id}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(notification.transaction_status)}`}
                  >
                    <span className="dot__x2laS inline-block w-2 h-2 rounded-full mr-1"></span>
                    {notification.transaction_status}
                  </span>
                ))) || 'N/A'}
              </td> 
            </tr>
          )) : (
            <tr>
              <td colSpan="8" className="py-2 px-4 border-b text-center">Tidak ada data transaksi</td>
            </tr>
          )}
        </tbody>
      </table>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        {selectedId && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Transaksi</h2>
            {/*<div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold">Transaksi</h2>
              <div className="text-sm">
                <div className="breadcrumb">
                  <a className="text-blue-500">
                    ID - {selectedId.id}
                  </a>
                </div>
              </div>
            </div>*/}

            <div className="bg-white shadow-lg rounded-lg p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Informasi Pembayaran</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div>
                  <div className="text-gray-600 mb-1">Amount</div>
                  <h4 className="font-normal">Rp. {selectedId.transactionDetails.gross_amount}</h4>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Payment Method</div>
                  {(selectedId.notifications && selectedId.notifications.map(notification => (
                  <h4 key={notification.order_id}>
                    {notification.payment_type === "bank_transfer" && notification.va_numbers 
                      ? notification.va_numbers.map(va => ` ${va.bank}`)
                      : notification.payment_type === "cstore"
                      ? notification.store
                      : null}
                  </h4>
                ))) || '0'}
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Payment Code</div>
                   {(selectedId.notifications && selectedId.notifications.map(notification => (
                  <h4
                    key={notification.order_id}
                    className="text-blue-500 underline cursor-pointer"
                    onClick={() => {
                      if (notification.payment_type === "bank_transfer") {
                        handleCopy(notification.va_numbers.map(va => va.va_number));
                      } else if (notification.payment_type === "cstore") {
                        handleCopy([notification.payment_code]);
                      }
                    }}
                  >
                    {notification.payment_type === "bank_transfer" && notification.va_numbers 
                      ? notification.va_numbers.map(va => `${va.va_number}`)
                      : notification.payment_type === "cstore"
                      ? notification.payment_code
                      : null}
                  </h4>
                ))) || '0'}
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Status Transaction</div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(selectedId.notifications[0].transaction_status)}`}>
                    <span className="dot__x2laS inline-block w-2 h-2 rounded-full mr-1"></span>
                    {selectedId.notifications[0].transaction_status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Detail Order</h3>
              </div>
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Order ID</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Nama</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.receivedData.userName}</td>
                  </tr>
                
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Email</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.receivedData.userEmail}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Tipe Pembayaran</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.notifications[0].payment_type}</td>
                  </tr>
                  
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Transaction ID</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.notifications[0].transaction_id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Terbayar Pukul</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.notifications[0].transaction_time}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b"><strong>Waktu Kadaluarsa</strong></td>
                    <td className="py-2 px-4 border-b">{selectedId.notifications[0].expiry_time}</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Detail Item</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Nama Tempat</th>
                      <th className="py-2 px-4 border-b">Jumlah</th>
                      <th className="py-2 px-4 border-b text-right">Tanggal Booking</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    
                      <tr className="text-center">
                        <td className="py-2 px-4 border-b">{selectedId.receivedData.placeName}</td>
                        <td className="py-2 px-4 border-b">{selectedId.receivedData.quantity}</td>
                        <td className="py-2 px-4 border-b text-right">{selectedId.receivedData.visitDate}</td>
                      </tr>
                  </tbody>
                 
                </table>
              </div>
            </div>

          </div>
        )}
      </Popup>
    </div>
  );
};

export default TransactionAktif;
