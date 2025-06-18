import Cookies from "universal-cookie";

// Initialize cookie class for do the operations
const cookies = new Cookies(null, { path: '/' });

// Set cookie function with options
export const setCookie = (name, value, options) => {
    cookies.set(name, value, options)
}

// Remove cookie function with name
export const removeCookie = (name) => {
    cookies.remove(name)
}

// Get cookie function with name
export const getCookie = (name) => {
    return cookies.get(name)
}