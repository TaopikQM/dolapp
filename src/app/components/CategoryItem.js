import React from "react";

const CategoryItem = ({ title, src, handleClick }) => {
  return (
    <div className="flex items-center w-[326px] h-[138px] bg-[#006cff] rounded-[20px]" onClick={() => handleClick(title)}>
      <img
        className="w-[166px] h-[138px] object-cover rounded-[20px]"
        alt={title}
        src={src}
      />
      <div className="flex-1 text-white text-[24px] font-semibold text-center leading-normal ml-1">
        {title.split(" ").map((text, i) => (
          <div key={i}>{text}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;
