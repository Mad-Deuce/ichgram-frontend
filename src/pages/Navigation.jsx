import { Routes, Route } from "react-router-dom";

import NotFoundPage from "/src/pages/NotFoundPage/NotFoundPage";

import AuthLoginPage from "/src/pages/AuthLoginPage/AuthLoginPage";
import AuthSignupPage from "/src/pages/AuthSignupPage/AuthSignupPage";
import AuthResetPage from "/src/pages/AuthResetPage/AuthResetPage";

import HomePage from "/src/pages/HomePage/HomePage";
import ProfilePage from "/src/pages/ProfilePage/ProfilePage";
import ExplorePage from "/src/pages/ExplorePage/ExplorePage";
import MessagePage from "/src/pages/MessagePage/MessagePage";

import PublicRoute from "/src/modules/PublicRoute/PublicRoute";
import PrivateRoute from "/src/modules/PrivateRoute/PrivateRoute";

export default function Navigation() {
  return (
    <Routes>
      <Route  path="/auth" element={<PublicRoute />}>
        <Route path="login" element={<AuthLoginPage />} />
        <Route path="signup" element={<AuthSignupPage />} />
        <Route path="reset" element={<AuthResetPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/message" element={<MessagePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
