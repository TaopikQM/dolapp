import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { rtdb } from '../config/firebase';
import useAuth from '../hooks/useAuth';

const TransaksiForm = () => {
  const user = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [visitDate, setVisitDate] = useState("");
  const [placeDetail, setPlaceDetail] = useState(null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    const idFromUrl = currentUrl.split('/detail/')[1].split('/')[0];

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

    fetchPlaceDetail(idFromUrl);
  }, []);

  const decreaseQuantity = () => {
    setQuantity((prevState) => (prevState > 1 ? prevState - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleDateChange = (event) => {
    setVisitDate(event.target.value);
    if (event.target.value) {
      setWarning(""); // Clear warning when date is selected
    }
  };

  const checkout = async () => {
    setWarning(""); // Clear any existing warnings

    if (!placeDetail) {
      alert("Place details are not loaded yet!");
      return;
    }

    if (!visitDate) {
      setWarning("Please select a visit date.");
      return;
    }

    if (!user || !user.displayName || !user.email) {
      setWarning("Please complete your user profile data.");
      return;
    }

    const data = {
      id: placeDetail.id,
      placeName: placeDetail.name,
      price: placeDetail.price,
      quantity: quantity,
      visitDate: visitDate,
      userName: user.displayName,
      userEmail: user.email
    };

    try {
      const response = await fetch("/api/tokentrans", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        //console.error('Server error:', errorData);
        throw new Error(`Network response was not ok: ${errorData.details}`);
      }

      const requestData = await response.json();
      console.log({ requestData });

      window.snap.pay(requestData.token);
      // Navigasi ke halaman Thanks dengan membawa data transaksi
   // window.location.href = `/thanks?orderId=${transactionData.order_id}&grossAmount=${transactionData.gross_amount}`;

    } catch (error) {
      //console.error('Error during checkout:', error);
    }
  };

  if (!placeDetail) {
    return <div>Loading...</div>;
  }

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  const maxDateFormatted = maxDate.toISOString().split('T')[0];

  return (
    <div className="bg-blue-500 p-4 rounded-lg text-center">
      {warning && <div className="bg-red-500 text-white p-2 rounded mb-4">{warning}</div>}

      <div className="mt-4">
        <h3 className="text-white font-bold">Jumlah Tiket:</h3>
        <div className="flex justify-center items-center">
          <button onClick={decreaseQuantity} className="bg-white text-blue-500 font-bold px-2 py-1 rounded-l">
            -
          </button>
          <span className="bg-white text-blue-500 font-bold px-4 py-1">{quantity}</span>
          <button onClick={increaseQuantity} className="bg-white text-blue-500 font-bold px-2 py-1 rounded-r">
            +
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-white font-bold">Tanggal Kunjungan:</h3>
        <input
          type="date"
          value={visitDate}
          onChange={handleDateChange}
          min={today}
          max={maxDateFormatted}
          className="bg-white text-blue-500 font-bold px-4 py-1 rounded"
        />
      </div>

      <button onClick={checkout} className="bg-green-500 text-white font-bold px-4 py-2 rounded mt-4">
        Checkout
      </button>
    </div>
  );
};

export default TransaksiForm;
