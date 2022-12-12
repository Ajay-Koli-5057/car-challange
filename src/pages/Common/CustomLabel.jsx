import React from "react";

const CustomLabel = ({title}) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <div>{title}</div>
    </div>
  );
};

export default CustomLabel;
