import React, { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import {useDispatch, useSelector} from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice";

const App = () => {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)
  console.log('URLLLLL:', url)

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular")
      .then((data) => {
        console.log("Data:", data)
        const result = dispatch(getApiConfiguration(data))
        console.log('dispatched:', result)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    apiTesting();
  }, []);
  return <div>app</div>;
};

export default App;
