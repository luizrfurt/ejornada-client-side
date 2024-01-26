import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { TextInput } from "flowbite-react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      <TextInput
        type={showPassword ? "text" : "password"}
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
      <div
        className="absolute inset-y-0 right-0.5 flex items-center pr-3 cursor-pointer"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <HiEyeOff className="text-gray-500" />
        ) : (
          <HiEye className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
