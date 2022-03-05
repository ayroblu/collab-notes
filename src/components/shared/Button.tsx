import { cn, unreachable } from "@/modules/utils";

import styles from "./Button.module.css";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  buttonType?: "form" | "inline" | "normal";
};
export const Button: React.FC<Props> = ({
  buttonType = "normal",
  className,
  ...props
}) => {
  if (buttonType === "normal") {
    return <button className={cn(styles.button, className)} {...props} />;
  } else if (buttonType === "inline") {
    return (
      <button
        className={cn(styles.button, styles.inlineButton, className)}
        {...props}
      />
    );
  } else if (buttonType === "form") {
    return (
      <button
        className={cn(styles.button, className)}
        type="button"
        {...props}
      />
    );
  }
  unreachable(buttonType);
  return null;
};

type SubmitButtonProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  className,
  ...props
}) => (
  <input className={cn(styles.button, className)} type="submit" {...props} />
);
