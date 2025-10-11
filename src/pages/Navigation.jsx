import { Routes, Route } from "react-router-dom";

import NotFoundPage from "/src/pages/NotFoundPage/NotFoundPage";

import AuthLoginPage from "/src/pages/AuthLoginPage/AuthLoginPage";
import AuthSignupPage from "/src/pages/AuthSignupPage/AuthSignupPage";
import AuthResetPasswordPage from "/src/pages/AuthResetPasswordPage/AuthResetPasswordPage";
import AuthConfirmPage from "/src/pages/AuthConfirmPage/AuthConfirmPage";

import HomePage from "/src/pages/HomePage/HomePage";
import ProfilePage from "/src/pages/ProfilePage/ProfilePage";
import ProfileEditPage from "/src/pages/ProfileEditPage/ProfileEditPage";
import ExplorePage from "/src/pages/ExplorePage/ExplorePage";
import MessagePage from "/src/pages/MessagePage/MessagePage";

import PublicRoute from "/src/modules/PublicRoute/PublicRoute";
import PrivateRoute from "/src/modules/PrivateRoute/PrivateRoute";

export default function Navigation() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages/:id" element={<MessagePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/edit" element={<ProfileEditPage />} />
      </Route>
      <Route path="/auth" element={<PublicRoute />}>
        <Route path="login" element={<AuthLoginPage />} />
        <Route path="signup" element={<AuthSignupPage />} />
        <Route path="reset" element={<AuthResetPasswordPage />} />
        <Route path="verify" element={<AuthConfirmPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
