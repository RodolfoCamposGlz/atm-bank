import React from "react";
const Button = ({ side, position, label, action, onClick }: any) => {
  return (
    <button
      className={`${side}-side position-${position} bg-[#cccccc]
       h-[20px] w-[32px] rounded-[8px] border-b-2 border-b-gray-400 border-t-2 
       border-t-gray-200 hover:bg-[#bbbbbb] active:bg-[#aaaaaa]`}
      onClick={onClick}
    ></button>
  );
};

export default Button;
