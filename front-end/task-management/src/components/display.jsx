import React from "react";
import { useSelector } from "react-redux";
const Display = () => {
  const { username, email, role } = useSelector((state) => state.user);
  return (
    <div className="w-[300px] bg-gray-200 rounded-md border border-gray-300 bg-white flex flex-col gap-4 p-4">
      <h1><span className="font-bold"> Username: </span>{username}</h1>
      <h1><span className="font-bold"> Email: </span>{email}</h1>
      <h1><span className="font-bold"> Role: </span>{role}</h1>
    </div>
  );
};

export default Display;
