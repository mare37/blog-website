import React from "react";
import { Outlet, Navigate } from "react-router-dom";
//import LogIn from "./login";
import Axios from "axios";

Axios.defaults.withCredentials = true;

function ProtectedRoute() {
  const [isAuth, setAuth] = React.useState(null);
  // const [isLoaded, setLoader] = React.useState(false);
  // console.log(`Props.Auth: ${props.isAuth}`);

  React.useEffect(() => {
    Axios.get("http://localhost:8080/api/login")
      .then((response) => {
        //
        if (response.data.login) {
          console.log(response.data.login);
          console.log("CODE 1 RAN");
          // setLoader(true);
          setAuth(response.data.login);
        }
        // console.log(isAuth);
      })
      .catch((err) => {
        if (err) {
          console.log("CODE 2 RAN");
          setAuth(false);
          console.log("Not logged In");
        }
      });
  }, [isAuth]);

  console.log(`isAuth: ${isAuth}`);
  if (isAuth === null) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
