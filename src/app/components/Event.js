import React from 'react';

const Event = () => {
  // Array of event details
  const items = [
    {
      dateMonth: 'Jul',
      dateDay: '06',
      title: 'MudaMudi Berkaraoke - Surabaya',
      address: 'Jl. Ksatria | Bumi Marinir Karang Pilang',
      price: 'Rp 45.000',
      src: '/img/rectangle_124.png',
    },
    {
      dateMonth: 'Jul',
      dateDay: '27',
      title: 'MudaMudi Berkaraoke - Banjarmasin',
      address: 'Banjarmasin | banjarmasin',
      price: 'Rp 45.000',
      src: '/img/rectangle_124.png',
    },
    {
      dateMonth: 'Jul',
      dateDay: '21',
      title: 'MudaMudi Berkaraoke - Makassar',
      address: 'Phinisi Point Mall | PHINISI POINT',
      price: 'Rp 45.000',
      src: '/img/rectangle_124.png',
    },
  ];

  return (
    <div id="Events" className="flex flex-wrap justify-between">
      {/* Event cards */}
      {items.map((item, index) => (
        <div key={index} className="max-w-[1100px] sm:w-1/2 lg:w-1/3 p-4">
          <div className="y-card y-is-clickable bg-white shadow-lg overflow-hidden relative">
            <div className="imgDisplay relative">
              <div className="rounded-lg overflow-hidden p-4">
                <img
                  className="mx-auto w-full h-60 object-cover rounded-lg"
                  src={item.src}
                  alt="Event Image"
                />
              </div>
            </div>
            <div className="y-date-boxInfo bg-gray-200 text-center absolute top-0 right-0 m-2 px-2 py-1 rounded">
              <div className="y-date-month font-bold">{item.dateMonth}</div>
              <div className="y-date-day font-bold">{item.dateDay}</div>
            </div>
            <div className="y-card-title p-4">
              <p className="boxTitle font-bold">{item.title}</p>
              <p className="boxAddress mt-4 mb-4">{item.address}</p>
              <hr className="y-separator" />
              <p className="boxInfo font-bold flex justify-between items-center mb-2">Start From <span className="boxPrice ml-4" style={{ color: 'blue' }}>{item.price}</span></p>
            </div>
          </div>
        </div>
      ))}
      {/* End of Event cards */}
      
      {/* Load More Button */}
      <div className="w-full p-4 flex justify-center">
        <button className="y-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Event;
