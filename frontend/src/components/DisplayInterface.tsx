import React, { useState } from "react";
import Button from "./Button";
import CurrencyInput from "react-currency-input-field";
import useBankAccount from "../hooks/useBankData";

// Define screen types to avoid string literals
type ScreenType =
  | "initial"
  | "options"
  | "withdraw"
  | "deposit"
  | "balance"
  | "pin"
  | "goodbye";

// Define button action mapping type
interface ButtonActionMapping {
  [key: string]: (string | null)[];
}

// Define menu option type
interface MenuOption {
  row: number;
  col: number;
  content: string;
  action?: string;
  justifyContent?: string;
}

// Define menu options mapping type
interface MenuOptionsMapping {
  [key: string]: MenuOption[];
}

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
    isAuthenticated,
    verifyPin,
    withdrawMoney,
    depositMoney,
    isLoading,
    error,
  } = useBankAccount("user123"); // Pass account ID

  // Button actions mapping - moved outside of render functions
  const leftButtonActions: ButtonActionMapping = {
    initial: [null, null, null, null],
    options: [null, null, "withdraw", "deposit"],
    withdraw: [null, null, null, null],
    deposit: [null, null, null, null],
    balance: [null, null, null, null],
    pin: [null, null, null, null],
    goodbye: [null, null, null, null],
  };

  const rightButtonActions: ButtonActionMapping = {
    initial: [null, null, null, "pin"],
    options: [null, "exit", "balance", "initial"],
    withdraw: ["submit-withdraw", "options", null, null],
    deposit: ["submit-deposit", "options", null, null],
    balance: [null, "options", null, null],
    pin: ["submit-pin", "exit", null, null],
    goodbye: [null, null, null, "initial"],
  };

  // Menu options mapping - moved outside of render functions
  const menuOptions: MenuOptionsMapping = {
    initial: [
      { row: 1, col: 1, content: "" },
      { row: 1, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 2, col: 1, content: "" },
      { row: 2, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 3, col: 1, content: "" },
      { row: 3, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 4, col: 1, content: "" },
      {
        row: 4,
        col: 2,
        content: "Enter PIN",
        action: "pin",
        justifyContent: "justify-self-end",
      },
    ],
    options: [
      { row: 1, col: 1, content: "" },
      { row: 1, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 2, col: 1, content: "" },
      {
        row: 2,
        col: 2,
        content: "Exit",
        action: "exit",
        justifyContent: "justify-self-end",
      },
      { row: 3, col: 1, content: "Withdraw", action: "withdraw" },
      {
        row: 3,
        col: 2,
        content: "Balance",
        action: "balance",
        justifyContent: "justify-self-end",
      },
      { row: 4, col: 1, content: "Deposit", action: "deposit" },
      {
        row: 4,
        col: 2,
        content: "Re-enter PIN",
        action: "pin",
        justifyContent: "justify-self-end",
      },
    ],
    balance: [
      { row: 1, col: 1, content: "" },
      { row: 1, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 2, col: 1, content: "" },
      {
        row: 2,
        col: 2,
        content: "Back",
        action: "options",
        justifyContent: "justify-self-end",
      },
      { row: 3, col: 1, content: "" },
      { row: 3, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 4, col: 1, content: "" },
      { row: 4, col: 2, content: "", justifyContent: "justify-self-end" },
    ],
    withdraw: [
      { row: 1, col: 1, content: "" },
      {
        row: 1,
        col: 2,
        content: "Continue",
        action: "submit-withdraw",
        justifyContent: "justify-self-end",
      },
      { row: 2, col: 1, content: "" },
      {
        row: 2,
        col: 2,
        content: "Back",
        action: "options",
        justifyContent: "justify-self-end",
      },
      { row: 3, col: 1, content: "" },
      { row: 3, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 4, col: 1, content: "" },
      { row: 4, col: 2, content: "", justifyContent: "justify-self-end" },
    ],
    deposit: [
      { row: 1, col: 1, content: "" },
      {
        row: 1,
        col: 2,
        content: "Continue",
        action: "submit-deposit",
        justifyContent: "justify-self-end",
      },
      { row: 2, col: 1, content: "" },
      {
        row: 2,
        col: 2,
        content: "Back",
        action: "options",
        justifyContent: "justify-self-end",
      },
      { row: 3, col: 1, content: "" },
      { row: 3, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 4, col: 1, content: "" },
      { row: 4, col: 2, content: "", justifyContent: "justify-self-end" },
    ],
    pin: [
      { row: 1, col: 1, content: "" },
      {
        row: 1,
        col: 2,
        content: "Continue",
        action: "submit-pin",
        justifyContent: "justify-self-end",
      },
      { row: 2, col: 1, content: "" },
      {
        row: 2,
        col: 2,
        content: "Exit",
        action: "exit",
        justifyContent: "justify-self-end",
      },
      { row: 3, col: 1, content: "" },
      { row: 3, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 4, col: 1, content: "" },
      { row: 4, col: 2, content: "", justifyContent: "justify-self-end" },
    ],
    goodbye: [
      { row: 1, col: 1, content: "" },
      { row: 1, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 2, col: 1, content: "" },
      { row: 2, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 3, col: 1, content: "" },
      { row: 3, col: 2, content: "", justifyContent: "justify-self-end" },
      { row: 4, col: 1, content: "" },
      {
        row: 4,
        col: 2,
        content: "Start Over",
        action: "initial",
        justifyContent: "justify-self-end",
      },
    ],
  };

  // Event handlers
  const handleButtonClick = async (action: string): Promise<void> => {
    switch (action) {
      case "options":
        setCurrentScreen("options");
        break;
      case "withdraw":
        setCurrentScreen("withdraw");
        break;
      case "deposit":
        setCurrentScreen("deposit");
        break;
      case "balance":
        setCurrentScreen("balance");
        break;
      case "exit":
        setCurrentScreen("initial");
        resetInputValues();
        break;
      case "back":
        setCurrentScreen("initial");
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
  };

  const handlePinSubmit = (): void => {
    if (verifyPin(pin)) {
      setCurrentScreen("options");
      setPin("");
    } else {
      alert("Invalid PIN");
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
  };

  const handleWithdrawAmountChange = (value: string | undefined): void => {
    if (value !== undefined) {
      setWithdrawAmount(value);
    }
  };

  const handleDepositAmountChange = (value: string | undefined): void => {
    if (value !== undefined) {
      setDepositAmount(value);
    }
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

    const result = await withdrawMoney(amount);
    if (result.success) {
      setWithdrawAmount("");
      setCurrentScreen("options");
    } else {
      alert(result.message);
    }
  };

  const handleDeposit = async (): Promise<void> => {
    const amount = parseAmount(depositAmount);
    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    const result = await depositMoney(amount);
    if (result.success) {
      setDepositAmount("");
      setCurrentScreen("options");
    } else {
      alert(result.message);
    }
  };

  // UI rendering components
  const LoadingState = (): JSX.Element => <div>Loading...</div>;
  const ErrorState = (): JSX.Element => <div>Error: {error}</div>;

  const ScreenContent = (): JSX.Element => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState />;

    switch (currentScreen) {
      case "initial":
        return (
          <div className="flex flex-col items-center mt-[10px]">
            <p>Hi {userName}!</p>
            <p>Welcome to the ATM</p>
          </div>
        );
      case "withdraw":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4">Enter amount to withdraw</p>
            <CurrencyInput
              value={withdrawAmount}
              onValueChange={handleWithdrawAmountChange}
              className="w-32 p-2 text-center text-white rounded border border-gray-300"
              prefix="$"
              decimalScale={2}
              autoFocus
            />
          </div>
        );
      case "deposit":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4">Enter amount to deposit</p>
            <CurrencyInput
              value={depositAmount}
              onValueChange={handleDepositAmountChange}
              className="w-32 p-2 text-center text-white rounded border border-gray-300"
              prefix="$"
              decimalScale={2}
              autoFocus
            />
          </div>
        );
      case "balance":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4">Your balance is</p>
            <CurrencyInput
              value={balance}
              className="w-32 p-2 text-center text-black rounded border border-gray-300"
              prefix="$"
              decimalScale={2}
              disabled
              readOnly
            />
          </div>
        );
      case "pin":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4">Enter your 4-digit PIN</p>
            <div>
              <input
                type="password"
                value={pin}
                onChange={handlePinChange}
                className="w-auto h-[20px] p-2 text-center text-black rounded tracking-widest border border-gray-300"
                maxLength={4}
                inputMode="numeric"
                autoFocus
              />
            </div>
          </div>
        );
      case "goodbye":
        return <p>Thank you for using our ATM</p>;
      default:
        return <p>Please make a selection</p>;
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
      <div className="flex flex-col h-full justify-end mt-auto gap-y-1 mb-3">
        {actions.map((action, index) => (
          <Button
            key={`${side}-${index}`}
            onClick={() => action && handleButtonClick(action)}
          />
        ))}
      </div>
    );
  };

  const MenuPanel = (): JSX.Element => {
    const currentOptions = menuOptions[currentScreen] || menuOptions.initial;

    return (
      <div className="flex flex-col justify-between h-full">
        <div className="h-[50%]">
          <ScreenContent />
        </div>
        <div className="grid grid-cols-2 grid-rows-4 text-xs gap-y-3 h-[50%]">
          {currentOptions.map((option, index) => (
            <div
              key={index}
              className={`row-start-${option.row} col-start-${option.col} ${
                option.justifyContent || ""
              }`}
            >
              {option.content && (
                <button
                  onClick={() =>
                    option.action && handleButtonClick(option.action)
                  }
                  className="hover:underline focus:outline-none text-[8px]"
                >
                  {option.content}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row">
      <ButtonPanel
        side="left"
        actions={leftButtonActions[currentScreen] || leftButtonActions.initial}
      />
      <div className="bg-blue-400 text-white text-sm h-[200px] w-[200px] border-6 border-gray-200 pb-3">
        <MenuPanel />
      </div>
      <ButtonPanel
        side="right"
        actions={
          rightButtonActions[currentScreen] || rightButtonActions.initial
        }
      />
    </div>
  );
};

export default DisplayScreen;
