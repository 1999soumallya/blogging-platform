import axios from "@/config/axios";
import { LOGIN_USER, LOGOUT_URL } from "@/utils/constants";
import { USER_LOGIN, USER_LOGOUT } from "../constants/auth.constant";
import { removeCookie, setCookie } from "@/utils/cookies";
import moment from "moment-timezone"

export const UserLoginAction = (data, dispatch) => {
    dispatch({ type: USER_LOGIN.USER_LOGIN_REQUEST })
    axios.post(LOGIN_USER, data).then((response) => {
        if (response.data.success) {
            setCookie('auth_token', response.data.token, { expires: new Date(moment().add(15, 'days').format()) })
            dispatch({ type: USER_LOGIN.USER_LOGIN_SUCCESS, payload: { message: response.data.message, token: response.data.token } });
        } else {
            dispatch({ type: USER_LOGIN.USER_LOGIN_FAIL, payload: { message: response.data.message, error: response.data } });
        }
    }).catch((error) => {
        if (error.response) {
            dispatch({ type: USER_LOGIN.USER_LOGIN_FAIL, payload: { message: error.response.data.message, error: error.response.data.errors || error.response.data } });
        } else {
            dispatch({ type: USER_LOGIN.USER_LOGIN_FAIL, payload: { error: error.stack, message: error.message } });
        }
    })
}

export const UserLogoutAction = (dispatch) => {
    dispatch({ type: USER_LOGOUT.USER_LOGOUT_REQUEST })
    axios.get(LOGOUT_URL).then((response) => {
        if (response.data.success) {
            dispatch({ type: USER_LOGOUT.USER_LOGOUT_COMPLETE, payload: { message: response.data.message } });
        } else {
            dispatch({ type: USER_LOGOUT.USER_LOGOUT_COMPLETE, payload: { message: response.data.message } });
        }
        removeCookie('auth_token')
    }).catch((error) => {
        if (error.response) {
            dispatch({ type: USER_LOGOUT.USER_LOGOUT_COMPLETE, payload: { message: error.response.data.message } });
        } else {
            dispatch({ type: USER_LOGOUT.USER_LOGOUT_COMPLETE, payload: { message: error.message } });
        }
        removeCookie('auth_token')
    })
}