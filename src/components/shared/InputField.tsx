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
    <FormLabel>{label}</FormLabel>
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
    <FormLabel>{label}</FormLabel>
    <textarea {...inputProps} />
    <span className={styles.error}>{errorText}</span>
  </label>
);

export const FormLabel: React.FC = ({ children }) => {
  return <span className={styles.formLabel}>{children}</span>;
};

export const FormLabelWrapper: React.FC = ({ children }) => {
  return <label className={styles.input}>{children}</label>;
};
