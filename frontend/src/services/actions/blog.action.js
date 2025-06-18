import axios from "@/config/axios";
import { GET_ALL_BLOGS, GET_BLOG_DETAILS, LOGIN_USER, LOGOUT_URL } from "@/utils/constants";
import { BLOG_CONSTANTS } from "../constants/blog.constants";

export const FetchBlogListAction = (data, dispatch) => {
    dispatch({ type: BLOG_CONSTANTS.FETCH_BLOG_REQUEST })
    axios.get(GET_ALL_BLOGS, { params: data }).then((response) => {
        if (response.data.success) {
            dispatch({ type: BLOG_CONSTANTS.FETCH_BLOG_SUCCESS, blogs: response.data.data, pagination: response.data.pagination });
        } else {
            dispatch({ type: BLOG_CONSTANTS.FETCH_BLOG_FAILURE, payload: { message: response.data.message, error: response.data } });
        }
    }).catch((error) => {
        if (error.response) {
            dispatch({ type: BLOG_CONSTANTS.FETCH_BLOG_FAILURE, payload: { message: error.response.data.message, error: error.response.data.errors || error.response.data } });
        } else {
            dispatch({ type: BLOG_CONSTANTS.FETCH_BLOG_FAILURE, payload: { error: error.stack, message: error.message } });
        }
    })
}

export const FetchBlogDetailsAction = (data, dispatch) => {
    dispatch({ type: BLOG_CONSTANTS.DETAILS_BLOG_REQUEST })
    axios.get(GET_BLOG_DETAILS(data)).then((response) => {
        if (response.data.success) {
            dispatch({ type: BLOG_CONSTANTS.DETAILS_BLOG_SUCCESS, blog: response.data.data });
        } else {
            dispatch({ type: BLOG_CONSTANTS.DETAILS_BLOG_FAILURE, payload: { message: response.data.message, error: response.data } });
        }
    }).catch((error) => {
        if (error.response) {
            dispatch({ type: BLOG_CONSTANTS.DETAILS_BLOG_FAILURE, payload: { message: error.response.data.message, error: error.response.data.errors || error.response.data } });
        } else {
            dispatch({ type: BLOG_CONSTANTS.DETAILS_BLOG_FAILURE, payload: { error: error.stack, message: error.message } });
        }
    })
}
