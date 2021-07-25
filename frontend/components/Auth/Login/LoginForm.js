import { APP_NAME } from "../../../config";
import InputWithLabel from "../../InputForm/InputWithLabel";
import ToastMessage from "../../ToastMessage/ToastMessage";
import useLoginUser from "../Logic/useLoginUser";
import styles from "./LoginForm.module.scss";

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
