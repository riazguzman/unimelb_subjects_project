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
        background: "#FAA8A8",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "15px" }}>{title}</h2>
      <div style={{ margin: 0 }}>{body}</div>
    </div>
  );
};

export default ErrorCard;
