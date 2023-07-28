import axios from "axios";

const start_point = "http://localhost:8000";

export function getWeeklyCalorie(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/weeklyCalorie", vals);
}

export function getMonthlyCalorie(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/monthlyCalorie", vals);
}

export function getYearlyCalorie(uID, year) {
  const vals = { uID: uID, year: year };
  return axios.post(start_point + "/yearlyCalorie", vals);
}

export function getcurrentCalories(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/currentCalories", vals);
}

export function getcurrentProtein(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/currentProtein", vals);
}

export function getcurrentCarbohydrate(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/currentCarbohydrate", vals);
}

export function getcurrentTotalFat(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/currentTotalFat", vals);
}

export function addToProgressWithIngredient(foodID, uID, date) {
  const vals = { foodID: foodID, uID: uID, date: date };
  return axios.post(start_point + "/addToProgressWithIngredient", vals);
}

export function removeFromProgressWithIngredient(foodID, uID, date, quantity) {
  const vals = { foodID: foodID, uID: uID, date: date, quantity: quantity };
  return axios.post(start_point + "/removeFromProgressWithIngredient", vals);
}

export function addToProgressWithCustomMeal(mealID, uID, date) {
  const vals = { mealID: mealID, uID: uID, date: date };
  return axios.post(start_point + "/addToProgressWithCustomMeal", vals);
}

export function removeFromProgressWithCustomMeal(mealID, uID, date, quantity) {
  const vals = { mealID: mealID, uID: uID, date: date, quantity: quantity };
  return axios.post(start_point + "/removeFromProgressWithCustomMeal", vals);
}

export function recalculateProgressInfo(uID, date) {
  const vals = { uID: uID, date: date };
  return axios.post(start_point + "/recalculateProgressInfo", vals);
}
