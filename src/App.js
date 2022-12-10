import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import bg from "./assets/images/rectangle_5.png";

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  const apiKey = process.env.REACT_APP_SECRET_CODE || '';

  const fetchData = async () => {
     await axios
      .get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${search}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    fetchData();
    return () => console.log("clean up");
  }, [search]);

  return (
    <div className="App">
      <div className="navbar">MyTestApp</div>
      <div
        className="bg"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="title">
          <div className="text">Watch something incredible.</div>
          </div>
      </div>
      <div className="search">
        <TextField
          fullWidth
          type="search"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="movie_list">
        <div className="category">
         {data && data?.Genre?.split(',')[0]}
        </div>
        {data && <img src={data.Poster} alt={data.Title}/>}
      </div>
    </div>
  );
}

export default App;
