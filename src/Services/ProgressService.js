import axios from "axios";

const start_point = "http://localhost:8000"; 


export function getWeeklyCalorie(uID, date) {
    const vals = {uID: uID, date: date};
    return axios.post(start_point + "/weeklyCalorie", vals);
}
