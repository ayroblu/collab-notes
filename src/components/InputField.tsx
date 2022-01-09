import styles from "./InputField.module.css";

type InputFieldProps = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorText: string;
};
export const InputField: React.FC<InputFieldProps> = ({
  label,
  errorText,
  ...inputProps
}) => (
  <label className={styles.input}>
    <span className={styles.inputLabel}>{label}</span>
    <input {...inputProps} />
    <span className={styles.error}>{errorText}</span>
  </label>
);
