import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// import useLogin from "/src/shared/hooks/useLogin";

import { selectToken, selectIsLogin } from "/src/redux/auth/auth-selectors";

const PrivateRoute = () => {
  // const isLogin = useLogin();
  const isLogin = useSelector(selectIsLogin);
  // const token = useSelector(selectToken);

  // if(!isLogin && token) return <p>Loading...</p>;

  console.log("in PrivateRoute", isLogin);

  if (!isLogin) return <Navigate to="/auth/login" />;

  return <Outlet />;
};

export default PrivateRoute;
