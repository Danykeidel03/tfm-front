import axios from "axios";

const URL_API = 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const userServices = {
    getLogin: (userLoginData) => api.post('/user/login', userLoginData),
    registerUser: (userRegisterData) => api.post('/user', userRegisterData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export default userServices;