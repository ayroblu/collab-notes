import type { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./SyntaxHighlighter.module.css";

type Props = Omit<CodeProps, "className" | "inline" | "node"> & {
  language: string;
};
export const SyntaxHighlighter: React.FC<Props> = ({
  children,
  language,
  ...props
}) => (
  <Prism
    children={String(children).replace(/\n$/, "")}
    style={xonokai}
    customStyle={{
      padding: "3px 6px",
      margin: "4px 0",
      lineHeight: "inherit",
      fontSize: "0.9em",
      border: "none",
    }}
    wrapLongLines
    codeTagProps={{ className: styles.code }}
    language={language}
    PreTag="div"
    {...props}
  />
);
export default SyntaxHighlighter;
