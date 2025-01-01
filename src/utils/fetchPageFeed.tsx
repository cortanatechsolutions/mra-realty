import axios from "axios";
import api from "./api";

const PAGE_ID = import.meta.env.VITE_REACT_APP_FACEBOOK_FACEBOOK_PAGEID || "";
const USER_ACCESS_TOKEN = "userAccessToken"; // actual token is not necessary

// Fields Constants
const POST_FIELDS = "id,message,full_picture";

// Function to fetch Facebook page feed
export const fetchPageFeed = async () => {
  try {
    // Get token from local storage or fetch a new one
    let facebookPageAccessToken = localStorage.getItem("facebookToken");

    if (!facebookPageAccessToken) {
      const tokenResponse = await api.post(
        `/GetFacebookPageAccessToken`,
        null,
        {
          params: {
            pageId: PAGE_ID,
            userAccessToken: USER_ACCESS_TOKEN,
            newToken: false,
          },
        }
      );

      facebookPageAccessToken = tokenResponse.data.accessToken;
      localStorage.setItem("facebookToken", facebookPageAccessToken);
    }

    // Fetch page posts with minimal required fields
    const postsResponse = await axios.get(
      `https://graph.facebook.com/${PAGE_ID}/posts`,
      {
        params: {
          access_token: facebookPageAccessToken,
          fields: POST_FIELDS,
        },
      }
    );

    // Return only the posts
    return {
      posts: postsResponse.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching page feed:", {
      message: error.message,
      response: error.response?.data,
    });
    return { posts: [] };
  }
};
