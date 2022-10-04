import React from "react";
import { Outlet, Navigate } from "react-router-dom";
//import LogIn from "./login";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function ProtectedRoute() {
  const [isAuth, setAuth] = React.useState(null);

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/login")
      .then((response) => {
        console.log(response.data.message);
        console.log(response);

        setAuth(response.data.login);
      })
      .catch((err) => {
        console.log(err.response.data.message);

        setAuth(err.response.data.login);
      });
  }, [isAuth]);

  console.log(`isAuth: ${isAuth}`);
  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
