import React, { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Error from "./pages/Error/Error";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Details";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log("URLLLLL:", url);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        console.log("Url:", res);

        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
        };

        const result = dispatch(getApiConfiguration(url));
        console.log("dispatched:", result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    // console.log("promises:", promises);

    const data = await Promise.all(promises);
    // console.log("data of promises:", data);

    data.map(({genres})=>{
      return genres.map((item)=> (allGenres[item.id] = item))
    })
    // console.log('all genres:', allGenres);
    dispatch(getGenres(allGenres))
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
