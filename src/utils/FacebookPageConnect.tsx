import { useState } from "react";
import FacebookLogin from "react-facebook-login-lite";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const FB_APP_ID = import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID;

const FacebookPageConnect = () => {
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [facebookPages, setFacebookPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPageConnected, setIsPageConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Facebook Login Success handler
  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      setUserAccessToken(response.accessToken);
      await fetchFacebookPages(response.accessToken);
    } else {
      setError("Facebook login failed. Please try again.");
    }
  };

  // Fetch Facebook Pages for the logged-in user
  const fetchFacebookPages = async (accessToken: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
      );
      if (response.data && response.data.data) {
        setFacebookPages(response.data.data);
      } else {
        setError("No pages found for this user.");
      }
    } catch (err) {
      setError("Error fetching pages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Connect selected page to your service
  const connectToService = async () => {
    if (!selectedPage) {
      setError("Please select a page to connect.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/GetPageAccessToken`, {
        pageId: selectedPage.id,
        userAccessToken,
      });
      if (response.data.success) {
        setIsPageConnected(true);
        setError(null); // Clear any previous error messages
      } else {
        setError("Error connecting the page to the service.");
      }
    } catch (err) {
      setError("Error connecting the page. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div id="Home" className="overflow-hidden py-10 sm:py-8">
        <img
          alt=""
          src={`/images/web-banner.jpg`}
          className="absolute inset-0 -z-10 h-full w-full object-cover sm:object-center"
        />
        <div className="max-w-sm pb-16 sm:max-w-6xl sm:pb-24 lg:pb-52 xl:pb-96">
          <div className="pl-16 sm:pl-24 lg:pl-36 sm:pr-8 sm:pt-28">
            <div className="sm:max-w-5xl">
              <div className="text-left">
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-8xl">
                  Connect Your Facebook Page
                </h1>
                {error && (
                  <p className="sm:max-w-2xl mt-6 font-regular text-sm sm:text-lg lg:text-lg leading-8 text-white">
                    {error}
                  </p>
                )}

                {!userAccessToken ? (
                  <div className="facebook-login">
                    <FacebookLogin
                      appId={FB_APP_ID}
                      onSuccess={responseFacebook}
                      onFailure={() => setError("Facebook login failed. Please try again.")}
                      btnText="Login with Facebook"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl text-white">Select a Facebook Page to Connect:</h2>
                    {loading ? (
                      <p className="text-white">Loading your pages...</p>
                    ) : (
                      <div>
                        <select
                          onChange={(e) =>
                            setSelectedPage(
                              facebookPages.find((page) => page.id === e.target.value)
                            )
                          }
                          defaultValue=""
                          className="w-full p-2 mt-4 mb-4 rounded-md"
                        >
                          <option value="" disabled>
                            Select a page
                          </option>
                          {facebookPages.map((page) => (
                            <option key={page.id} value={page.id}>
                              {page.name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={connectToService}
                          disabled={!selectedPage || loading}
                          className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                        >
                          {loading ? "Connecting..." : isPageConnected ? "Page Connected!" : "Connect to Service"}
                        </button>

                        {isPageConnected && <p className="mt-4 text-white">Page connected successfully!</p>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookPageConnect;
