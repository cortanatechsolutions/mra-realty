import api from "./api";

const PAGE_ID = import.meta.env.VITE_REACT_APP_FACEBOOK_FACEBOOK_PAGEID || "";
const POST_LIMIT = import.meta.env.VITE_REACT_APP_FACEBOOK_POST_LIMIT || 15;

// Fields Constants
const POST_FIELDS = "id,message,full_picture";

// Function to fetch Facebook page feed
export const fetchPageFeed = async () => {
  try {
    const fetchPosts = await api.get(`/GetFacebookPagePosts`, 
      {
      params: { 
        pageId: PAGE_ID,
        postFields: POST_FIELDS,
        limit: POST_LIMIT
      },
    });    

    // Return only the posts
    return {
      posts: fetchPosts.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching page feed:", {
      message: error.message,
      response: error.response?.data,
    });
    return { posts: [] };
  }
};
