import axios from "axios";

const start_point = "http://localhost:8000";


export function getIngredients() {
    return axios.post(start_point + "/getIngredients");
}

export function getMeals() {
    return axios.post(start_point + "/getMeals");
}