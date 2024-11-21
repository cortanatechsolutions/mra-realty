import axios from "axios";
import { getToken } from "../api/authApi";

const API_URL = import.meta.env.VITE_REACT_APP_EMAIL_API_URL; // Base URL for your email service

export const addNewEmailSubscriber = async (email: string): Promise<void> => {
  var token = await getToken(
    import.meta.env.VITE_REACT_APP_AUTH_USERNAME!,
    import.meta.env.VITE_REACT_APP_AUTH_PASSWORD!
  );

  if (!token) {
    throw new Error("Something went wrong. Please try again later.");
  }

  try {
    await axios.post(
      `${API_URL}/subscribe`,
      email, // Send email as a JSON object
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    let userFriendlyMessage = "Something went wrong. Please try again later.";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        userFriendlyMessage =
          "It seems like the email address you entered is not valid. Please check and try again.";
      } else if (error.response?.status === 401) {
        userFriendlyMessage =
          "You're not authorized to perform this action. Please log in and try again.";
      } else if (error.response?.status === 500) {
        userFriendlyMessage =
          "Our servers are currently experiencing issues. Please try again later.";
      } else {
        userFriendlyMessage =
          error.response?.data?.message || "Unable to subscribe at this time.";
      }
    } else if (error instanceof Error) {
      userFriendlyMessage = error.message;
    }

    throw new Error(userFriendlyMessage);
  }
};
