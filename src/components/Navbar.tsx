import React from "react";
import Button from "./Button"; // Update the path as needed

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4">
      <h1 className="text-white text-2xl font-bold">Home</h1>
      <Button onClick={onLogout} color="red">
        Sair
      </Button>
    </div>
  );
};

export default Navbar;
