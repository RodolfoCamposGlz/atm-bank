// ScreenContent.tsx
import React from "react";
import { NumericFormat } from "react-number-format";
import { ScreenType } from "./DisplayInterface.types";

interface ScreenContentProps {
  currentScreen: ScreenType;
  isLoading: boolean;
  userName: string;
  balance: number;
  pin: string;
  withdrawAmount: string;
  depositAmount: string;
  onPinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWithdrawAmountChange: (value: string) => void;
  onDepositAmountChange: (value: string) => void;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({
  currentScreen,
  isLoading,
  userName,
  balance,
  pin,
  withdrawAmount,
  depositAmount,
  onPinChange,
  onWithdrawAmountChange,
  onDepositAmountChange,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-lg">
        Loading...
      </div>
    );
  }

  switch (currentScreen) {
    case "initial":
      return (
        <div className="flex flex-col items-center mt-[10px] text-lg">
          <p>Hi {userName}!</p>
          <p>Welcome to the ATM</p>
        </div>
      );
    case "options":
      return (
        <div className="flex flex-col items-center mt-[10px] text-lg">
          <p>Hi {userName}!</p>
          <p>Please make a choice</p>
        </div>
      );
    case "withdraw":
      return (
        <div className="flex flex-col items-center justify-center h-full text-lg">
          <p className="mb-4 ">Enter amount to withdraw</p>
          <NumericFormat
            value={withdrawAmount}
            className="w-32 p-2 text-center text-white rounded border border-gray-300"
            onValueChange={({ value }) => onWithdrawAmountChange(value)}
            prefix="$"
            placeholder="0.0"
            decimalScale={2}
            allowNegative={false}
            autoFocus
            thousandSeparator
          />
        </div>
      );
    case "deposit":
      return (
        <div className="flex flex-col items-center justify-center h-full text-lg">
          <p className="mb-4">Enter amount to deposit</p>
          <NumericFormat
            value={depositAmount}
            className="w-32 p-2 text-center text-white rounded border border-gray-300"
            onValueChange={({ value }) => onDepositAmountChange(value)}
            prefix="$"
            placeholder="0.0"
            decimalScale={2}
            allowNegative={false}
            autoFocus
            thousandSeparator
          />
        </div>
      );
    case "balance":
      return (
        <div className="flex flex-col items-center justify-center h-full text-lg">
          <p className="mb-4">Your balance is</p>
          <NumericFormat
            value={balance}
            className="w-32 p-2 text-center text-white rounded border border-gray-300"
            prefix="$"
            decimalScale={2}
            autoFocus
            disabled
            thousandSeparator
          />
        </div>
      );
    case "pin":
      return (
        <div className="flex flex-col items-center justify-center h-full text-lg">
          <p className="mb-4">Enter your 4-digit PIN</p>
          <div>
            <input
              type="password"
              value={pin}
              onChange={onPinChange}
              className="w-auto h-[32px] p-2 text-center text-black rounded tracking-widest border border-gray-300"
              maxLength={4}
              inputMode="numeric"
              autoFocus
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center mt-[10px]">
          <p>Hi {userName}!</p>
          <p>Please make a choice</p>
        </div>
      );
  }
};
