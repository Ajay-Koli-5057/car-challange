import React from "react";

const CustomBlock = ({title, subTitle}) => {
  return (
    <div>
      <div className="fw-bold">{title}</div>
      <div>{subTitle}</div>
  </div>
  );
};

export default CustomBlock;
