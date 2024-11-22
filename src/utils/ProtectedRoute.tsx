import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface ProtectedRouteProps {
  children: React.ReactNode; // Components to render when token is valid
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  // Extract token from the query string
  useEffect(() => {
    const validateToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const clientName = params.get('name');

      if (!clientName && !token) {
        setIsValidToken(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/validate-token?name=${clientName}&token=${token}`);
        setIsValidToken(response.data.valid || false);
      } catch (err) {
        console.error("Error validating token:", err);
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [location]);

  // Loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Validating Token...</h1>
      </div>
    );
  }

  // Render access denied message if token is invalid
  if (!isValidToken) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Access Denied</h1>
        <p>The token provided is invalid or missing.</p>
      </div>
    );
  }

  // Render children when token is valid
  return <>{children}</>;
};

export default ProtectedRoute;