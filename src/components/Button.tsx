import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: string; // Adicionando a propriedade de cor opcional
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "blue",
}) => {
  const getButtonColorClass = () => {
    switch (color) {
      case "red":
        return "bg-red-500 hover:bg-red-700";
      case "green":
        return "bg-green-500 hover:bg-green-700";
      case "orange":
        return "bg-orange-500 hover:bg-orange-700";
      default:
        return "";
    }
  };

  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded w-full ${getButtonColorClass()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
