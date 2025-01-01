import React, { useEffect, useRef, useState } from "react";
import api from "./api";
import "./common.css"; // Add styles in a separate CSS file

const OAuthRedirect: React.FC = () => {
  const isInitiated = useRef(false);
  const [message, setMessage] = useState("Redirecting to Facebook...");

  useEffect(() => {
    const redirectToOAuth = async () => {
      if (isInitiated.current) return;
      isInitiated.current = true;

      try {
        const facebookCallback = import.meta.env.VITE_REACT_APP_FACEBOOK_CALLBACK || "";
        const redirectUri = encodeURIComponent(facebookCallback);
        const apiVersion = import.meta.env.VITE_REACT_APP_FACEBOOK_API_VERSION || "";
        const pageId = import.meta.env.VITE_REACT_APP_FACEBOOK_FACEBOOK_PAGEID || "";
        const state = `${pageId}|${window.location.origin}`; // Combine pageId and origin with delimiter "|"

        const response = await api.get<{ oauthUrl: string }>(`/InitiateFacebookOAuth`, {
          params: {
            redirectUrl: redirectUri,
            apiVersion: apiVersion,
            state: state,
          },
        });

        // Redirecting to Facebook OAuth
        window.location.href = response.data.oauthUrl;
      } catch (error) {
        console.error("Failed to initiate OAuth:", error);

        // Update the message on error
        setMessage("An error occurred while redirecting. Please try again later.");

        // Optional: Redirect to homepage after a delay
        setTimeout(() => {
          window.location.href = window.location.origin; // Redirect to homepage after error
        }, 3000); // Wait 3 seconds before redirecting
      }
    };

    redirectToOAuth();
  }, []);

  return (
    <div className="fullscreen-overlay">
      <div className="loader-container">
        <div className="loader"></div>
        <p>{message}</p> {/* Display dynamic message */}
      </div>
    </div>
  );
};

export default OAuthRedirect;