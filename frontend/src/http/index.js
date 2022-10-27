import axios from "axios";

const api = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers : {
        "Content" : 'application/json',
        'Accept' : "application/json",
    },

})

//list of all endpoints
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);

export default api;