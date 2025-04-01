import { ToastType } from "@/types";
import styles from "./Toast.module.css";
import { useEffect, useState } from "react";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(id);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRemove();
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleRemove]);

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        isRemoving ? styles.removing : ""
      }`}
    >
      <span>{message}</span>
      <button className={styles.closeButton} onClick={handleRemove}>
        ×
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: {
    id: string;
    message: string;
    type: ToastType;
  }[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Toast;
