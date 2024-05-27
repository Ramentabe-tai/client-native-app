import axios from "axios";
const baseUrl = "https://reactnative.dev/movies.json";

// Passing configuration object to axios
export const fetchData = async () => {
  const configs = {
    method: "get",
    url: `${baseUrl}/`,
  };
  const response = await axios(configs);
  return response.data as Promise<any>;
};
