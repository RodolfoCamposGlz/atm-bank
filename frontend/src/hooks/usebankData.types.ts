export interface BankAccountHook {
  balance: number;
  isLoading: boolean;
  error: string | null;
  userName: string;
  isAuthenticated: boolean;
  failedAttempts: number;
  withdrawMoney: (
    pin: string,
    amount: number
  ) => Promise<ApiResponse<SuccessTransaction>>;
  depositMoney: (
    pin: string,
    amount: number
  ) => Promise<ApiResponse<SuccessTransaction>>;
  refreshAccountData: (pin: string) => Promise<ApiResponse<AccountData>>;
}

export interface AccountInfo {
  balance: number;
  name: string;
  isAuthenticated: boolean;
  failedAttempts: number;
  isLoading: boolean;
  error: string | null;
}

const CardType = {
  VISA: "visa",
  MASTERCARD: "mastercard",
  MAESTRO: "maestro",
  PLUS: "plus",
  DISCOVER: "discover",
};

export interface AccountData {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
  accountStatus: "open" | "closed" | "frozen";
  pinNumber: string;
  createdAt: string;
  updatedAt: string;
  cardType: typeof CardType;
  deletedAt: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
  message?: string;
}

export interface SuccessTransaction {
  status: string;
  data: {
    message: string;
  };
}
