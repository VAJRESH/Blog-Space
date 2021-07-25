import Router from "next/router";
import { useEffect, useState } from "react";
import { isUsernameAvailable, register } from "../../../actions/auth.action";
import { generateResponseMessage } from "../../../helpers/util.functions";
import { validateDetails } from "../../../helpers/validation.helper";

function useRegisterUser() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    type: "error",
  });
  const [inputMessage, setInputMessage] = useState({
    name: "",
    email: "",
    password: "",
    isError: false,
  });
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!values.username) return;
    if (!values.username.length > 3) return;

    const reqApi = setTimeout(() => {
      const username = values.username.toLowerCase().split(" ").join("-");

      isUsernameAvailable(username).then((res) => {
        if (res) {
          setInputMessage({
            ...inputMessage,
            username: "Username is taken",
            type: "error",
          });
        } else {
          setInputMessage({
            ...inputMessage,
            username: "Username is available",
            type: "success",
          });
        }
      });
    }, 1000);

    return () => clearTimeout(reqApi);
    // eslint-disable-next-line
  }, [values.username]);

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

  function registerNewUser(e) {
    e.preventDefault();
    if (inputMessage.isError) {
      return setResponse({
        type: "error",
        message:
          inputMessage.name ||
          inputMessage.username ||
          inputMessage.email ||
          inputMessage.password,
      });
    }
    setResponse({ type: "loading", message: "Loading..." });

    register(values)
      .then((res) => {
        generateResponseMessage(res, setResponse, () => {
          setTimeout(() => {
            Router.push("/login");
          }, 1500);
        });
      })
      .catch((err) => console.log(err));
  }
  return { handleChange, inputMessage, registerNewUser, response };
}

export default useRegisterUser;
