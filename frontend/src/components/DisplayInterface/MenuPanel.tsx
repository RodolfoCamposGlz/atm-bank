// MenuPanel.tsx
import React from "react";
import { MenuOption, MenuOptionsMapping } from "./DisplayInterface.types";

interface MenuPanelProps {
  currentScreen: string;
  menuOptions: MenuOptionsMapping;
  onButtonClick: (action: string) => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  currentScreen,
  menuOptions,
  onButtonClick,
}) => {
  const currentOptions = menuOptions[currentScreen] || menuOptions.initial;

  return (
    <div className="grid grid-cols-2 grid-rows-4 text-xs h-[50%]">
      {currentOptions.map((option, index) => (
        <MenuOptionItem
          key={index}
          option={option}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  );
};

const MenuOptionItem: React.FC<{
  option: MenuOption;
  onButtonClick: (action: string) => void;
}> = ({ option, onButtonClick }) => {
  const side = option.col === 1 ? "left" : "right";

  return (
    <div
      className={`row-start-${option.row} col-start-${option.col} w-full ${
        option.justifyContent || ""
      }`}
    >
      {option.content && (
        <div
          className={`flex items-center h-full ${
            side === "right" ? "justify-end" : ""
          }`}
        >
          {side === "left" && (
            <div className="h-[2px] w-[14px] bg-white mr-1"></div>
          )}
          <button
            onClick={() => option.action && onButtonClick(option.action)}
            className="hover:underline cursor-pointer focus:outline-none text-[14px]"
          >
            {option.content}
          </button>
          {side === "right" && (
            <div className="h-[2px] w-[14px] bg-white ml-1"></div>
          )}
        </div>
      )}
    </div>
  );
};
