import React from "react";

import { cn } from "@/modules/utils";

import styles from "./InputField.module.css";

type InputFieldProps = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
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
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ errorText, label, ...inputProps }, ref) => (
    <label className={styles.input}>
      <FormLabel>{label}</FormLabel>
      <textarea ref={ref} {...inputProps} />
      <span className={styles.error}>{errorText}</span>
    </label>
  ),
);

export const FormLabel: React.FC = ({ children }) => (
  <span className={styles.formLabel}>{children}</span>
);

export const FormLabelWrapper: React.FC<{ isOneLine?: boolean }> = ({
  children,
  isOneLine,
}) => (
  <label className={cn(styles.input, isOneLine && styles.oneline)}>
    {children}
  </label>
);
export const FormWrapper: React.FC = ({ children }) => (
  <div className={styles.input}>{children}</div>
);
