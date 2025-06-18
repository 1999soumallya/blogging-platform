import { getCookie } from "@/utils/cookies"
import { USER_LOGIN, USER_LOGOUT } from "../constants/auth.constant"

const LOGIN_INIT = {
    loading: false,
    message: null,
    token: getCookie('auth_token') ? getCookie('auth_token') : null,
}

export const UserLoginReducer = (state = LOGIN_INIT, action) => {
    switch (action.type) {
        case USER_LOGIN.USER_LOGIN_REQUEST:
            return { loading: true, message: null }
        case USER_LOGIN.USER_LOGIN_SUCCESS:
            return { loading: false, message: action.payload.message, token: action.payload.token }
        case USER_LOGIN.USER_LOGIN_FAIL:
            return { loading: false, message: action.payload.message, error: action.payload.error }
        case USER_LOGOUT.USER_LOGOUT_REQUEST:
            return { ...state, loading: true }
        case USER_LOGOUT.USER_LOGOUT_COMPLETE:
            return { loading: false, message: action.payload?.message, isLogout: true }
        default:
            return state;
    }
}