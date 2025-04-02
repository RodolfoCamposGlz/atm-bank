import { useState, useEffect } from "react";
// Define return type for the hook
interface BankAccountHook {
  // Account data
  balance: number;
  isLoading: boolean;
  error: string | null;
  pinNumber: string;

  // User data
  userName: string;
  isAuthenticated: boolean;
  failedAttempts: number;

  // Account operations
  verifyPin: (enteredPin: string) => boolean;
  withdrawMoney: (amount: number) => Promise<OperationResult>;
  depositMoney: (amount: number) => Promise<OperationResult>;
  logout: () => OperationResult;
  changePin: (oldPin: string, newPin: string) => Promise<OperationResult>;

  // Refresh data
  refreshAccountData: () => Promise<void>;
}

// Define account information type
interface AccountInfo {
  balance: number;
  name: string;
  pin: string;
  isAuthenticated: boolean;
  failedAttempts: number;
  isLoading: boolean;
  error: string | null;
}

// Transaction type
interface Transaction {
  id: string;
  date: string;
  type: "withdrawal" | "deposit";
  amount: number;
  balance: number;
}

// Operation result type
interface OperationResult {
  success: boolean;
  message: string;
  newBalance?: number;
  transaction?: Transaction;
}

/**
 * Custom hook to manage bank account operations
 * @param {string} accountId - The account ID for the current user
 * @returns {Object} - Account data and operations
 */
const useBankAccount = (accountId: string): BankAccountHook => {
  // Consolidated state for all account information
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    balance: 0,
    name: "",
    pin: "",
    isAuthenticated: false,
    failedAttempts: 0,
    isLoading: true,
    error: null,
  });

  // Fetch account data on initial load
  useEffect(() => {
    fetchAccountData(accountId);
  }, [accountId]);

  // Mock function to fetch account data
  const fetchAccountData = async (id: string): Promise<void> => {
    setAccountInfo((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response data
      const mockData = {
        balance: 322.22,
        name: "Rodolfo Campos",
        pin: "1234", // In a real app, you would NEVER store the PIN like this
      };

      setAccountInfo({
        balance: mockData.balance,
        name: mockData.name,
        pin: mockData.pin,
        isAuthenticated: false,
        failedAttempts: 0,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAccountInfo((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to fetch account data. Please try again.",
      }));
    }
  };

  // Verify PIN
  const verifyPin = (enteredPin: string): boolean => {
    console.log("accountInfo", accountInfo);
    if (enteredPin === accountInfo.pin) {
      setAccountInfo((prev) => ({
        ...prev,
        isAuthenticated: true,
        failedAttempts: 0,
      }));
      return true;
    } else {
      setAccountInfo((prev) => ({
        ...prev,
        failedAttempts: prev.failedAttempts + 1,
        isAuthenticated: false,
      }));
      return false;
    }
  };

  // Handle withdrawal
  const withdrawMoney = async (amount: number): Promise<OperationResult> => {
    if (!accountInfo.isAuthenticated) {
      return { success: false, message: "Not authenticated" };
    }

    if (amount <= 0) {
      return { success: false, message: "Invalid amount" };
    }

    if (amount > accountInfo.balance) {
      return { success: false, message: "Insufficient funds" };
    }

    try {
      setAccountInfo((prev) => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      const newBalance = accountInfo.balance - amount;
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "withdrawal",
        amount: -amount,
        balance: newBalance,
      };

      setAccountInfo((prev) => ({
        ...prev,
        balance: newBalance,
        isLoading: false,
      }));

      return {
        success: true,
        message: `Successfully withdrew $${amount.toFixed(2)}`,
        newBalance,
        transaction: newTransaction,
      };
    } catch (error) {
      setAccountInfo((prev) => ({
        ...prev,
        isLoading: false,
        error: "Transaction failed. Please try again.",
      }));

      return { success: false, message: "Transaction failed" };
    }
  };

  // Handle deposit
  const depositMoney = async (amount: number): Promise<OperationResult> => {
    if (!accountInfo.isAuthenticated) {
      return { success: false, message: "Not authenticated" };
    }

    if (amount <= 0) {
      return { success: false, message: "Invalid amount" };
    }

    try {
      setAccountInfo((prev) => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      const newBalance = accountInfo.balance + amount;
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: "deposit",
        amount: amount,
        balance: newBalance,
      };

      setAccountInfo((prev) => ({
        ...prev,
        balance: newBalance,
        isLoading: false,
      }));

      return {
        success: true,
        message: `Successfully deposited $${amount.toFixed(2)}`,
        newBalance,
        transaction: newTransaction,
      };
    } catch (error) {
      setAccountInfo((prev) => ({
        ...prev,
        isLoading: false,
        error: "Transaction failed. Please try again.",
      }));

      return { success: false, message: "Transaction failed" };
    }
  };

  // Logout
  const logout = (): OperationResult => {
    setAccountInfo((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));

    return { success: true, message: "Logged out successfully" };
  };

  // Change PIN
  const changePin = async (
    oldPin: string,
    newPin: string
  ): Promise<OperationResult> => {
    if (oldPin !== accountInfo.pin) {
      return { success: false, message: "Incorrect PIN" };
    }

    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      return { success: false, message: "PIN must be 4 digits" };
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAccountInfo((prev) => ({
        ...prev,
        pin: newPin,
      }));

      return { success: true, message: "PIN changed successfully" };
    } catch (error) {
      return { success: false, message: "Failed to change PIN" };
    }
  };

  return {
    // Account data
    balance: accountInfo.balance,
    isLoading: accountInfo.isLoading,
    error: accountInfo.error,
    pinNumber: accountInfo.pin,

    // User data
    userName: accountInfo.name,
    isAuthenticated: accountInfo.isAuthenticated,
    failedAttempts: accountInfo.failedAttempts,

    // Account operations
    verifyPin,
    withdrawMoney,
    depositMoney,
    logout,
    changePin,

    // Refresh data
    refreshAccountData: () => fetchAccountData(accountId),
  };
};

export default useBankAccount;
