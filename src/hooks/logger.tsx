// src/utils/logger.tsx

import React from "react";
import ReactDOM from "react-dom";
import Log from "../components/core/Log";

// Function to log messages
export const logMessage = (
  message: string | Error,
  level: "info" | "warn" | "error" = "info"
) => {
  if (import.meta.env.NODE_ENV !== "development") return; // Skip logging in production

  // Convert the message to a string if it's an Error object
  const messageString =
    message instanceof Error ? message.message : String(message);

  // Create a new div for the log message
  const logContainer = document.createElement("div");
  document.body.appendChild(logContainer);

  // Render the Log component with the message
  ReactDOM.render(<Log message={messageString} level={level} />, logContainer);

  // Remove the log container after a short delay to clean up
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(logContainer);
    document.body.removeChild(logContainer);
  }, 5000);
};
