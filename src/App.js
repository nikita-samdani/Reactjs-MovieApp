import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { MovieGenreFilter } from "./components/MovieGenreFilter";
import { MovieListCard } from "./components/MovieListCard";
import Header from "./components/Header";
import Footer from "./components/Footer"

export function App() {
  return (
    <>
    <Header/>
      <Switch>
        <Route exact path="/" component={MovieGenreFilter} />
        <Route path="/movie/:id" component={MovieListCard} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
