import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from "/src/pages/Navigation";

import { getCurrentUser } from "/src/redux/auth/auth-thunks";

import "/src/shared/styles/styles.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      App here
      <Navigation />
    </>
  );
}
