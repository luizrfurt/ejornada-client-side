import React, { useState } from "react";
import { useRouter } from "next/router";
import { loginUser, registerUser } from "@/services/AuthService";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notifyMessage from "@/utils/NotifyMessage";
import { HiMail, HiOutlineUserCircle } from "react-icons/hi";
import InputPassword from "@/components/InputPassword";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      if (emailError) {
        notifyMessage(0, "Por favor, insira um endereço de email válido.");
        return;
      }
      const response = await loginUser(
        registerData.email,
        registerData.password
      );

      if (response.status !== 200) {
        notifyMessage(0, response.data.message);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      const response = await registerUser(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.passwordConfirm
      );

      if (response.status !== 201) {
        notifyMessage(0, response.data.message);
      } else {
        handleLogin();
      }
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(
        value.trim() !== "" && !isValidEmail(value)
          ? "Por favor, insira um endereço de email válido."
          : null
      );
    } else if (name === "passwordConfirm") {
      setPasswordConfirmError(
        registerData.password !== value ? "As senhas não coincidem." : ""
      );
    }
    
    // Atualiza o estado com as alterações do usuário
    setRegisterData({
      ...registerData,
      [name]: value // Atualiza o campo correspondente no estado
    });
  };
  

  const handleBlurEmail = () => {
    setEmailError(
      registerData.email.trim() !== "" && !isValidEmail(registerData.email)
        ? "Por favor, insira um endereço de email válido."
        : null
    );
  };

  const isButtonDisabled =
    !registerData.name ||
    !registerData.email ||
    !registerData.password ||
    !registerData.passwordConfirm ||
    !!emailError ||
    !!passwordConfirmError;

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <Card className="p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src="./img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome" />
            <TextInput
              icon={HiOutlineUserCircle}
              id="name"
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
            <TextInput
              icon={HiMail}
              id="email"
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
              onBlur={handleBlurEmail}
              required
              shadow
            />
            {emailError && (
              <span className="text-red-500 text-sm">{emailError}</span>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <div className="mb-4">
                <InputPassword
                  id="password"
                  name="password"
                  label="Senha"
                  value={registerData.password}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div>
                <InputPassword
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirmação de senha"
                  value={registerData.passwordConfirm}
                  handleInputChange={handleInputChange}
                  error={passwordConfirmError}
                />
              </div>
            </div>
          </div>
          <Button
            disabled={isButtonDisabled}
            color="success"
            type="button"
            onClick={handleRegister}
          >
            {isLoading ? <Spinner size="sm" /> : "Cadastrar"}
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
