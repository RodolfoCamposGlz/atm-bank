import React, { useState } from "react";
import Button from "../Button";
import useBankAccount from "../../hooks/useBankData";
import HighlightedImage from "../HighLightImage";
import { MenuPanel } from "./MenuPanel";
import {
  ScreenType,
  HighlightStyle,
  leftButtonActions,
  rightButtonActions,
  menuOptions,
  cardImagesPosition,
} from "./DisplayInterface.types";
import { ScreenContent } from "./ScreenContent";

const DEFAULT_ACCOUNT_ID = "1";

export const DEFAULT_HIGHLIGHT: HighlightStyle = {
  top: "0px",
  left: "0px",
  width: "0px",
  height: "0px",
};

const DisplayScreen: React.FC = () => {
  // State management
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("initial");
  const [pin, setPin] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  // Initialize the bank account hook
  const {
    balance,
    userName,
    cardType,
    refreshAccountData,
    withdrawMoney,
    depositMoney,
    resetAccountState,
    isLoading,
  } = useBankAccount(DEFAULT_ACCOUNT_ID); // Pass account ID

  // Event handlers
  const handleButtonClick = async (action: string): Promise<void> => {
    switch (action) {
      case "options":
        setCurrentScreen("options");
        break;
      case "withdraw":
        setCurrentScreen("withdraw");
        setWithdrawAmount("");
        break;
      case "deposit":
        setCurrentScreen("deposit");
        setDepositAmount("");
        break;
      case "balance":
        setCurrentScreen("balance");
        break;
      case "exit":
        resetInputValues();
        setPin("");
        resetAccountState();
        break;
      case "back":
        resetInputValues();
        break;
      case "pin":
        setCurrentScreen("pin");
        break;
      case "submit-pin":
        handlePinSubmit();
        break;
      case "submit-withdraw":
        await handleWithdraw();
        break;
      case "submit-deposit":
        await handleDeposit();
        break;
      default:
        setCurrentScreen("initial");
    }
  };

  // Helper functions
  const resetInputValues = (): void => {
    setWithdrawAmount("");
    setDepositAmount("");
    setCurrentScreen("initial");
  };

  const handlePinSubmit = async (): Promise<void> => {
    const res = await refreshAccountData(pin);
    if (res.success) {
      setCurrentScreen("options");
    } else {
      alert(res.error);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
  };

  const parseAmount = (amountStr: string): number => {
    return parseFloat(amountStr.replace(/[^0-9.-]+/g, ""));
  };

  const handleWithdraw = async (): Promise<void> => {
    const amount = parseAmount(withdrawAmount);
    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    const result = await withdrawMoney(pin, amount);
    if (result.success) {
      setWithdrawAmount("");
      setCurrentScreen("options");
      alert(result.message);
    } else {
      alert(result.error);
    }
  };

  const handleDeposit = async (): Promise<void> => {
    const amount = parseAmount(depositAmount);
    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    const result = await depositMoney(pin, amount);
    if (result.success) {
      setDepositAmount("");
      setCurrentScreen("options");
      alert(result.message);
    } else {
      alert(result.error);
    }
  };

  const ButtonPanel = ({
    side,
    actions,
  }: {
    side: "left" | "right";
    actions: (string | null)[];
  }): JSX.Element => {
    return (
      <div className="flex flex-col h-full justify-end mt-auto gap-y-3 mb-[12px]">
        {actions.map((action) => (
          <Button
            side={side}
            onClick={() => action && handleButtonClick(action)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-auto">
        <HighlightedImage
          cardSelected={cardType ?? ""}
          imageSrc="/credit-cards.png"
          highlight={
            cardImagesPosition.get(cardType as string) ?? DEFAULT_HIGHLIGHT
          }
        />
      </div>

      <div className="flex flex-row">
        <ButtonPanel
          side="left"
          actions={
            leftButtonActions[currentScreen] || leftButtonActions.initial
          }
        />
        <div className="bg-blue-400 text-white text-sm h-[300px] w-[300px] border-6 border-gray-200 ">
          <div className="flex flex-col justify-between h-full">
            <div className="h-[50%]">
              <ScreenContent
                currentScreen={currentScreen}
                isLoading={isLoading}
                userName={userName}
                balance={balance}
                pin={pin}
                withdrawAmount={withdrawAmount}
                depositAmount={depositAmount}
                onPinChange={handlePinChange}
                onWithdrawAmountChange={setWithdrawAmount}
                onDepositAmountChange={setDepositAmount}
              />
            </div>
            <MenuPanel
              currentScreen={currentScreen}
              menuOptions={menuOptions}
              onButtonClick={handleButtonClick}
            />
          </div>
        </div>
        <ButtonPanel
          side="right"
          actions={
            rightButtonActions[currentScreen] || rightButtonActions.initial
          }
        />
      </div>
    </div>
  );
};

export default DisplayScreen;
