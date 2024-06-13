import React, { useState } from 'react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';



import AddUlasan from './AddUlasan';
import Popup from './Popup';


const Footer = () => {
  const Logo = () => (
    <div className="flex items-center space-x-2">
      <img src="https://firebasestorage.googleapis.com/v0/b/dolanrek-f88ad.appspot.com/o/logo-awal%2Ffix-2-1.png?alt=media&token=157aed0b-128d-4e4a-b6f5-4cc24bc23628" alt="Logo" className="h-12 w-12" />
      <span className="text-xl font-bold text-white">Dolanrek</span>
    </div>
  );

  const Menu = ({ title, items }) => (
    <div className="flex flex-col items-center lg:items-start space-y-2">
      <h4 className="font-semibold text-white">{title}</h4>
      {items.map((item, index) => (
        <a key={index} href="/" className="hover:underline text-white">
          {item}
        </a>
      ))}
    </div>
  );
  const Menuu = ({ addUl, items, onMenuItemClick  }) => (
    <div className="flex flex-col items-center lg:items-start space-y-2">
      <h4 className="font-semibold text-white">{addUl}</h4>
      {items.map((item, index) => (
        <a key={index} href="#" onClick={() => onMenuItemClick(item)} className="hover:underline text-white">
        {item}
      </a>
      ))}
    </div>
  );

  const Address = () => (
    <p className="text-white text-sm text-center lg:text-left">
      Jawa Timur <br />Indonesia
    </p>
  );

  const Email = () => (
    <p className="text-white text-sm text-center lg:text-left">
      <a href="#">dolanrekcorp@gmail.com</a>
    </p>
  );

  const SocialMedia = () => (
    <div className="flex space-x-4">
      <a href="https://www.tiktok.com/@dolan.rek" className="text-white text-2xl">
        <SiTiktok />
      </a>
      <a href="https://x.com/DolanRek" className="text-white text-2xl">
        <FaTwitter />
      </a>
      <a href="https://www.instagram.com/dolan.rek/" className="text-white text-2xl">
        <FaInstagram />
      </a>
    </div>
  );

  const currentYear = new Date().getFullYear();

  const Copyright = () => (
    <p className="text-white text-xs text-center lg:text-left">&copy; {currentYear} All Rights Reserved</p>
  );

  const [isAddUlasanPopupOpen, setIsAddUlasanPopupOpen] = useState(false);

  const openAddUlasanPopup = () => {
    setIsAddUlasanPopupOpen(true);
  };

  const closeAddUlasanPopup = () => {
    setIsAddUlasanPopupOpen(false);
  };

  const handleMenuItemClick = (item) => {
    if (item === 'Add Ulasan') {
      openAddUlasanPopup();
    }
  };

  const handleAddUlasanSubmitSuccess = () => {
    closeAddUlasanPopup();
    
  };

  return (
    <div className="w-full ">
      <footer className="w-full h-full bg-cover bg-center relative" style={{ backgroundImage: 'url(/img/b1.png)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative w-full h-full flex flex-col items-center justify-between p-8 space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Logo />
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:justify-center lg:space-x-16 text-white space-y-8 lg:space-y-0 items-center lg:items-start">
            <Menu title="Product" items={['Landing Page', 'Rekomendasi', 'Wisata Baru', 'Event', 'Paket Liburan']} />
            {/*<Menu title="Use Cases" items={['Web-designers', 'Marketers', 'Small Business', 'Website Builder']} />
            <Menu title="Resources" items={['Academy', 'Blog', 'Themes', 'Hosting', 'Developers', 'Support']} />*/}
             <Menuu addUl="Ulasan" items={['Add Ulasan']} onMenuItemClick={handleMenuItemClick} />
             <div className="flex flex-col items-center lg:items-start space-y-2">
              <h4 className="font-semibold text-lg text-white">Contact Us</h4>
              <Address />
              <Email />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-white">Follow us:</span>
              <SocialMedia />
            </div>
            {/*<div className="flex flex-col items-center space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
              <a href="#" className="hover:underline text-white">Privacy Policy</a>
              <a href="#" className="hover:underline text-white">Terms of Use</a>
              <a href="#" className="hover:underline text-white">Sales and Refunds</a>
              <a href="#" className="hover:underline text-white">Legal</a>
              <a href="#" className="hover:underline text-white">Site Map</a>
  </div>*/}
            <Copyright />
          </div>
        </div>
      </footer>
      <Popup isOpen={isAddUlasanPopupOpen} onClose={closeAddUlasanPopup}>
        <AddUlasan onSubmitSuccess={handleAddUlasanSubmitSuccess} />
      </Popup>
    </div>
  );
};

export default Footer;
