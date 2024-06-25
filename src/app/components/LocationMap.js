// components/LocationMap.js
{/** 
import React, { useEffect, useState } from 'react';

const LocationMap = ({ address }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const apiKey = 'AIzaSyDmdGdBaC7RfenXqlKztdnkaqcYV_NfAes'; // Ganti dengan kunci API Google Maps yang valid

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setMapLoaded(true);
        };
        script.onerror = () => {
          setMapError('Error loading map. Please try again later.');
        };
        document.head.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    };

    loadGoogleMapsScript();

    return () => {
      const scriptElement = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places"]`);
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (mapLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: lat(), lng: lng() },
            zoom: 15,
          });

          new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map: map,
          });
        } else {
          setMapError('Error geocoding: ' + status);
        }
      });
    }
  }, [mapLoaded, address]);

  return (
    <div>
      {mapError ? (
        <p>{mapError}</p>
      ) : mapLoaded ? (
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default LocationMap;




import React, { useState, useEffect } from 'react';

const LocationMap = ({ address }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const apiKey = 'AIzaSyDmdGdBaC7RfenXqlKztdnkaqcYV_NfAes'; // Ganti dengan kunci API Google Maps yang valid

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          const mapOptions = {
            center: { lat: lat(), lng: lng() },
            zoom: 15,
          };
          const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
          setMap(newMap);

          const newMarker = new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map: newMap,
            title: address,
          });
          setMarker(newMarker);
        } else {
          console.error('Error geocoding:', status);
          alert('Error geocoding: ' + status);
        }
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }

    return () => {
      // Cleanup function
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [address]);

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default LocationMap;*/}

import React, { useState } from 'react';

const LocationMap = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [error, setError] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSearch = async () => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_API_KEY`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
        setError('');
      } else {
        setError('Alamat tidak ditemukan.');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat memuat peta. Silakan coba lagi.');
    }
  };

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${coordinates.lat},${coordinates.lng}&zoom=15`;

  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Alamat:</label>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Masukkan alamat"
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Cari Lokasi
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {coordinates.lat && coordinates.lng && (
        <div className="mt-4">
          <iframe
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapSrc}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LocationMap;

