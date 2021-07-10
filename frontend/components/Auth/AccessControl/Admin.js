import Router from "next/router";
import { useEffect } from "react";
import { isAuth } from "../../../actions/auth.action";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) return Router.push("/login");
    isAuth().role !== 1 && Router.push("/user");
  }, []);

  return <>{children}</>;
};

export default Admin;
