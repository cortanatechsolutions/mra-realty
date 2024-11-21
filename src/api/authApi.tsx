import axios from "axios";
import { encryptText } from "../utils/encryption";
import { logMessage } from "../hooks/logger";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface TokenResponse {
  token: string;
}

export const getToken = async (
  username: string,
  password: string
): Promise<string | undefined> => {
  try {
    const encryptedUsername = encryptText(username);
    const encryptedPassword = encryptText(password);
    const response = await axios.post<TokenResponse>(`${API_URL}/gettoken`, {
      username: encryptedUsername,
      password: encryptedPassword,
    });

    localStorage.setItem("token", response.data.token);
    logMessage("Token received: " + response.data.token, "info");
    return response.data.token;
  } catch (error) {
    handleApiError(error);
    return undefined; // Ensure a consistent return type
  }
};

const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Error getting token: ${message}`);
  } else if (error instanceof Error) {
    throw new Error(`Error getting token: ${error.message}`);
  } else {
    throw new Error("An unknown error occurred while getting the token.");
  }
};
