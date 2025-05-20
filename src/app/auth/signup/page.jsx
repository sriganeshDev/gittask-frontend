"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signUpApi } from "@/services/authServices";
import CommonButton from "@/components/reusableCompo/CommonButton";
import CommmonTextField from "@/components/reusableCompo/CommonInput";

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[!@#$%^&*]/, "Must contain at least one special character"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (val) => {
      try {
        const response = await await signUpApi(val);

        toast.success(response?.message);
        formik.resetForm();
        router.push(`/auth/signin`);
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  const registerFields = [
    {
      name: "userName",
      type: "text",
      id: "userName",
      label: "User Name",
      placeholder: "Please Enter your UserName",
      icon: <FaUser />,
    },
    {
      name: "email",
      type: "email",
      id: "email",
      label: "Email",
      placeholder: "Please Enter your Email",
      icon: <FaEnvelope />,
    },
    {
      name: "password",
      type: "password",
      id: "password",
      label: "Password",
      placeholder: "Please enter your Password",
      icon: <FaLock />,
    },
    {
      name: "confirmPassword",
      type: "password",
      id: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Please enter your Confirm Password",
      icon: <FaLock />,
    },
  ];

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen gap-2">
      <div className="lg:pt-12  lg:px-10 py-5  shadow-4xl flex flex-col justify-center items-center  bg-transparent backdrop-blur-3xl w-full max-w-md rounded-2xl">
        <p className="heading max-md:w-[30%] text-white sm:relative bottom-5 max-md:border-b-2 pb-1 border-white max-md:text-lg text-2xl max-md:mb-5 font-semibold sm:text-start lg:text-center tracking-widest">
          Sign up
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full max-md:px-5 "
        >
          {registerFields.map((field) => (
            <MemoizedField key={field.id} field={field} formik={formik} />
          ))}

          <p className="text-sm w-full justify-start pl-2  text-white">
            If already registered? Please{" "}
            <span
              onClick={() => router.push(`/auth/signin`)}
              className="text-white cursor-pointer border-b hover:text-blue-400 border-white"
            >
              Sign In
            </span>
          </p>

          <div className="flex  justify-center mt-5">
            <CommonButton
              buttonName={"Register"}
              type="submit"
              handlesubmit={formik.handleSubmit}
              design={{
                backgroundColor: "#9810fa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "170px",
                height: "40px",
                fontSize: "15px",
                borderRadius: "100px",
                fontWeight: "550",
              }}
              hoverStyles={{
                backgroundColor: "#8604ea",
                border: "2px solid #8604ea",
                color: "#ffffff",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const MemoizedField = React.memo(({ field, formik }) => {
  return <CommmonTextField fields={field} formik={formik} />;
});

export default Register;
