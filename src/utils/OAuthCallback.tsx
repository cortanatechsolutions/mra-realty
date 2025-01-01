import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "./api";
import "./common.css";

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const redirectAfterFailure = () => {
      setTimeout(() => {
        window.location.href = state || window.location.origin; // Redirect to the provided state or fallback origin
      }, 5000); // Wait 5 seconds before redirecting
    };

    if (error) {
      // Handle errors passed in the callback URL
      setErrorMessage(decodeURIComponent(errorDescription || "An unknown error occurred."));
      redirectAfterFailure();
      return;
    }

    const handleCallback = async () => {
      if (code) {
        setStatusMessage("Verifying your Facebook account...");
        try {
          const redirectUri = encodeURIComponent(window.location.origin + "/facebook-callback");
          const apiVersion = import.meta.env.VITE_REACT_APP_FACEBOOK_API_VERSION || "";

          const response = await api.get<{ accessToken: string }>("/HandleFacebookOAuthCallback", {
            params: {
              code: code,
              redirectUrl: redirectUri,
              apiVersion: apiVersion,
            },
          });

          setStatusMessage("Retrieving your page access token...");
          getPageAccessToken(response.data.accessToken);
        } catch (error) {
          console.error("Error handling OAuth callback:", error);
          setErrorMessage("We encountered an issue while verifying your account. Please try again.");
          redirectAfterFailure();
        }
      }
    };

    const getPageAccessToken = async (userAccessToken: string) => {
      if (userAccessToken) {
        const pageId = import.meta.env.VITE_REACT_APP_FACEBOOK_FACEBOOK_PAGEID || "";
        try {
          const response = await api.post<{ accessToken: string }>(
            `/GetFacebookPageAccessToken`,
            null,
            {
              params: {
                pageId: pageId,
                userAccessToken: userAccessToken,
                newToken: true
              },
            }
          );
          localStorage.setItem("facebookToken", response.data.accessToken);
          setStatusMessage("Successfully connected to your Facebook page! Redirecting...");
          setTimeout(() => {
            window.location.href = state || window.location.origin; // Redirect to the provided state or origin
          }, 2000);
        } catch (error) {
          console.error("Error retrieving page access token:", error);
          setErrorMessage("Unable to retrieve page access token. Please try again later.");
          redirectAfterFailure();
        }
      }
    };

    handleCallback();
  }, [code, state, error, errorDescription]);

  return (
    <div className="fullscreen-overlay">
      <div className="loader-container">
        {errorMessage ? (
          <>
            <div className="error-icon">⚠️</div>
            <p className="error-message">{errorMessage}</p>
            <p className="redirecting-message">You will be redirected shortly...</p>
          </>
        ) : (
          <>
            <div className="loader"></div>
            <p>{statusMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;