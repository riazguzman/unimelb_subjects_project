import React from "react";

const ErrorCard = ({ title, body }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        fontSize: "12px",
        width: "100px",
      }}
    >
      <p style={{ margin: 0 }}>{title}</p>
      <p style={{ margin: 0 }}>{body}</p>
    </div>
  );
};

export default ErrorCard;
