import axios from "@/config/axios";
import Loader from "@/shared/Loader";
import { GET_USER_DETAILS } from "@/utils/constants";
import { removeCookie } from "@/utils/cookies";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [isAuthorized, setIsAuthorized] = useState(false) // This state is holding the user login status
    const [isLoading, setIsLoading] = useState(false) // This state is working for user details fetching is in progress or done
    const [isInitialized, setIsInitialized] = useState(false) // This app all states are successfully rendered or still some pending
    const [headerName, setHeaderName] = useState('') // This state is holding current header name
    const [userDetails, setUserDetails] = useState(null) // This state is holding user details after fetching

    // Using this function fetching user details after login
    const getUserDetails = useCallback(() => {
        setIsLoading(true)
        axios.get(GET_USER_DETAILS).then((response) => {
            setIsLoading(false)
            if (response.data.success) {
                setUserDetails(response.data.data)
                setIsAuthorized(true)
                setIsInitialized(true)
            } else {
                toast.error(response.data.message)
            }
        }).catch((error) => {
            setIsLoading(false)
            if (error.response?.status == 401) {
                setIsAuthorized(false)
                removeCookie('auth_token')
                window.location.reload()
            }
        })
    }, [])

    // This object is pass all value on this full project then i can access any where
    const value = { isAuthorized, userDetails, headerName, setHeaderName, setUserDetails }

    const { loading, token, message, error, isLogout } = useSelector((state) => state?.authorization)

    // useEffect hook for checking token and fetching user details
    useEffect(() => {
        if (token) {
            if (message && message !== '') {
                toast.success(message)
            }
            getUserDetails()
        } else {
            setIsInitialized(true)
        }

        if (error) {
            if (message && message != '') {
                toast.error(message)
            }
            setIsAuthorized(false)
        }

        if (isLogout) {
            if (message && message != '') {
                toast.success(message)
            }
            setIsAuthorized(false)
        }

    }, [token, error, message, getUserDetails, isLogout])

    // If user details is not initialized yet then return loader
    if (!isInitialized) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={value}>
            {(isLoading || loading) && <Loader />}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const AuthState = () => {
    return useContext(AuthContext)
}