import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
} from "../AllFunctions/index";


export function MovieListCard({ match }) {
  let params = match.params;
  let genres = [];
  let pcName = [];

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
    };
    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  pcName= detail.production_companies;
  let productionCompanies;
  if (pcName) {
  productionCompanies = pcName.map((val,ind)=>{
    return (
        <li className="list-inline-item" key={ind}>
        <button type="button" className="btn btn-outline-info">
            {val.name}
            </button>
        </li>
      );
  } )
}

  return (
<>
<div className="main-div">
    <div className="movie-card-container">
    
    <div className="image-container">
    <div className="bg-image" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w500/${detail.poster_path})` }}>
    </div>
    </div>
    
    <div className="movie-info">
        <h2>Movie Details</h2>
        <div>
        <h1>{detail.title}</h1>
            <small>Released Date: {detail.release_date}</small>
            </div>

        <h4>Movie Genre</h4>
        <ul className="list-inline">{genresList}</ul>
        
        <h4>Movie Overview</h4>
         <div>{detail.overview}</div>  
        
         <h4>Production Companies</h4>
        <ul className="list-inline">{productionCompanies}</ul>
        
                
      
    </div>
    </div>
    </div>
</>

     );
}

export default MovieListCard;
