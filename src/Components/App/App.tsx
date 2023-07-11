import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../AccountPage/Login";
import Register from "../AccountPage/Register";
import HomePage from "../Home/HomePage";
import SearchFoods from "../TrackFoods/SearchFoods";
import AddIngredient from "../TrackFoods/AddIngredient";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/homePage" element={<HomePage />}></Route>
          <Route path="/foodPage" element={<SearchFoods />}></Route>
          <Route path="/addIngredient" element={<AddIngredient />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
