import axios from "axios";

const URL_API = 'http://localhost:3000';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

const userServices = {
    getLogin: (userLoginData) => api.post('/user/login', userLoginData)
}

export default userServices;