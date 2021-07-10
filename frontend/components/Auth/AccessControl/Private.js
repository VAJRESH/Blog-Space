import Router from "next/router";
import { useEffect } from "react";
import { isAuth } from "../../../actions/auth.action";

const Private = ({ children }) => {
  useEffect(() => {
    !isAuth() && Router.push("/login");
  }, []);

  return <>{children}</>;
};

export default Private;
