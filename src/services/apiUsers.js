import axios from "axios";

const URL_API = 'https://tfm-back-lzqq.onrender.com';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const userServices = {
    getLogin: (userLoginData) => api.post('/user/login', userLoginData),
    registerUser: (userRegisterData) => api.post('/user', userRegisterData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    adminGetUsers: () => api.get('/user', { headers: { 'Content-Type': 'multipart/form-data' } }),
    adminGetExercises: () => api.get('/exercise/admin/all', { headers: { 'Content-Type': 'multipart/form-data' } }),
    adminGetFoods: () => api.get('/food/admin', { headers: { 'Content-Type': 'multipart/form-data' } }),
    updateStatusExercises: (idExercise) =>
        api.put(`/exercise/admin/update/${idExercise}`,
            { status: 'activate' },
            { headers: { 'Content-Type': 'application/json' } }
        ),

    updateStatusFoods: (idFood) =>
        api.put(`/food/admin/update/${idFood}`,
            { status: 'activate' },
            { headers: { 'Content-Type': 'application/json' } }
        ),
    updateUser: (idUser, objUser) =>
        api.put(`/user/${idUser}`,
            objUser,
            { headers: { 'Content-Type': 'application/json' } }
        ),
    deleteUser: (idUser) => api.delete(`/user/${idUser}`, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

export default userServices;