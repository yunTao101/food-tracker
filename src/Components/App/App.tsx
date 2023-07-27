import React, { useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../AccountPage/Login";
import Register from "../AccountPage/Register";
import SearchFoods from "../TrackFoods/SearchFoods";
import AddIngredient from "../TrackFoods/AddIngredient";
import Home from "../Home/Home";
import AccountInfo from "../AccountPage/AccountInfo";
import ShoppingCart from "../Cart/ShoppingCart";
import Progress from "../Progress/Progress";
import Context from "../../store/context";
import TrackedFoods from "../TrackedFoods/TrackedFoods";

const App = () => {
  const { actions } = useContext<any>(Context);

  useEffect(() => {
    actions({
      type: "setUserInfo",
      payload: JSON.parse(sessionStorage.getItem("userInfo")!!),
    });

    actions({
      type: "setDate",
      payload: JSON.parse(sessionStorage.getItem("date")!!),
    });
    actions({
      type: "setCart",
      payload: JSON.parse(sessionStorage.getItem("cart")!!),
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/searchFoods" element={<SearchFoods />}></Route>
          <Route path="/addIngredient" element={<AddIngredient />}></Route>
          <Route path="/accountInfo" element={<AccountInfo />}></Route>
          <Route path="/homePage" element={<Home />}></Route>
          <Route path="/cart" element={<ShoppingCart />}></Route>
          <Route path="/trackedFoods" element={<TrackedFoods />}></Route>
          <Route path="/progressView" element={<Progress />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
