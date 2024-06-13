import Link from 'next/link';

const Box = () => {
  const items = [
    { title: "Wisata Alam", src: "/img/rectangle_124.png" },
    { title: "Wisata Budaya", src: "/img/rectangle_124.png" },
    { title: "Wisata Religi", src: "/img/rectangle_124.png" },
    { title: "Wisata Sejarah", src: "/img/rectangle_124.png" },
    { title: "Taman Rekreasi", src: "/img/rectangle_124.png" },
    { title: "Wisata Kuliner", src: "/img/rectangle_124.png" },
    { title: "Taman Rekreasi", src: "/img/rectangle_124.png" },
    { title: "Wisata Kuliner", src: "/img/rectangle_124.png" },
  ];

  const renderItem = (item, index) => (
    <Link key={index} href={`/category/${encodeURIComponent(item.title)}`}>
  
      <div className="flex items-center mr-10 mb-10 w-[326px] h-[138px] bg-[#006cff] rounded-[20px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <img
          className="w-[166px] h-[138px] object-cover rounded-[20px]"
          alt={item.title}
          src={item.src}
        />
        <div className="flex-1 text-white text-[24px] font-semibold text-center leading-normal ml-1">
          {item.title.split(" ").map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </div>
      </div>
    </Link>
  );

  const chunkSize = 3; // Maksimal 3 item per baris
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunkedItems.push(items.slice(i, i + chunkSize));
  }

  return (
    <div className="p-10 bg-white">
      <div className="flex flex-col justify-center items-center ">
        {chunkedItems.map((chunk, index) => (
          <div key={index} className="md:flex md:flex-row ">
            {chunk.map((item, itemIndex) => renderItem(item, itemIndex))}
          </div>
        ))}
      </div>
     {/** <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map(renderItem)}
        </div>
      </div>
      <div className="flex justify-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {items.slice(-2).map(renderItem)}
        </div>
      </div>*/} 
      
    </div>
  );
};

export default Box;
