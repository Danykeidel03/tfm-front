import axios from "axios";

const URL_API = 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const objServices = {
    getExercises: (muscle) => api.get(`/exercise/${muscle}`),
    getFoods: () => api.get(`/food`),
    newExercise: (userExerciseData) => api.post('/exercise', userExerciseData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    newFood: (userFoodData) => api.post('/food', userFoodData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    endRoutine: (calories) => api.post('/calories', calories)
}

export default objServices;