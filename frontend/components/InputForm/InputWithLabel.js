import styles from "./InputWithLabel.module.scss";

const InputWithLabel = ({
  label,
  inputType,
  handleChange,
  isRequired,
  inputValue,
  errorMessage,
}) => {
  return (
    <section className={styles.formSection}>
      <small className='error'>{errorMessage}</small>
      <input
        name={label}
        type={inputType}
        placeholder={label}
        required={!!isRequired}
        onChange={handleChange}
        value={inputValue}
      />
      <label htmlFor={label}>{label}</label>
    </section>
  );
};

export default InputWithLabel;
