import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-2">
        <span class="loader"></span>{" "}
      </div>
    </div>
  );
};

export default Loader;
