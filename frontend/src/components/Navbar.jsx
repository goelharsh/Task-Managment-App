import React, { useState } from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import endpoints from "../services/endpoints"
import axios from "axios"
const {
  LOGOUT_API
} = endpoints
const Navbar = () => {
  const {user} = useSelector(state=>state.auth)
  const {token} = useSelector(state=>state.auth)
  const navigate = useNavigate();
  const handleLogin = ()=>{
    navigate("/login")
  }
  const handleSignup = ()=>{
    navigate("/signup")
  }

  const handleLogout = async()=>{
    try {
      const response = await axios.post(LOGOUT_API);
      if(response){
        console.log(response);
        navigate("/login")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-auto">
      <div className="w-[80%] h-[5rem] flex justify-between items-center mx-auto">
        <h1 className="font-bold text-2xl">
          Task <span className="text-orange-600">Management</span>
        </h1>
        <div>
          {user ? (
          <div className="flex gap-5">
            <h2 className="bg-violet-700 text-white p-2 rounded-md" >{user.name}</h2>
            <div>
            <button className="bg-violet-700 text-white p-2 rounded-md" onClick={handleLogout}>Logout</button>
          </div>
          </div>
          ) : (
            <div className="flex gap-5 justify-center items-center ">
              <button className="bg-violet-700 text-white p-2 rounded-md" onClick={handleLogin}>Login</button>
              <button className="bg-violet-700 text-white p-2 rounded-md" onClick={handleSignup}>Sign Up</button>
            </div>
          )}
         
        </div>
       
      </div>
    </div>
  );
};

export default Navbar;
