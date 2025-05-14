import axios from "axios";

const URL_API = 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const objServices = {
    getExercises: (muscle) => api.get(`/exercise/${muscle}`),
    getFoods: () => api.get(`/food`)
}

export default objServices;