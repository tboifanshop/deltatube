import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE || "https://muddy-term-bb0e.szymkowiaknatan22.workers.dev/api";

const options = {
  params: {
    maxResults: "50",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${API_BASE}/${url}`, options);
  return data;
};
