import axios from "axios";

const start_point = "http://localhost:8000";

export function getIngredients(uID) {
  const vals = { uID };
  return axios.post(start_point + "/getIngredients", vals);
}

export function getIngredientsByFoodID(foodID) {
  const vals = { foodID };
  return axios.post(start_point + "/getIngredientsByFoodID", vals);
}

export function getMealByMealID(mealID) {
  const vals = { mealID };
  return axios.post(start_point + "/getMealByMealID", vals);
}

export function getTotalIngrediantsCount() {
  return axios.post(start_point + "/getAllIngredientsTotalCount");
}

export function getTotalMyIngrediantsCount(uID) {
  const vals = { uID };
  return axios.post(start_point + "/getMyIngredientsTotalCount", vals);
}

export function getTotalMyMealsCount() {
  return axios.post(start_point + "/getMyMealsTotalCount");
}

export function getIngrediantsWithLimit(startIndex, range) {
  const vals = { startIndex, range };
  return axios.post(start_point + "/getIngredientsWithLimit", vals);
}

export function getMyIngrediantsWithLimit(uID, startIndex, range) {
  const vals = { uID, startIndex, range };
  return axios.post(start_point + "/getMyIngredientsWithLimit", vals);
}

export function getMyMealsWithLimit(startIndex, range) {
  const vals = { startIndex, range };
  return axios.post(start_point + "/getMealsWithLimit", vals);
}

export function getMyIngredients(uID, startIndex, range) {
  const vals = { uID, startIndex, range };
  return axios.post(start_point + "/getMyIngredients", vals);
}

export function getMeals(startIndex, range, uID) {
  const vals = { startIndex, range, uID };
  return axios.post(start_point + "/getMealsWithLimit", vals);
}

export function getRowsSearch(tableName, prefix, uID, date) {
  const vals = { tableName, prefix, uID, date };
  return axios.post(start_point + "/getRowsSearch", vals);
}

export function addTrackedIngredient(foodID, uID, date) {
  const vals = { foodID, uID, date };
  return axios.post(start_point + "/addTrackedIngredient", vals);
}

export function addTrackedMeal(mealID, uID, date) {
  const vals = { mealID, uID, date };
  return axios.post(start_point + "/addTrackedMeals", vals);
}

export function getTotalValuesFromMeal(mealID) {
  const vals = { mealID };
  return axios.post(start_point + "/getTotalMealValues", vals);
}

export function addIngred(
  uID,
  name,
  servingSize,
  calories,
  protein,
  carbohydrate,
  sugars,
  totalFat
) {
  const vals = {
    uID: uID,
    name: name,
    servingSize: servingSize,
    calories: calories,
    protein: protein,
    carbohydrate: carbohydrate,
    sugars: sugars,
    totalFat: totalFat,
  };
  console.log("HERE");
  return axios.post(start_point + "/addIngred", vals);
}

export function delIngred(uID, foodID) {
  const vals = {
    uID: uID,
    foodID: foodID,
  };
  return axios.post(start_point + "/delIngred", vals);
}

export function addMeal(mealID, foodID, name, uID, quantity) {
  const vals = {
    mealID: mealID,
    foodID: foodID,
    name: name,
    quantity: quantity,
    uID: uID,
  };
  return axios.post(start_point + "/addMeal", vals);
}

export function delMeal(id, uID) {
  const vals = {
    id: id,
    uID: uID,
  };
  return axios.post(start_point + "/delMeal", vals);
}

export function delMealFromEaten(id, uID) {
  const vals = {
    id: id,
    uID: uID,
  };
  return axios.post(start_point + "/delMealFromEaten", vals);
}

export function delSpecificIngFromEaten(id, uID, date) {
  const vals = {
    id: id,
    uID: uID,
    date: date,
  };
  return axios.post(start_point + "/delSpecificIngFromEaten", vals);
}

export function delSpecificMealFromEaten(id, uID, date) {
  const vals = {
    id: id,
    uID: uID,
    date: date,
  };
  return axios.post(start_point + "/delSpecificMealFromEaten", vals);
}

export function getSizeOfMeals() {
  return axios.post(start_point + "/getSizeOfMeals");
}

export function getNumOfMeal(id, uID, date) {
  const vals = {
    id: id,
    uID: uID,
    date: date,
  };
  return axios.post(start_point + "/getNumOfMeal", vals);
}

export function getNumOfIngredient(id, uID, date) {
  const vals = {
    id: id,
    uID: uID,
    date: date,
  };
  return axios.post(start_point + "/getNumOfIngredient", vals);
}
