import axios from "axios";

const start_point = "http://localhost:8000";

export function registerAccount(
  accountType,
  firstName,
  lastName,
  username,
  email,
  password,
  age,
  gender,
  weight,
  height,
  desiredWeight,
  caloricGoal
) {
  const vals = {
    accountType: accountType,
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    age: age,
    gender: gender,
    weight: weight,
    height: height,
    desiredWeight: desiredWeight,
    caloricGoal: caloricGoal,
  };
  return axios.post(start_point + "/register", vals);
}

export function loginAccount(username, password) {
  const vals = {
    username: username,
    password: password,
  };
  return axios.post(start_point + "/login", vals);
}

export function authAccount(username, email) {
  const vals = {
    username: username,
    email: email,
  };
  return axios.post(start_point + "/authUser", vals);
}

export function deleteAccount(uID) {
  const vals = {
    uID: uID,
  };
  return axios.post(start_point + "/delete", vals);
}

export function updateAccount(
  uID,
  accountType,
  firstName,
  lastName,
  username,
  email,
  password,
  age,
  gender,
  weight,
  height,
  desiredWeight,
  caloricGoal
) {
  const vals = {
    uID: uID,
    accountType: accountType,
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    age: age,
    gender: gender,
    weight: weight,
    height: height,
    desiredWeight: desiredWeight,
    caloricGoal: caloricGoal,
  };
  return axios.post(start_point + "/update", vals);
}
