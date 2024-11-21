import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="relative flex justify-center bg-blue-900 items-center h-screen">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-theme-royalBlue"></div>

      {/* Logo centered on spinner */}
      <div className="absolute flex justify-center items-center">
        <img alt="Default Logo" src={`/default-logo.svg`} className="h-8" />
      </div>
    </div>
  );
};

export default Loading;
