import { APP_NAME } from "../../../config";
import InputWithLabel from "../../InputForm/InputWithLabel";
import ToastMessage from "../../ToastMessage/ToastMessage";
import useRegisterUser from "../Logic/useRegisterUser";
import styles from "./RegisterForm.module.scss";

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
            label="Username"
            inputType="text"
            handleChange={handleChange}
            isRequired
            messageType={inputMessage.type}
            errorMessage={inputMessage.username}
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
