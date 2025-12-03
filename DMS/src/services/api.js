import axios from "axios";

const api = axios.create({
  import:meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default api;
