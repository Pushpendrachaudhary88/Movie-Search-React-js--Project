import Result from "./components/Result";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=20";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const changeTheSearch = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  }

  const getAllMovies = () => {
    axios.get(APIURL)
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search)
    axios.get(
      SEARCHAPI + search
    )
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => { 
          console.log(error);
        }
      )
  }

  useEffect(
    () => {
      setMovies([]);
      // console.log("Hello");
      if (search === "") {
        getAllMovies();
      } else {
        getSearchedMovies();
      }
    },
    [search]
  )

  return (
    <div className="max-w-[1520px] shadow-xl min-h-[1000px] mx-auto p-3" id="app">
      <h1 className="heading">Search Movies</h1>
      <input type="search" value={search} onChange={changeTheSearch} className="w-full border border-black rounded text-slate-700 p-4 bg-stone-300 rounded-3xl outline-none" placeholder="Search Movies" />
      {
        movies.length === 0
          ?
          <div className="text-3xl text-center mt-2 text-white"> Loading... </div>
          :
          <Result movies={movies} />

      }
    </div>
  );
}

export default App;