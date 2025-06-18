import { BLOG_CONSTANTS } from "../constants/blog.constants"

export const BLOG_LIST_INIT = {
    loading: false,
    hasMore: true,
    blogs: [],
    pagination: null
}

export const BlogListReducer = (state = BLOG_LIST_INIT, action) => {
    switch (action.type) {
        case BLOG_CONSTANTS.FETCH_BLOG_REQUEST:
            return { ...state, loading: true, message: null }
        case BLOG_CONSTANTS.FETCH_BLOG_SUCCESS:
            return {
                loading: false,
                hasMore: (action.pagination.totalPage > action.pagination.page) ? true : false,
                blogs: [...state.blogs, ...action.blogs],
                pagination: action.pagination
            }
        case BLOG_CONSTANTS.FETCH_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
        case BLOG_CONSTANTS.ADD_NEW_BLOG:
            return {
                ...state,
                blogs: [...state.blogs, action.payload]
            }
        case BLOG_CONSTANTS.UPDATE_BLOG:
            return {
                ...state,
                blogs: state.blogs.map((element) => {
                    if (element._id == action.payload._id) {
                        return action.payload
                    }
                    return element
                })
            }
        case BLOG_CONSTANTS.REMOVE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter((element) => element._id != action.payload)
            }
        default:
            return state;
    }
}


export const BLOG_DETAILS_INIT = {
    loading: false,
    blog: null
}

export const BlogDetailsReducer = (state = BLOG_DETAILS_INIT, action) => {
    switch (action.type) {
        case BLOG_CONSTANTS.DETAILS_BLOG_REQUEST:
            return { loading: true }
        case BLOG_CONSTANTS.DETAILS_BLOG_SUCCESS:
            return { loading: false, blog: action.blog }
        case BLOG_CONSTANTS.DETAILS_BLOG_FAILURE:
            return { loading: false, message: action.payload.message, error: action.payload.error }
        default:
            return state;
    }
}