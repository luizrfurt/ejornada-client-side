import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { TextInput } from "flowbite-react";

interface InputPasswordProps {
  id: string;
  name: string;
  label: string;
  value: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  id,
  name,
  label,
  value,
  handleInputChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <TextInput
        id={id}
        name={name}
        value={value}
        type={showPassword ? "text" : "password"}
        placeholder=""
        onChange={handleInputChange}
        className="rounded-md focus:outline-none focus:ring focus:border-blue-500"
        required
      />
      <div
        className="absolute inset-y-0 right-0.5 flex items-center pr-3 cursor-pointer pt-5"
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

export default InputPassword;
