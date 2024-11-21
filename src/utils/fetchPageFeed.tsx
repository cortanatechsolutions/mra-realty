import axios from "axios";

const PAGE_ID = "161490932676778";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Base URL for your email service

// Function to fetch Facebook page feed
export const fetchPageFeed = async () => {
  try {
    var facebookPageAccessToken = localStorage.getItem("facebookToken");
    if (facebookPageAccessToken == undefined) {
      const facebookPageAccessTokenResponse = await axios.post(
        `${API_URL}/getFacebookToken`
      );

      localStorage.setItem(
        "facebookToken",
        facebookPageAccessTokenResponse.data.accessToken
      );
      facebookPageAccessToken =
        facebookPageAccessTokenResponse.data.accessToken;
    }

    // Fetch page profile picture
    const pageInfoResponse = await axios.get(
      `https://graph.facebook.com/${PAGE_ID}`,
      {
        params: {
          access_token: facebookPageAccessToken,
          fields: "picture{url},name,link", // Request page profile picture URL, name, and link
        },
      }
    );

    // Fetch page posts
    const postsResponse = await axios.get(
      `https://graph.facebook.com/${PAGE_ID}/posts`,
      {
        params: {
          access_token: facebookPageAccessToken,
          fields:
            "id,message,created_time,picture,full_picture,attachments{media_type,media},reactions.summary(total_count),comments.summary(total_count),shares,video_tags,videos{source,description,thumbnails}",
        },
      }
    );

    // Combine data
    return {
      profilePictureUrl: pageInfoResponse.data.picture.data.url,
      pageName: pageInfoResponse.data.name,
      pageUrl: pageInfoResponse.data.link, // Include the page URL
      posts: postsResponse.data.data,
    };
  } catch (error) {
    console.error("Error fetching page feed:", error);
    return { profilePictureUrl: "", pageName: "", pageUrl: "", posts: [] }; // Include pageUrl in error case
  }
};
