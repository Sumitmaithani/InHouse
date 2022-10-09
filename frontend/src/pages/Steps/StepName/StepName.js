import React from "react";

const StepName = ({ onClick }) => {
  return (
    <div>
      <h1>StepName</h1>
      <button onClick={onClick}>Next</button>
    </div>
  );
};

export default StepName;
