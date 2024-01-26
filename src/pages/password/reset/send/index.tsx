import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Label, TextInput, Spinner } from "flowbite-react"; // Import Spinner from flowbite-react
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { HiMail } from "react-icons/hi";
import notifyMessage from "@/utils/NotifyMessage";

const PasswordReset: React.FC = () => {
  const router = useRouter();
  const [reset, setReset] = useState({
    email: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = async () => {
    try {
      setIsSending(true);
      const response = { status: 200, message: "Email enviado com sucesso!" };
      if (emailError) {
        notifyMessage(0, "Por favor, insira um endereço de email válido.");
        return;
      }
      if (response.status != 200) {
        notifyMessage(0, response.message);
      } else {
        notifyMessage(1, response.message);
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReset((prevLoginData) => ({
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
      reset.email.trim() !== "" && !isValidEmail(reset.email)
        ? "Por favor, insira um endereço de email válido."
        : null
    );
  };

  const isButtonDisabled = !reset.email;


  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <Card className="p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src="../.././img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        <form className="flex flex-col gap-4">
        <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
            <TextInput
              icon={HiMail}
              id="email"
              type="email"
              name="email"
              value={reset.email}
              onChange={handleInputChange}
              onBlur={handleBlurEmail}
              required
              shadow
            />
            {emailError && (
              <span className="text-red-500 text-sm">{emailError}</span>
            )}
          </div>
          <Button
            disabled={isButtonDisabled}
            color="success"
            type="button"
            onClick={handleSend}
          >
            {isSending ? <Spinner size="sm" /> : "Enviar"}
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

export default PasswordReset;
