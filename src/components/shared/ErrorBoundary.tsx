import React from "react";

import styles from "./ErrorBoundary.module.css";

type State = {
  hasError: boolean;
};
export class ErrorBoundary extends React.Component<{}, State> {
  override state = {
    hasError: false,
  };

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any) {
    if (process.env["NODE_ENV"] === "development") {
      console.error(error, errorInfo);
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className={styles.center}>
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
