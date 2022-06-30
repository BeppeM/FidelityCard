
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = ({ allowedRoles }) => {
    
    const auth = useSelector(state => state.auth)
    const location = useLocation();

    if (auth.user === null) {
        return <Navigate to="/login" state={{from: location}} replace/>
    } else {
        if (allowedRoles.includes(auth?.user?.AUTHORITIES_KEY)) {
            return <Outlet />
        } else {
            return <Navigate to="/unauthorized" state={{from: location}} replace/>
        }
    }
}