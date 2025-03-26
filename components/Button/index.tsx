import { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";
import LoadingSpinner from "../LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  color?: "primary" | "danger";
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
  isLoading?: boolean;
}

function Button({
  children,
  onClick,
  isLoading,
  disabled,
  type,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} ${className || ""}`}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled || isLoading}
    >
      {isLoading ? <LoadingSpinner /> : <>{children}</>}
    </button>
  );
}

export default Button;
