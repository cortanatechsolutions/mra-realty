import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "";
const FB_APP_ID = import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID || "";
const CLIENT_SECRET = import.meta.env.VITE_REACT_APP_FACEBOOK_CLIENT_SECRET || "";
const RETURN_URI = "https://mra-realty.com/facebook/callback/";

// Load Facebook SDK dynamically
const loadFacebookSDK = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.getElementById("facebook-jssdk")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

interface Page {
  id: string;
  name: string;
  access_token: string;
}

const FacebookPageConnect = () => {
  const [isSdkInitialized, setIsSdkInitialized] = useState(false);
  const [fbCode, setFbCode] = useState<string | null>(null);
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const initializeFacebookSDK = async () => {
      try {
        await loadFacebookSDK();
        window.FB.init({
          appId: FB_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v16.0",
        });
        setIsSdkInitialized(true);
      } catch (err) {
        setError("Failed to initialize Facebook SDK.");
      }
    };
    initializeFacebookSDK();
  }, []);

  const handleLogin = () => {
    if (!isSdkInitialized) {
      setError("Facebook SDK is not initialized.");
      return;
    }

    setLoading(true);
    window.FB.login(
      (response) => {
        console.log(response);
        if (response.authResponse) {
          const fbCode = response.authResponse.code;
          setFbCode(fbCode);
          fetchAccessToken(fbCode); // Fetch access token
        } else {
          setError("Facebook login failed. Please try again.");
        }
      },
      { 
        config_id: "954052476587085", 
        response_type: "code",
        override_default_response_type: true
      }
    );
  };

// Fetch Access Token from the authorization code
const fetchAccessToken = async (code: string) => {
  try {
    setLoading(true);
    const url = `https://graph.facebook.com/v21.0/oauth/access_token?` +
      `client_id=${FB_APP_ID}&redirect_uri=${RETURN_URI}&client_secret=${CLIENT_SECRET}&code=${code}`;

    const response = await axios.get(url);
    if (response.data && response.data.access_token) {
      const accessToken = response.data.access_token;
      setUserAccessToken(accessToken);
      fetchAndSaveFirstPage(accessToken); // After getting the access token, fetch pages
    } else {
      setError("Failed to exchange authorization code for access token.");
    }
  } catch (error) {
    setError("1 Failed to exchange authorization code for access token.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const fetchAndSaveFirstPage = async (accessToken: string) => {
    try {
      setLoading(true);
      window.FB.api(
        "/me/accounts",
        "get",
        { access_token: accessToken },
        async (response: any) => {
          if (response && !response.error) {
            const pages = response;

            console.log(`Page data: ${pages}`);
            if (pages.length > 0) {
              const firstPage = pages[0];
              const { id: pageId, name, access_token: pageAccessToken } = firstPage;

              // Log Page ID and Name
              console.log(`Page ID: ${pageId}`);
              console.log(`Page Name: ${name}`);

              // Automatically save the integration for the first page
              await saveIntegration(pageAccessToken, pageId, name);
            } else {
              setError("No pages found for this account.");
            }
          } else {
            throw new Error(response.error.message || "Failed to fetch pages.");
          }
        }
      );
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching pages.");
    } finally {
      setLoading(false);
    }
  };

  const saveIntegration = async (
    pageAccessToken: string,
    pageId: string,
    pageName: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}/SaveFbIntegration`, {
        pageAccessToken,
        pageId,
        pageName,
      });
      if (response.data.success) {
        setIsConnected(true);
        setError(null);
      } else {
        throw new Error(response.data.message || "Failed to save integration.");
      }
    } catch (err: any) {
      setError(err.message || "Error saving integration. Please try again.");
    }
  };

  return (
    <div className="facebook-page-connect">
      {!userAccessToken ? (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Facebook"}
        </button>
      ) : (
        <div>
          {isConnected ? (
            <p className="text-green-600 mt-2">Integration saved successfully!</p>
          ) : (
            <p>Connecting to Facebook...</p>
          )}
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default FacebookPageConnect;
