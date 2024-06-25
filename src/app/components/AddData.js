import { useState } from 'react';
import Map from './Map';

const AddData = () => {
  const [coordinatesInput, setCoordinatesInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if coordinatesInput is not empty or null
    if (coordinatesInput) {
      const [latStr, lngStr] = coordinatesInput.split(',');
      const lat = parseFloat(latStr.trim());
      const lng = parseFloat(lngStr.trim());

      if (!isNaN(lat) && !isNaN(lng)) {
        setCoordinatesInput('');
      } else {
        alert('Masukkan nilai Latitude dan Longitude yang valid.');
      }
    } else {
      alert('Masukkan nilai Latitude dan Longitude.');
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Koordinat Alamat Wisata:</label>
          <input
            type="text"
            value={coordinatesInput}
            onChange={(e) => setCoordinatesInput(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Isi dengan koordinat yang sesuai tempat Wisata. Contoh: -6.221468931701369, 106.5984391068439"
          />
        </div>
       
      </form>
      {coordinatesInput && (
        <Map coordinates={coordinatesInput} />
      )}
    </div>
  );
};

export default AddData;
