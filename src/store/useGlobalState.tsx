import { useState } from "react";

const useGlobalState = () => {
  const [state, setState] = useState({
    value: "Global state value!",
  });

  const actions = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "setState":
        return setState(payload);
      default:
        return state;
    }
  };
  return { state, actions };
};

export default useGlobalState;
