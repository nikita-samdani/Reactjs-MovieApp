import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchMovieByGenre,
} from "../AllFunctions/index";
import { Link } from "react-router-dom";


export function MovieGenreFilter() {
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState();
  const [genreid, setGenreId] = useState(28);


  useEffect(() => {
    const fetchAPI = async () => {
      setMovieByGenre(await fetchMovieByGenre(28));
    };

    fetchAPI();
  }, []);

  // getting genre id from API
  useEffect(() => {
    async function getMoviesGenreData(){
        try{
     const res = await axios.get(`${process.env.React_app_BASE_URL}/genre/movie/list?api_key=${process.env.React_app_API_KEY}`);
    //  console.log(res);
     const genreIdArray = await res.data.genres;
     function myFunction(value){
         if(value.name===moviesGenre){
             return value.id;
         }
         }
         const idValue = genreIdArray.filter(myFunction);
     console.log(idValue);
     setGenreId(idValue[0].id);
    //console.log(idValue[0].id);
        }catch(error){
            console.log(error);
        }
}
    getMoviesGenreData();
     },[moviesGenre])



useEffect(() =>{
  async function handleGenreClick(genre_id){
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };
  handleGenreClick(genreid)
},[genreid])

  const movieList = movieByGenre.map((item, index) => {
    const gettingyear = (id)=>{
      if(id === 385687){return item.year}
      else{return item.year.slice(0,4)}
    }
    return (
        <div className="card" key={index}>   
        <Link to={`/movie/${item.id}`}>
        <img src={item.backPoster} alt={item.title} className="card__img"/>
        </Link>
    <div className="card__info">
    <h3 className="card__title"> {item.title}</h3>
  <span className="card__year">{gettingyear(item.id)}</span>
    </div>
    </div>
    );
  });
  
  return (<>
  <div className="movies_genre_main_div">
        {
    <select name="movies_genre" id="movies_genre" value={moviesGenre} onChange = {(e)=>{setMoviesGenre(e.target.value);}}>
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Animation">Animation</option>
    <option value="Comedy">Comedy</option>
    <option value="Crime">Crime</option>
    <option value="Documentary">Documentary</option>
    <option value="Drama">Drama</option>
    <option value="Family">Family</option>
    <option value="Fantasy">Fantasy</option>
    <option value="History">History</option>
    <option value="Horror">Horror</option>
    <option value="Music">Music</option>
    <option value="Mystery">Mystery</option>
    <option value="Romance">Romance</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="TV Movie">TV Movie</option>
    <option value="Thriller">Thriller</option>
    <option value="War">War</option>
    <option value="Western">Western</option>
  </select>
  }
  </div>  

 <div className= "cards">
    {movieList}
    </div> 
    </>
  );
}
