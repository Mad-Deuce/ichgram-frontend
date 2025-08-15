import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import useLogin from "../../shared/hooks/useLogin";

import { selectToken } from "../../redux/auth/auth-selectors";

const PublicRoute = ()=> {
    const isLogin = useLogin();
    const token = useSelector(selectToken);

    if(!isLogin && token) return <p>Loading...</p>;

    if(isLogin) return <Navigate to="/" />;

    return <Outlet />
}

export default PublicRoute;