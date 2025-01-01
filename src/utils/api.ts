import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_FACEBOOK_API_INTEGRATION_URL || "";

const api = axios.create({
  baseURL: API_URL
});

export default api;