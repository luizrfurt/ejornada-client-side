import React, { useState } from "react";
import { HiMail } from "react-icons/hi";
import { TextInput, Label, Button, Card, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginUser } from "@/services/AuthService";
import ToastComponent from "@/components/ToastComponent";
import InputPasswordComponent from "@/components/InputPasswordComponent";

const Login: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: boolean;
    message: string;
  }>({ show: false, type: false, message: "" });

  const handleCloseToast = () => {
    setShowToast({ ...showToast, show: false });
  };

  const isValidLogin = (login: string): boolean => {
    return login.length >= 8;
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      if (loginError) {
        setShowToast({
          show: true,
          type: false,
          message: "Por favor, corrija os erros antes de continuar.",
        });
        return;
      }

      const response = await loginUser(loginData.login, loginData.password);

      if (response.status !== 200) {
        setShowToast({
          show: true,
          type: false,
          message: "Credenciais inválidas. Por favor, tente novamente.",
        });
      } else {
        setShowToast({
          show: true,
          type: true,
          message: "Login bem sucedido!",
        });
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro: ", error);
      setShowToast({
        show: true,
        type: false,
        message: "Ocorreu um erro. Por favor, tente novamente mais tarde.",
      });
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
      setLoginError(
        value.trim() !== "" && !isValidLogin(value)
          ? "Login deve conter pelo menos 8 caracteres."
          : null
      );
    }
  };

  const handleBlurLogin = () => {
    setLoginError(
      loginData.login.trim() !== "" && !isValidLogin(loginData.login)
        ? "Login deve conter pelo menos 8 caracteres."
        : null
    );
  };

  const isButtonDisabled =
    !loginData.login || !loginData.password || !!loginError;

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastComponent
        show={showToast.show}
        type={showToast.type}
        message={showToast.message}
        onClose={handleCloseToast}
      />
      <Card className="p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src="./img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="mb-2 block">
            <Label htmlFor="login" value="Login" />
            <TextInput
              icon={HiMail}
              id="login"
              type="login"
              name="login"
              value={loginData.login}
              onChange={handleInputChange}
              onBlur={handleBlurLogin}
              required
              shadow
              minLength={8}
              maxLength={32}
            />
            {loginError && (
              <span className="text-red-500 text-sm">{loginError}</span>
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
