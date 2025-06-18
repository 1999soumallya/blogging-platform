// Define all API endpoints here
export const GET_USER_DETAILS = '/auth'
export const LOGIN_USER = '/auth/login'
export const LOGOUT_URL = '/auth/logout'
export const REGISTRATION_URL = '/auth/register'

export const CREATE_BLOG = '/blog/create'
export const UPDATE_BLOG = (id) => `/blog/update/${id}`
export const DELETE_BLOG = (id) => `/blog/delete/${id}`
export const GET_ALL_BLOGS = '/blog/get-all'
export const GET_BLOG_DETAILS = (id) => `/blog/get-details/${id}`