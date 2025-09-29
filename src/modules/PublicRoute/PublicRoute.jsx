import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import useLogin from "/src/shared/hooks/useLogin";

import { selectToken, selectIsLogin } from "/src/redux/auth/auth-selectors";

const PublicRoute = () => {
  // const isLogin = useLogin();
  const isLogin = useSelector(selectIsLogin);
  // const token = useSelector(selectToken);

  // if (!isLogin && token) return <p>Loading...</p>;

  if (isLogin) return <Navigate to="/" />;

  console.log("in PublicRoute", isLogin);

  return <Outlet />;
};

export default PublicRoute;
