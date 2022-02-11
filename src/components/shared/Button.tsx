import { cn, unreachable } from "@/modules/utils";

import styles from "./Button.module.css";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  buttonType: "form" | "normal";
};
export const Button: React.FC<Props> = ({
  buttonType,
  className,
  ...props
}) => {
  if (buttonType === "normal") {
    return <button className={cn(styles.button, className)} {...props} />;
  } else if (buttonType === "form") {
    return (
      <button
        type="button"
        className={cn(styles.button, className)}
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
  <input type="submit" className={cn(styles.button, className)} {...props} />
);