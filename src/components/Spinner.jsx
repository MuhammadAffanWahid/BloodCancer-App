import React from "react";

const Spinner = () => {
  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="spinner w-40 h-40">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default Spinner;
