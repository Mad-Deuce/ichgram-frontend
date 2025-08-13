import { Routes, Route } from "react-router-dom";

import HomePage from "/src/pages/HomePage/HomePage";
import NotFoundPage from "/src/pages/NotFoundPage/NotFoundPage";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
