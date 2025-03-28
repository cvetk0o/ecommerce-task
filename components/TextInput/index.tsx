import { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  description?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  error?: boolean;
  placeholder?: string;
  type?: "text" | "password" | "tel" | "number";
  className?: string;
  readOnly?: boolean;
  isRequired?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  disabled?: boolean;

  inputClassName?: string;
}

import styles from "./TextInput.module.css";

const TextInput: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  disabled = false,
  error,
  inputClassName,
  placeholder = "",
  ...props
}) => {
  return (
    <div
      className={`
                ${styles.inputContainer}
                ${error ? styles.error : ""}
                ${inputClassName || ""}
                ${props?.icon ? styles.inputContainer__hasIcon : ""}
            `}
    >
      {props?.icon ? props.icon : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
