import Router from "next/router";
import { useEffect, useState } from "react";
import { authenticateUser, isAuth, login } from "../../../actions/auth.action";
import { generateResponseMessage } from "../../../helpers/util.functions";
import { validateDetails } from "../../../helpers/validation.helper";

function useLoginUser() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [inputMessage, setInputMessage] = useState({
    email: "",
    password: "",
    isError: false,
  });
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  function handleChange(e) {
    const fieldName = e.target.name.toLowerCase();
    setValues({
      ...values,
      [fieldName]: e.target.value,
    });

    const errorMessage = validateDetails(fieldName, e.target.value);
    if (errorMessage) {
      setInputMessage({
        ...inputMessage,
        [fieldName]: errorMessage,
        isError: true,
      });
    } else {
      setInputMessage({
        ...inputMessage,
        [fieldName]: "",
        isError: false,
      });
    }
  }

  function loginUser(e) {
    e.preventDefault();
    if (inputMessage.isError) {
      return setResponse({
        type: "error",
        message: inputMessage.email || inputMessage.password,
      });
    }
    setResponse({ type: "loading", message: "Loading..." });

    login(values)
      .then((res) => {
        generateResponseMessage(res, setResponse, () => {
          authenticateUser(res);

          setTimeout(() => {
            if (isAuth().role === 1) return Router.push("/admin");
            Router.push("/user");
          }, 1500);
        });
      })
      .catch((err) => console.log(err));
  }
  return { handleChange, inputMessage, loginUser, response };
}

export default useLoginUser;
