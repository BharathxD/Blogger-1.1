import { useSelector } from "react-redux";
import { ISessionState } from "../types/Session.types";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/UI/Loader";

interface State {
  Session: Pick<ISessionState, "isLoggedIn">;
}

const PrivateRoutes = () => {
  const isLoggedIn = useSelector((state: State) => {
    return state.Session.isLoggedIn;
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "81vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
