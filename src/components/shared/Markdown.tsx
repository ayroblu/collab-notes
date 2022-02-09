import ReactMarkdown from "react-markdown";
import type { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import styles from "./Markdown.module.css";

export const Markdown: React.FC<{ text: string }> = ({ text }) => (
  <ReactMarkdown
    children={text}
    remarkPlugins={[remarkGfm]}
    components={{
      code: Code,
    }}
  />
);

const Code: React.FC<CodeProps> = ({
  children,
  className,
  inline,
  node,
  ...props
}) => {
  const match = /language-(?<lang>\w+)/.exec(className || "");
  const language = match?.groups?.["lang"];
  return !inline && language ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, "")}
      style={materialDark}
      customStyle={{
        padding: "4px 8px",
        margin: "4px 0",
        lineHeight: "inherit",
        fontSize: "0.9em",
      }}
      wrapLongLines
      codeTagProps={{ className: styles.code }}
      language={language}
      PreTag="div"
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
