import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  FaGoogle,
  FaApple,
  FaPhone
} from "react-icons/fa";

import API from "../api/axios";

import AuthLayout from "../layouts/AuthLayout";
import SuccessModal from "../components/SuccessModal";

function LoginPage() {

  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] =
  useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
  "token",
  response.data.token
);

setShowSuccess(true);

setTimeout(() => {

  navigate("/dashboard");

}, 2000);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };


  return (

    <AuthLayout>

        {showSuccess && (
  <SuccessModal
    message="Login successful"
  />
)}

      <div
        className="
          w-full
          max-w-md
          bg-[#111827]
          border
          border-gray-800
          rounded-3xl
          p-10
          shadow-2xl
        "
      >

        <h2
          className="
            text-4xl
            font-bold
          "
        >

          Welcome Back

        </h2>

        <p
          className="
            mt-3
            text-gray-400
          "
        >

          Login to continue your journey.

        </p>


        {/* SOCIAL BUTTONS */}
        <div className="mt-8 space-y-4">

          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-black
              border
              border-gray-700
              py-4
              rounded-2xl
              hover:border-purple-500
              transition
            "
          >

            <FaGoogle />

            Continue with Google

          </button>


          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-black
              border
              border-gray-700
              py-4
              rounded-2xl
              hover:border-purple-500
              transition
            "
          >

            <FaApple />

            Continue with Apple

          </button>


          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-black
              border
              border-gray-700
              py-4
              rounded-2xl
              hover:border-purple-500
              transition
            "
          >

            <FaPhone />

            Continue with Phone

          </button>

        </div>


        {/* DIVIDER */}
        <div
          className="
            flex
            items-center
            gap-4
            my-8
          "
        >

          <div className="flex-1 h-[1px] bg-gray-700" />

          <span className="text-gray-500">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-gray-700" />

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-purple-500
            "
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-purple-500
            "
          />


          <button
            type="submit"
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              py-4
              rounded-2xl
              font-semibold
              transition
            "
          >

            Login

          </button>

        </form>


        <p
          className="
            mt-8
            text-center
            text-gray-400
          "
        >

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="
              text-purple-400
              hover:text-purple-300
            "
          >

            Create Account

          </Link>

        </p>

      </div>

    </AuthLayout>
  );
}

export default LoginPage;