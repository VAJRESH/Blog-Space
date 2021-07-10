import { useState, useEffect } from "react";
import { validateDetails } from "../../../helpers/validation.helper";
import styles from "./LoginForm.module.scss";
import InputWithLabel from "../../InputForm/InputWithLabel";
import ToastMessage from "../../ToastMessage/ToastMessage";
import { Router } from "next/router";
import { login, authenticateUser, isAuth } from "../../../actions/auth.action";
import { APP_NAME } from "../../../config";

function useLoginUser() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [inputMessage, setInputMessage] = useState({
    email: "",
    password: "",
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
      });
    } else {
      setInputMessage({
        ...inputMessage,
        [fieldName]: "",
      });
    }
  }

  function loginUser(e) {
    e.preventDefault();
    setResponse({ type: "loading", message: "Loading..." });

    login(values)
      .then((res) => {
        if (!res) setResponse({ type: "info", message: "No Response" });
        if (res) {
          if (res.error) {
            setResponse({ type: "error", message: res.error });
          } else if (res.message) {
            setResponse({ type: "success", message: res.message });

            authenticateUser(res);

            setTimeout(() => {
              if (isAuth().role === 1) return Router.push("/admin");
              Router.push("/user");
            }, 1500);
          } else {
            setResponse({ type: "info", message: "No Message" });
          }
        }
      })
      .catch((err) => console.log(err));
  }
  return { handleChange, inputMessage, loginUser, response };
}

const LoginForm = () => {
  const { handleChange, inputMessage, loginUser, response } = useLoginUser();

  return (
    <div className={styles.login}>
      <ToastMessage type={response.type} message={response.message} />
      <form className="form" onSubmit={loginUser}>
        <fieldset>
          <legend>{APP_NAME}</legend>

          <InputWithLabel
            label="Email"
            inputType="email"
            handleChange={handleChange}
            isRequired
            errorMessage={inputMessage.email}
          />

          <InputWithLabel
            label="Password"
            inputType="password"
            handleChange={handleChange}
            isRequired
            errorMessage={inputMessage.password}
          />

          <section className={`formSubmit`}>
            <button type="submit">Submit</button>
          </section>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginForm;
