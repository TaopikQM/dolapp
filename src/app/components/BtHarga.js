import { useEffect, useState } from 'react'; 
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../config/firebase';



const BtHarga = () => {
  const [place, setPlace] = useState(null);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const id = currentUrl.split('/detail/')[1];

      const placeRef = ref(rtdb, `tempat_wisata_r/${id}`);
      onValue(placeRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Data Tempat Wisata:', data);
        setPlace(data);
      }, {
        onlyOnce: true
      });
    }
  }, []);

  if (!place ) {
    return <div>Loading...</div>;
  }

   const handleClick = () => {
    // Mengarahkan ke halaman transaksi
     // Mendapatkan ID tempat wisata dari place
     const id = encodeURIComponent(place.id);

     // Mengarahkan ke halaman transaksi dengan manipulasi URL
     window.location.href = `/detail/${id}/transaksi`;//<Link href={`/detail/${encodeURIComponent(place.id)}`} key={place.id}></Link>
  };

  return (
    <div
      className="bg-blue-500 p-4 rounded-lg text-center cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
      onClick={handleClick}
    >
      <h2 className="text-white font-bold">Harga:</h2>
      <p className="text-white">{place.price}</p>
    </div>
  );
};

export default BtHarga;
