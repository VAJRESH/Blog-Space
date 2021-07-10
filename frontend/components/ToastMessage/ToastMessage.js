import styles from "./ToastMessage.module.scss";

// there will be 4 types: error, loading, success, info
const ToastMessage = ({ type, message }) => {
  if (!message) return null;

  return (
    <div className={styles.toastMessage}>
      <p className={type}>{message}</p>
    </div>
  );
};

export default ToastMessage;
