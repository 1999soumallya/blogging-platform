import { AuthState } from "@/context/auth.context";
import { Navigate, Outlet } from "react-router-dom";

// Using this function get user login state and if login then navigate to marketplace else showing login screens
export const AuthGuard = () => {
    const { isAuthorized } = AuthState()

    return isAuthorized ? <Navigate to={'/blog'} replace={true} /> : <Outlet />
}

// Using this function get user login state and if login then showing dashboard else navigate to home page
export const DashboardGuard = () => {
    const { isAuthorized } = AuthState()

    return isAuthorized ? <Outlet /> : <Navigate to={'/'} replace={true} />
}