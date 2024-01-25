import React, { useState } from "react";
import { Button, Card, Label, TextInput, Spinner, Toast } from "flowbite-react"; // Import Spinner from flowbite-react
import Link from "next/link";
import { useRouter } from "next/router";
import { loginUser } from "@/services/AuthService";

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await loginUser(loginData.email, loginData.password);

      if (!response) {
        alert("Erro ao logar");
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src="./img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Senha" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button color="success" type="button" onClick={handleLogin}>
            {isLoading ? <Spinner size="sm" /> : "Entrar"}
          </Button>
          <Label htmlFor="agree" className="flex">
            Não possui conta?&nbsp;
            <Link href="/register" className="text-red-600 dark:text-red-500">
              Cadastra-se
            </Link>
          </Label>
          <Label htmlFor="agree" className="flex">
            <Link
              href="/password/reset/send"
              className="text-blue-600 dark:text-blue-500"
            >
              Esqueci minha senha
            </Link>
          </Label>
        </form>
      </Card>
    </div>
  );
};

export default Login;
