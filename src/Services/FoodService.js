import axios from "axios";

const start_point = "http://localhost:8000";


export function getIngredients(uID) {
    const vals = {uID};
    return axios.post(start_point + "/getIngredients", vals);
}

export function getMeals() {
    return axios.post(start_point + "/getMeals");
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
    }
    console.log("HERE");
    return axios.post(start_point + "/addIngred", vals);
}

export function delIngred(uID, foodID) {
    const vals = {
        uID: uID,
        foodID: foodID,
    }
    return axios.post(start_point + "/delIngred", vals);
}