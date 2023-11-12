import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading("Loading...");
    setData(null);
    setError("");

    fetchDataFromApi(url)
      .then((res) => {
        console.log("RES IN USE_FETCH:", res);
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setError("Something Went Wrong");
        console.log("ERROR useFetch.js");
        console.log(err);
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
