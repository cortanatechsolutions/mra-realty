// src/components/Log.tsx

import React from "react";

// Define the Log component
const Log: React.FC<{ message: string; level?: "info" | "warn" | "error" }> = ({
  message,
  level = "info",
}) => {
  // Determine the log level and apply corresponding styling
  const logStyles: { [key: string]: string } = {
    info: "text-blue-500",
    warn: "text-yellow-500",
    error: "text-red-500",
  };

  // Apply appropriate styling based on log level
  const logClass = logStyles[level] || logStyles["info"];

  return (
    <div className={`p-2 ${logClass}`}>
      <p>{String(message)}</p> {/* Ensure the message is a string */}
    </div>
  );
};

export default Log;
