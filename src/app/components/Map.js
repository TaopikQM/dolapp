const Map = ({ coordinates }) => {
    const [latitude, longitude] = coordinates.split(',');
 
   //saya  AIzaSyDmdGdBaC7RfenXqlKztdnkaqcYV_NfAes
  //bkm AIzaSyB6v5UBdYe1E29dQZSXOdq1aNmiJ1AsSBg
    const apiKey = 'AIzaSyDmdGdBaC7RfenXqlKztdnkaqcYV_NfAes'; // Ganti dengan API Key Google Maps Anda
  
    const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`;
    return (
      <iframe
        width="100%"
        height="450"
        loading="lazy"
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        title="Google Maps"
      ></iframe>
    );
  };
  
  export default Map;
  