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
  errorText,
  label,
  ...inputProps
}) => (
  <label className={styles.input}>
    <span className={styles.inputLabel}>{label}</span>
    <input {...inputProps} />
    <span className={styles.error}>{errorText}</span>
  </label>
);

type TextAreaProps = {
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  errorText: string;
};
export const TextArea: React.FC<TextAreaProps> = ({
  errorText,
  label,
  ...inputProps
}) => (
  <label className={styles.input}>
    <span className={styles.inputLabel}>{label}</span>
    <textarea {...inputProps} />
    <span className={styles.error}>{errorText}</span>
  </label>
);
