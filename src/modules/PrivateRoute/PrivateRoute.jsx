import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLogin } from "/src/redux/auth/auth-selectors";

import NavBar from "/src/modules/NavBar/NavBar";
import Footer from "/src/modules/Footer/Footer";
import MainGrid from "/src/shared/components/MainGrid/MainGrid";

const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLogin);
  if (!isLogin) return <Navigate to="/auth/login" />;
  return (
    <MainGrid>
      <div style={{ gridArea: "nb" }}>
        <NavBar />
      </div>
      <div style={{ gridArea: "main" }}>
        <Outlet />
      </div>
      <div style={{ gridArea: "ft" }}>
        <Footer />
      </div>
    </MainGrid>
  );
};

export default PrivateRoute;
