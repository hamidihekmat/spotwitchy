import React from "react";

class ErrorBoundary extends React.Component {
  componentDidCatch() {
    // reload the overlay on error
    window.location.reload();
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
