import React from "react";
import "../App.css"
const Navbar = () => {
  const user = false;
  return (
    <div className="w-full h-auto">
      <div className="w-[80%] h-[5rem] flex justify-between items-center mx-auto">
        <h1 className="font-bold text-2xl">
          Task <span className="text-orange-600">Management</span>
        </h1>
        <div>
          {user ? (
            <h2>username</h2>
          ) : (
            <div className="flex gap-5 justify-center items-center ">
              <button className="bg-violet-700 text-white p-2 rounded-md">Login</button>
              <button className="bg-violet-700 text-white p-2 rounded-md">Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
