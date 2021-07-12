import { useEffect, useState } from "react";
import { isAuth, logout } from "../../../actions/auth.action";

export default function useHandleNav() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (process.browser) {
      setIsUserLoggedIn(isAuth());
    }
  }, []);

  function handleLogout() {
    logout()
      .then((res) => {
        if (!res) setResponse({ type: "info", message: "No Response" });
        if (res) {
          if (res.error) {
            setResponse({ type: "error", message: res.error });
          } else if (res.message) {
            setResponse({ type: "success", message: res.message });
          } else {
            setResponse({ type: "info", message: "No Message" });
          }
        }

        setTimeout(() => {
          setResponse({
            type: "",
            message: "",
          });
        }, 1500);
      })
      .catch((err) => console.log(err));
  }

  function handleClick() {
    setIsUserLoggedIn(isAuth());
  }
  return { handleClick, handleLogout, response, isUserLoggedIn };
}
