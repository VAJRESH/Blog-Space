import styles from "./ToastMessage.module.scss";
import { useState, useEffect } from "react";

// there will be 4 types: error, loading, success, info
const ToastMessage = ({ type, message, persist }) => {
  const [toastMessage, setToastMessage] = useState({ type: "", message: "" });

  useEffect(() => {
    setToastMessage({
      type: type || "info",
      message: message || "",
    });

    if (!persist) {
      setTimeout(() => {
        setToastMessage({
          type: "",
          message: "",
        });
      }, 1500);
    }
  }, [message]);

  if (!toastMessage.message) return null;

  return (
    <div className={styles.toastMessage}>
      <p className={toastMessage.type}>{toastMessage.message}</p>
    </div>
  );
};

export default ToastMessage;
