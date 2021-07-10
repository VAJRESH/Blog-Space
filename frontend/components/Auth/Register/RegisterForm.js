import { useState } from "react";
import { validateDetails } from "../../../helpers/validation.helper";
import styles from "./RegisterForm.module.scss";
import InputWithLabel from "../../InputForm/InputWithLabel";
import ToastMessage from "../../ToastMessage/ToastMessage";
import { register } from "../../../actions/auth.action";
import { APP_NAME } from "../../../config";
import { Router } from "next/router";

function useRegisterUser() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputMessage, setInputMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

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

  function registerNewUser(e) {
    e.preventDefault();
    setResponse({ type: "loading", message: "Loading..." });

    register(values)
      .then((res) => {
        let isNewUser = false;
        if (!res) setResponse({ type: "info", message: "No Response" });
        if (res) {
          if (res.error) {
            setResponse({ type: "error", message: res.error });
          } else if (res.message) {
            isNewUser = true;
            setResponse({ type: "success", message: res.message });
          } else {
            setResponse({ type: "info", message: "No Message" });
          }

          setTimeout(() => {
            setResponse({
              type: "",
              message: "",
            });
            isNewUser && Router.push("/login");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  }
  return { handleChange, inputMessage, registerNewUser, response };
}

const RegisterForm = () => {
  const { handleChange, inputMessage, registerNewUser, response } =
    useRegisterUser();

  return (
    <>
      <ToastMessage type={response.type} message={response.message} />
      <form className={`form ${styles.register}`} onSubmit={registerNewUser}>
        <fieldset>
          <legend>{APP_NAME}</legend>

          <InputWithLabel
            label="Name"
            inputType="text"
            handleChange={handleChange}
            isRequired
            errorMessage={inputMessage.name}
          />
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
    </>
  );
};

export default RegisterForm;
