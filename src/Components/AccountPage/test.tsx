import React, { useState, useEffect } from "react";
import * as AccountService from "../../Services/AccountService";

const Test = () => {
  const [message, setMessage] = useState("Please wait, querying");

  function register() {
    AccountService.registerAccount(
      "Admin",
      "Admin",
      "Account",
      "admin1",
      "admin12",
      "admin1FoodTrackermail.com",
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  return (
    <div className="App">
      <button onClick={register}>{message}</button>
    </div>
  );
};

export default Test;
