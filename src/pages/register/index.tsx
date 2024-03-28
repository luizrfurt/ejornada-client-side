import React, { useState } from "react";
import { useRouter } from "next/router";
import { loginUser, registerUser } from "@/services/AuthService";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiMail, HiUserCircle } from "react-icons/hi";
import InputPasswordComponent from "@/components/InputPasswordComponent";

const Register: React.FC = () => {
  const router = useRouter();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    login: "",
    password: "",
    passwordConfirm: "",
    master: true,
    leader: true,
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: boolean;
    message: string;
  }>({ show: false, type: false, message: "" });

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidLogin = (login: string): boolean => {
    return login.length >= 8;
  };

  const handleLogin = async () => {
    try {
      if (emailError) {
        setShowToast({
          show: true,
          type: true,
          message: "Por favor, insira um endereço de email válido.",
        });
        return;
      }
      const response = await loginUser(
        registerData.login,
        registerData.password
      );

      if (response.status !== 200) {
        setShowToast({
          show: true,
          type: false,
          message: response.data.message
        });
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
        registerData.login,
        registerData.password,
        registerData.passwordConfirm,
        registerData.master,
        registerData.leader,
      );

      if (response.status !== 201) {
        setShowToast({
          show: true,
          type: false,
          message: response.data.message,
        });
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

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleBlurEmail = () => {
    setEmailError(
      registerData.email.trim() !== "" && !isValidEmail(registerData.email)
        ? "Por favor, insira um endereço de email válido."
        : null
    );
  };

  const handleBlurLogin = () => {
    setLoginError(
      registerData.login.trim() !== "" && !isValidLogin(registerData.login)
        ? "Login deve conter pelo menos 8 caracteres."
        : null
    );
  };

  const isButtonDisabled =
    !registerData.name ||
    !registerData.email ||
    !registerData.login ||
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
              icon={HiUserCircle}
              id="name"
              type="text"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2 block" style={{ position: "relative" }}>
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
            />
            {emailError && (
              <span
                className="text-red-500 text-sm"
                style={{ position: "absolute", bottom: "-1.5rem" }}
              >
                {emailError}
              </span>
            )}
          </div>

          <div className="mb-2 block">
            <Label htmlFor="login" value="Login" />
            <TextInput
              icon={HiMail}
              id="login"
              type="login"
              name="login"
              value={registerData.login}
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

          <div>
            <div className="mb-2 block">
              <div className="mb-4">
                <InputPasswordComponent
                  id="password"
                  name="password"
                  label="Senha"
                  value={registerData.password}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div>
                <InputPasswordComponent
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
