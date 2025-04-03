import React from "react";

interface ButtonProps {
  side: "left" | "right";
  onClick: () => void;
}

const Button = ({ side, onClick }: ButtonProps) => {
  return (
    <div className="flex items-center">
      {side === "right" && <div className="h-[2px] w-[10px] bg-gray-500"></div>}
      <button
        className={`bg-[#b2b1b1]
         h-[16px] w-[24px] rounded-[4px] border-b-2 border-b-gray-400 border-t-2 
         border-t-gray-200 hover:bg-[#bbbbbb] active:bg-[#aaaaaa] cursor-pointer`}
        onClick={onClick}
      ></button>
      {side === "left" && <div className="h-[2px] w-[10px] bg-gray-500"></div>}
    </div>
  );
};

export default Button;
