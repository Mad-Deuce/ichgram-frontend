import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLogin } from "/src/redux/auth/auth-selectors";

const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  if (!isLogin) return <Navigate to="/auth/login" />;
  return <Outlet />;
};

export default PrivateRoute;
