import { useState } from "react";

const useGlobalState = () => {
  const [userInfoState, setUserInfoState] = useState("UserInfo");
  const [cartState, setCartState] = useState("Cart");

  const actions = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "setUserInfo":
        sessionStorage.setItem("userInfo", JSON.stringify(payload));
        return setUserInfoState(payload);
      case "setCart":
        sessionStorage.setItem("cart", JSON.stringify(payload));
        return setCartState(payload);
      default:
        return setUserInfoState;
    }
  };
  return { userInfoState, cartState, actions };
};

export default useGlobalState;
