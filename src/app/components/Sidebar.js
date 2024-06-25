// components/Sidebar.js

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ selectedItem, setSelectedItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 

  const getLinkClasses = (item) => {
    const baseClasses = "block py-2.5 px-4 rounded transition duration-200 cursor-pointer";
    const activeClasses = "bg-blue-700 text-white";
    const inactiveClasses = "bg-blue-500 text-white hover:bg-blue-600 hover:text-white";
    return selectedItem === item ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <div className={`h-screen bg-blue-500 text-white ${isOpen ? 'w-64' : 'w-16'} space-y-6 py-7 px-2 transition-width duration-200`}>
      <button onClick={toggleSidebar} className="text-white focus:outline-none px-4">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} text-white text-2xl flex items-center space-x-2 px-4`}>
        <span className="text-white text-lg">Admin Dashboard</span>
      </div>
      
      <nav>
        <div onClick={() => setSelectedItem('Category')} className={getLinkClasses('Category')}>
          Category
        </div>
        <div onClick={() => setSelectedItem('Wisata')} className={getLinkClasses('Wisata')}>
          Wisata
        </div>
        <div onClick={() => setSelectedItem('Ulasan')} className={getLinkClasses('Ulasan')}>
          Ulasan
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
