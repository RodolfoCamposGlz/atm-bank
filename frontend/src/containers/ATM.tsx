import React from "react";
import DisplayInterface from "../components/DisplayInterface/DisplayInterface";
export default function ATM() {
  return (
    <div className="relative mt-[20px] flex flex-col items-center min-h-[800px] ">
      <img
        src="graffiti.png"
        className="absolute w-[150px] top-[24px] right-[34px]"
      />
      <div className="bg-[#126CAE] w-[340px] justify-center flex rounded-lg py-2">
        <img className="w-[70%]" src="/atm_sign.png" />
      </div>
      <div className="w-[300px] bg-[#faf8f8] h-full">
        <div className="h-[6px] bg-gray-400 w-full mb-2"></div>
        <div className="relative">
          <DisplayInterface />
          <img
            src="sticker_graf.png"
            className="absolute w-[80px] bottom-[-42px] left-[30px]"
          />
          <img
            src="systems.png"
            className="absolute w-[40px] bottom-[-10px] right-[54px]"
          />
        </div>
      </div>
    </div>
  );
}
