import React from 'react';

const GoogleMap = ({ lat, lng }) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0010659648477!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fc9ad0a04b51%3A0x6073cc130dca7e9!2sSurabaya%2C%20Surabaya%20City%2C%20East%20Java%2C%20Indonesia!5e0!3m2!1sen!2s!4v1622363310088!5m2!1sen!2s`;

  return (
    <div>
      <iframe
        title="Google Map"
        width="600"
        height="450"
        frameborder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
