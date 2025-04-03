import { useState, useCallback, useEffect } from "react";
import {
  BankAccountHook,
  AccountData,
  AccountInfo,
  ApiResponse,
  SuccessTransaction,
} from "./usebankData.types";
// Define return type for the hook

const API_CONFIG = {
  baseUrl: "http://localhost:8000/api/v1",
  endpoints: {
    accounts: "/accounts",
    withdraw: "/withdraw",
    deposit: "/deposit",
  },
  headers: {
    "Content-Type": "application/json",
  },
};

const useBankAccount = (accountId: string): BankAccountHook => {
  useEffect(() => {
    if (!accountId) {
      console.error("Account ID is required for useBankAccount hook");
    }
  }, [accountId]);

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    balance: 0,
    name: "",
    isAuthenticated: false,
    failedAttempts: 0,
    isLoading: false,
    error: null,
  });

  const callApi = useCallback(
    async <T,>(
      endpoint: string,
      method: string = "POST",
      body?: object
    ): Promise<ApiResponse<T>> => {
      try {
        const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
          method,
          headers: API_CONFIG.headers,
          body: body ? JSON.stringify(body) : undefined,
        });
        const responseData = await response.json();
        if (!response.ok) {
          return {
            success: false,
            error: responseData.message || `Error: ${response.status}`,
          };
        }
        return {
          success: true,
          data: responseData.data,
          message: responseData.message || responseData?.data?.message,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    []
  );

  const clearError = useCallback(() => {
    if (accountInfo.error) {
      setAccountInfo((prev) => ({ ...prev, error: null }));
    }
  }, [accountInfo.error]);

  const validatePin = useCallback(
    (pin: string): boolean => /^\d{4}$/.test(pin),
    []
  );

  const refreshAccountData = useCallback(
    async (pin: string): Promise<ApiResponse<AccountData>> => {
      clearError();
      if (!validatePin(pin))
        return { success: false, error: "PIN must be 4 digits" };
      setAccountInfo((prev) => ({ ...prev, isLoading: true }));
      const result = await callApi<AccountData>(
        API_CONFIG.endpoints.accounts,
        "POST",
        { id: accountId, pin }
      );
      if (result.success && result.data) {
        setAccountInfo({
          balance: result.data.balance,
          name: `${result.data.firstName} ${result.data.lastName}`,
          isAuthenticated: true,
          failedAttempts: 0,
          isLoading: false,
          error: null,
        });
      } else {
        setAccountInfo((prev) => ({
          ...prev,
          isLoading: false,
          failedAttempts: prev.failedAttempts + 1,
          error: result.error || "Authentication failed",
        }));
      }
      return result;
    },
    [accountId, callApi, clearError, validatePin]
  );

  const executeTransaction = useCallback(
    async (
      type: "withdraw" | "deposit",
      pin: string,
      amount: number
    ): Promise<ApiResponse<SuccessTransaction>> => {
      clearError();
      if (!accountInfo.isAuthenticated)
        return { success: false, error: "Not authenticated." };
      if (!validatePin(pin))
        return { success: false, error: "PIN must be 4 digits" };
      if (
        amount <= 0 ||
        (type === "withdraw" && amount > accountInfo.balance)
      ) {
        return { success: false, error: "Not enough balance" };
      }
      setAccountInfo((prev) => ({ ...prev, isLoading: true }));
      const endpoint =
        type === "withdraw"
          ? API_CONFIG.endpoints.withdraw
          : API_CONFIG.endpoints.deposit;
      const result = await callApi<SuccessTransaction>(endpoint, "POST", {
        id: accountId,
        pin,
        amount,
      });
      if (result.success) await refreshAccountData(pin);
      return {
        success: true,
        message: result.message || "Transaction succeded",
      };
    },
    [
      accountId,
      accountInfo,
      callApi,
      clearError,
      refreshAccountData,
      validatePin,
    ]
  );

  return {
    balance: accountInfo.balance,
    isLoading: accountInfo.isLoading,
    error: accountInfo.error,
    userName: accountInfo.name,
    isAuthenticated: accountInfo.isAuthenticated,
    failedAttempts: accountInfo.failedAttempts,
    withdrawMoney: (pin, amount) => executeTransaction("withdraw", pin, amount),
    depositMoney: (pin, amount) => executeTransaction("deposit", pin, amount),
    refreshAccountData,
  };
};

export default useBankAccount;
