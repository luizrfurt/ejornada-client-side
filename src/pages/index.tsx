import React, { useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { loginUser } from "../services/AuthService";
import { FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      // Faça a chamada Axios aqui
      const response = await loginUser(loginData.email, loginData.password);
      alert("Logado com sucesso!");
      router.push("/home");
    } catch (error) {
      alert("Credenciais inválidas!");
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full sm:w-96 text-center">
        <h2 className="text-3xl font-extrabold mb-4">
          <FaLock className="inline-block mr-2" /> Área Restrita
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <Button onClick={handleLogin} color="green">
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
