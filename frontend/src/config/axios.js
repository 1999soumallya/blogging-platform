import { getCookie, removeCookie } from "@/utils/cookies";
import Axios from "axios";

// Base URL for API requests
const axios = Axios.create({ baseURL: import.meta.env.VITE_APP_API_URL + '/api' })

// Add token to headers for authenticated requests
axios.interceptors.request.use((config) => {
    const token = getCookie('auth_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return config
}, (error) => {
    Promise.reject(error)
})

// Handle response errors 401 Unauthorized and remove token from cookies and reload the page
axios.interceptors.response.use(response => {
    return response
}, (error) => {
    if (error.response?.status == 401) {
        removeCookie('auth_token')
        window.location.reload()
    }
    return Promise.reject(error)
})

export default axios