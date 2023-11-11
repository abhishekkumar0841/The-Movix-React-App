import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

console.log('HEADERS:', headers)

export const fetchDataFromApi = async (url, params) => {
  console.log('URL:', url)
  console.log('PARAMS:', params)
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers,
      params: params,
    });
    console.log("DATA GET SUCCESS:", data);
    return data;
  } catch (error) {
    console.log("ERROR WHILE FETCHING DATA FROM API");
    console.log("Error:", error);
    return error;
  }
};
