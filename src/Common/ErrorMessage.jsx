import React from "react";

const ErrorMessage = ({ msg = "This field is required" }) => {
  return (
    <div>
      <span style={{ color: "red" }}>{msg}</span>
    </div>
  );
};

export default ErrorMessage;
