import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      // Inisialisasi peta hanya jika belum ada
      mapRef.current = L.map('map').setView([51.505, -0.09], 13); // Koordinat default

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    const geocodeAddress = async (address) => {
      try {
        // Memanggil Nominatim API untuk mencari koordinat berdasarkan alamat
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        
        if (data.length > 0) {
          const { lat, lon } = data[0];
          mapRef.current.setView([lat, lon], 13);
          L.marker([lat, lon]).addTo(mapRef.current)
            .bindPopup(`<b>${address}</b>`); // Menambahkan popup dengan alamat
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error geocoding:', error);
      }
    };

    if (address) {
      geocodeAddress(address);
    }
  }, [address]);

  return <div id="map" style={{ width: '100%', height: '450px' }}></div>;
};

export default LeafletMap;
