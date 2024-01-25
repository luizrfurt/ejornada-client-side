import React, { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/services/AuthService";
import { Button, Card, Label, TextInput } from "flowbite-react"; // Import Spinner from flowbite-react
import Link from "next/link";

const Register: React.FC = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleRegister = async () => {
    try {
      const response = await registerUser(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.passwordConfirm
      );

      if (!response) {
        alert("Erro ao cadastrar");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevregisterData) => ({
      ...prevregisterData,
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
            <Label htmlFor="email" value="Nome" />
            <TextInput
              id="name"
              type="name"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex">
            <div className="mb-2 block mr-6">
              <Label htmlFor="password" value="Senha" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="passwordConfirm" value="Confirmação de senha" />
              <TextInput
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={registerData.passwordConfirm}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button color="success" type="button" onClick={handleRegister}>
            Cadastrar
          </Button>
          <Label htmlFor="agree" className="flex">
            Já possui conta?&nbsp;
            <Link href="/" className="text-blue-600 dark:text-blue-500">
              Entrar
            </Link>
          </Label>
        </form>
      </Card>
    </div>
  );
};

export default Register;
