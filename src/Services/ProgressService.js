import axios from "axios";

const start_point = "http://localhost:8000"; 


export function getWeeklyCalorie(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/weeklyCalorie", vals);
}

export function getMonthlyCalorie(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/monthlyCalorie", vals);
}

export function getYearlyCalorie(uID, year) {
    const vals = {uID: uID, year: year};
    return axios.post(start_point + "/yearlyCalorie", vals);
}

export function getcurrentCalories(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/currentCalories", vals);
}

export function getcurrentProtein(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/currentProtein", vals);
}

export function getcurrentCarbohydrate(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/currentCarbohydrate", vals);
}

export function getcurrentTotalFat(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/currentTotalFat", vals);
}