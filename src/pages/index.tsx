import React, { useState } from "react";
import { HiMail } from "react-icons/hi";
import { TextInput, Label, Button, Card, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginUser } from "@/services/AuthService";
import { ToastContainer } from "react-toastify";
import notifyMessage from "@/utils/NotifyMessage";
import InputPasswordComponent from "@/components/InputPasswordComponent";

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (emailError) {
        notifyMessage(0, "Por favor, insira um endereço de email válido.");
        return;
      }
      const response = await loginUser(loginData.email, loginData.password);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
    if (name === "email") {
      setEmailError(
        value.trim() !== "" && !isValidEmail(value)
          ? "Por favor, insira um endereço de email válido."
          : null
      );
    }
  };

  const handleBlurEmail = () => {
    setEmailError(
      loginData.email.trim() !== "" && !isValidEmail(loginData.email)
        ? "Por favor, insira um endereço de email válido."
        : null
    );
  };

  const isButtonDisabled =
    !loginData.email || !loginData.password || !!emailError;

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <Card className="p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src="./img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
            <TextInput
              icon={HiMail}
              id="email"
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              onBlur={handleBlurEmail}
              required
              shadow
            />
            {emailError && (
              <span className="text-red-500 text-sm">{emailError}</span>
            )}
          </div>
          <InputPasswordComponent
            id="password"
            name="password"
            label="Senha"
            value={loginData.password}
            handleInputChange={handleInputChange}
          />
          <Button
            disabled={isButtonDisabled}
            color="success"
            type="button"
            onClick={handleLogin}
          >
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
