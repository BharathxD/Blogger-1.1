import { useSelector } from "react-redux";
import { ISessionState } from "../types/Session.types";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

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
    return <></>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
