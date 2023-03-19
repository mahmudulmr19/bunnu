import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Firebase from "../Firebase";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const auth = getAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reg.test(email) === false) {
      toast.error("Invalid Email Address");
    } else if (password === "") {
      toast.error("Password required");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/user-not-found") {
            toast.error("User Not Found");
          } else if (error.code === "auth/wrong-password") {
            toast.error("Wrong Password");
          } else if (error.code === "auth/user-disabled") {
            toast.error(
              "This account has been disabled. Please contact the administrator for more information."
            );
          }
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="shadow max-w-md w-full px-9 py-8 p-5 rounded space-y-8"
      >
        <h1 className="text-xl font-bold text-[#282B6B] text-center">
          Welcome Back
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="w-full border border-[#656565] outline-none py-3 px-4 rounded-md focus:border-[#282B6B]"
            />
          </div>

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full border border-[#656565] outline-none py-3 px-4 rounded-md focus:border-[#282B6B]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#656565] text-[12px]">
              <input
                id="remember"
                className="w-3 h-3 rounded"
                type="checkbox"
              />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <div>
              <p className="text-[#333333] text-sm font-semibold cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>
          </div>

          <button className="bg-[#3D419F] hover:bg-[#373b8f] transition duration-150 text-white py-3 rounded-md outline-none">
            Login Securely
          </button>
        </div>
        <p className="text-center text-[#777777]">
          New User?{" "}
          <Link to="/signup" className="text-[#3D419F] cursor-pointer">
            Create an Account
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
