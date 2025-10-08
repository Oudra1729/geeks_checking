import React from "react";
import { useDispatch } from "react-redux";
import { setUserName, setUserEmail, setUserRole } from "../features/userSlice";

const form = () => {
    const dispatch = useDispatch();
  return (
    <div className="w-[300px] bg-gray-200 rounded-md border border-gray-300 bg-white flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">User Registration</h1>
      <input type="text" placeholder="Username" className="w-full p-2 rounded-md border border-gray-300" onChange={(e) => dispatch(setUserName(e.target.value))} />
      <input type="email" placeholder="Email" className="w-full p-2 rounded-md border border-gray-300" onChange={(e) => dispatch(setUserEmail(e.target.value))} />
      <select name="role" id="role" className="w-full p-2 rounded-md border border-gray-300" onChange={(e) => dispatch(setUserRole(e.target.value))} >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default form;
