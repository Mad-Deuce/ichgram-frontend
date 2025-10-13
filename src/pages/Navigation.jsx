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
import ChatPage from "/src/pages/ChatPage/ChatPage";

import LearnMorePage from "/src/pages/LearnMorePage/LearnMorePage";
import TermsPage from "/src/pages/TermsPage/TermsPage";
import PrivacyPolicyPage from "/src/pages/PrivacyPolicyPage/PrivacyPolicyPage";
import CookiePolicyPage from "/src/pages/CookiePolicyPage/CookiePolicyPage";

import PublicRoute from "/src/modules/PublicRoute/PublicRoute";
import PrivateRoute from "/src/modules/PrivateRoute/PrivateRoute";

export default function Navigation() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/messages/:id" element={<ChatPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/edit" element={<ProfileEditPage />} />
      </Route>
      <Route path="/auth" element={<PublicRoute />}>
        <Route path="login" element={<AuthLoginPage />} />
        <Route path="signup" element={<AuthSignupPage />} />
        <Route path="reset" element={<AuthResetPasswordPage />} />
        <Route path="verify" element={<AuthConfirmPage />} />
      </Route>

      <Route path="/learn-more" element={<LearnMorePage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/cookies-policy" element={<CookiePolicyPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
