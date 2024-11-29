import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const FB_APP_ID = import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID;


// Load Facebook SDK dynamically
const loadFacebookSDK = (): Promise<void> => {
  return new Promise((resolve) => {
    if (document.getElementById("facebook-jssdk")) {
      resolve();
      return;
    }
    const js = document.createElement("script");
    js.id = "facebook-jssdk";
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    js.onload = () => resolve();
    const fjs = document.getElementsByTagName("script")[0];
    fjs.parentNode?.insertBefore(js, fjs);
  });
};

const FacebookPageConnect = () => {
  const [isSdkInitialized, setIsSdkInitialized] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [pages, setPages] = useState<{ id: string; name: string }[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const initializeFacebookSDK = async () => {
      await loadFacebookSDK();
      window.FB.init({
        appId: import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID || "",
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
      setIsSdkInitialized(true);
    };
    initializeFacebookSDK();
  }, []);

  const handleLogin = () => {
    if (!isSdkInitialized) {
      setError("Facebook SDK is not yet initialized.");
      return;
    }

    setLoading(true);
    window.FB.login(
      (response: fb.StatusResponse) => {
        setLoading(false);
        if (response.authResponse) {
          setUserAccessToken(response.authResponse.accessToken);
          fetchPages(response.authResponse.accessToken);
        } else {
          setError("Facebook login failed.");
        }
      },
      { scope: "email,public_profile,pages_show_list,pages_read_engagement" }
    );
  };

  const fetchPages = (accessToken: string) => {
    window.FB.api(
      "/me/accounts",
      "get", // Change "GET" to "get"
      { access_token: accessToken },
      (response: any) => {
        if (response && !response.error) {
          const pagesData = response.data.map((page: any) => ({
            id: page.id,
            name: page.name,
          }));
          setPages(pagesData);
        } else {
          setError("Failed to fetch pages. Please try again.");
        }
      }
    );    
  };

  const saveIntegration = async () => {
    if (!userAccessToken || !selectedPageId) {
      setError("Access token and page selection are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/SaveFbIntegration`, {
        userAccessToken,
        pageId: selectedPageId,
      });
      if (response.data.success) {
        setIsConnected(true);
        setError(null);
      } else {
        setError("Failed to save integration. Please try again.");
      }
    } catch (err) {
      setError("Error saving integration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          {pages.length > 0 ? (
            <div>
              <label>Select a Page:</label>
              <select
                onChange={(e) => setSelectedPageId(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              >
                <option value="">Select a page</option>
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.name}
                  </option>
                ))}
              </select>
              <button
                onClick={saveIntegration}
                className="bg-green-600 text-white py-2 px-4 rounded"
                disabled={loading || isConnected}
              >
                {loading
                  ? "Saving..."
                  : isConnected
                  ? "Integration Saved!"
                  : "Save Integration"}
              </button>
            </div>
          ) : (
            <p>Loading pages...</p>
          )}
        </div>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

