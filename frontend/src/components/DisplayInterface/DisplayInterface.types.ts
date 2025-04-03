// Define screen types to avoid string literals
export type ScreenType =
  | "initial"
  | "options"
  | "withdraw"
  | "deposit"
  | "balance"
  | "pin"
  | "goodbye";

export interface HighlightStyle {
  top: string;
  left: string;
  width: string;
  height: string;
}
// Define button action mapping type
export interface ButtonActionMapping {
  [key: string]: (string | null)[];
}

// Define menu option type
export interface MenuOption {
  row: number;
  col: number;
  content: string;
  action?: string;
  justifyContent?: string;
}

// Define menu options mapping type
export interface MenuOptionsMapping {
  [key: string]: MenuOption[];
}

export const leftButtonActions: ButtonActionMapping = {
  initial: [null, null, null, null],
  options: [null, null, "withdraw", "deposit"],
  withdraw: [null, null, null, null],
  deposit: [null, null, null, null],
  balance: [null, null, null, null],
  pin: [null, null, null, null],
  goodbye: [null, null, null, null],
};

export const rightButtonActions: ButtonActionMapping = {
  initial: [null, null, null, "pin"],
  options: [null, "exit", "balance", "exit"],
  withdraw: ["submit-withdraw", "options", null, null],
  deposit: ["submit-deposit", "options", null, null],
  balance: [null, "options", null, null],
  pin: ["submit-pin", "exit", null, null],
  goodbye: [null, null, null, "initial"],
};

export const menuOptions: MenuOptionsMapping = {
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
      action: "exit",
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

export const cardImagesPosition = new Map([
  [
    "visa",
    {
      top: "0px",
      left: "208px",
      width: "34px",
      height: "24px",
    },
  ],
  [
    "mastercard",
    {
      top: "0px",
      left: "130px",
      width: "32px",
      height: "24px",
    },
  ],
  [
    "maestro",
    {
      top: "0px",
      left: "90px",
      width: "32px",
      height: "24px",
    },
  ],
  [
    "plus",
    {
      top: "0px",
      left: "170px",
      width: "34px",
      height: "24px",
    },
  ],
  [
    "pulse",
    {
      top: "2px",
      left: "38px",
      width: "50px",
      height: "20px",
    },
  ],
  [
    "star",
    {
      top: "0px",
      left: "0px",
      width: "32px",
      height: "20px",
    },
  ],
]);
