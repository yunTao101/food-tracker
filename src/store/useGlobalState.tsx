import { useState } from "react";

const useGlobalState = () => {
  const [userInfoState, setUserInfoState] = useState("UserInfo");

  const actions = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "setUserInfo":
        sessionStorage.setItem("userInfo", JSON.stringify(payload));
        return setUserInfoState(payload);
      case "setCart":
        sessionStorage.setItem("payload", JSON.stringify(payload));
        return setUserInfoState(payload);
      default:
        return setUserInfoState;
    }
  };
  return { userInfoState, actions };
};

export default useGlobalState;
