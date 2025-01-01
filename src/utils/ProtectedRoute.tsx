import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";
import "./common.css";

const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;

interface ProtectedRouteProps {
  children: React.ReactNode; // Components to render when token is valid
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract token from the query string
  useEffect(() => {
    const validateToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        setIsValidToken(false);
        setError("Missing or invalid token.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/ValidateFacebookToken?name=${APP_NAME}&token=${token}`);
        setIsValidToken(response.data.valid || false);
      } catch (err) {
        console.error("Error validating token:", err);
        setError("Unable to validate token. Please try again.");
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [location]);

  useEffect(() => {
    if (!isLoading && !isValidToken) {
      // Redirect to the home page after a brief delay
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000); // 3 seconds delay
    }
  }, [isLoading, isValidToken, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="fullscreen-overlay">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Validating your access...</p>
        </div>
      </div>
    );
  }

  // Render access denied message if token is invalid
  if (!isValidToken) {
    return (
      <div className="fullscreen-overlay">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h1>Access Denied</h1>
          <p>{error || "Unable to proceed. Redirecting to the home page..."}</p>
        </div>
      </div>
    );
  }

  // Render children when token is valid
  return <>{children}</>;
};

export default ProtectedRoute;