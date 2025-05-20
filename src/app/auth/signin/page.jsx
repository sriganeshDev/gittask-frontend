"use client";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { signInApi } from "@/services/authServices";
import { useCommonContext } from "@/context/CommonContext";
import CommmonTextField from "@/components/reusableCompo/CommonInput";
import CommonButton from "@/components/reusableCompo/CommonButton";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useCommonContext();

  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[!@#$%^&*]/, "Must contain at least one special character"),
    }),
    onSubmit: async (val) => {
      try {
        const response = await signInApi(val);

        if (response?.token) {
          formik.resetForm();
          localStorage.setItem("token", response?.token);
          setIsLoggedIn(response?.token);
          toast.success(response?.message || "Login successful");
          router.push(`/`);
        } else {
          toast.error(response.message || "Login failed");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  const fields = [
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
  ];
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen gap-2">
      <div className="lg:pt-12 md:pt-8   lg:px-10 md:px-8  py-5  shadow-4xl flex flex-col justify-center items-center  bg-transparent backdrop-blur-3xl w-full max-w-md rounded-2xl">
        <p className=" heading max-md:w-[35%] sm::relative bottom-5  text-white  max-md:border-b-2 pb-2 border-white max-md:text-lg text-2xl max-md:mb-5 font-semibold sm:text-start lg:text-center tracking-widest ">
          Sign in
        </p>
        <div className="flex flex-col w-full max-md:px-5 ">
          {fields.map((field) => (
            <CommmonTextField key={field.id} fields={field} formik={formik} />
          ))}
          {/* <div className="flex items-center justify-between px-1 text-sm text-white">
            Forgot Password?
          </div> */}
          <p className="text-sm w-full pt-2 justify-start pl-2  text-white">
            If you are not registered?, please{" "}
            <span
              onClick={() => router.push(`/auth/signup`)}
              className="text-white cursor-pointer border-b hover:text-blue-400 border-white"
            >
              Sign Up
            </span>
          </p>

          <div className="flex justify-center mt-5">
            <CommonButton
              buttonName={"Login"}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
