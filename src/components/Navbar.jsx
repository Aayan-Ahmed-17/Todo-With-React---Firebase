import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  //function for Sign out
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("logout");
      })
      .catch((error) => {
        console.error(error)
      });
  };

  // function to check either signin or not
 

  return (
    <div className="flex justify-center gap-20 bg-slate-600 text-white p-5 text-2xl w-full">
      <h2 className="hover:text-gray-300 hover:underline">
        <Link to={"/"}>Register</Link>
      </h2>
      <h2 className="hover:text-gray-300 hover:underline">
        <Link to={"login"}>Login</Link>
      </h2>
      <h2 className="hover:text-gray-300 hover:underline">
        <Link to={"todo"}>Todo</Link>
      </h2>
      <button
        className="bg-red-700 text-white rounded-lg m-w-[10%] py-2 px-4 border-white border-2 self-end text-base"
        onClick={logoutUser}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
