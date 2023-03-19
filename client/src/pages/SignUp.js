import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../assets/user.png";
import Firebase from "../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const SignUp = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name required");
    } else if (reg.test(email) === false) {
      toast.error("Invalid Email Address");
    } else if (password === "") {
      toast.error("Password required");
    } else if (password.length < 8) {
      toast.error("Password minium 8 character");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: userImage,
          }).then(() => {
            navigate("/login");
          });
        })
        .catch((error) => {
          toast.error("Email already in use!");
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
          Create Account
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full border border-[#656565] outline-none py-3 px-4 rounded-md focus:border-[#282B6B]"
            />
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="flex items-center text-[12px] gap-1.5">
            <input id="confirm" className="w-3 h-3 rounded" type="checkbox" />
            <label htmlFor="confirm" className="text-[12px] text-[#656565]">
              I agree to all the{" "}
              <strong className="cursor-pointer">terms</strong> and{" "}
              <strong className="cursor-pointer">privacy policy</strong>
            </label>
          </div>

          <button className="bg-[#3D419F] hover:bg-[#373b8f] transition duration-150 text-white py-3 rounded-md outline-none">
            Create Free Account
          </button>
        </div>
        <p className="text-center text-[#777777]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#3D419F] cursor-pointer font-semibold"
          >
            Log In
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
