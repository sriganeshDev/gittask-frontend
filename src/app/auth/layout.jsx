import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex  flex-col w-full md:flex-row h-screen  ">
      <div
        className="absolute inset-0 bg-cover bg-center blur-xs "
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/close-up-image-programer-working-his-desk-office_1098-18707.jpg?ga=GA1.1.685253261.1744266465&semt=ais_hybrid&w=740)`,
        }}
      />

      {children}
    </div>
  );
};

export default AuthLayout;
