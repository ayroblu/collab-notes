import React, { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import type { CodeProps } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";

import { Spinner } from "./Spinner";

const SyntaxHighlighter = React.lazy(() => import("./SyntaxHighlighter"));

export const Markdown: React.FC<{ text: string; className?: string }> =
  React.memo(({ className, text }) => (
    <ReactMarkdown
      className={className}
      children={text}
      remarkPlugins={[remarkGfm]}
      components={{
        code: Code,
      }}
    />
  ));

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
    <Suspense fallback={<Spinner />}>
      <SyntaxHighlighter children={children} language={language} {...props} />
    </Suspense>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
