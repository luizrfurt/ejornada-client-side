import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  passwordResetVerify,
  passwordResetSend,
} from "../../../../services/PasswordResetService";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import ToastComponent from "@/components/ToastComponent";

const ResetPassword = () => {
  const router = useRouter();
  const [emailSend, setEmailSend] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: boolean;
    message: string;
  }>({ show: false, type: false, message: "" });

  const handleCloseToast = () => {
    setShowToast({ ...showToast, show: false });
  };

  useEffect(() => {
    async function verifyToken() {
      const { token } = router.query;
      try {
        setLoading(true);
        const result = await passwordResetVerify(token);
        if (result.status === 200) {
          //
        }
      } catch (error) {
        console.error("Erro ao mandar email:", error);
      } finally {
        setLoading(false);
      }
    }

    if (router.query.token) {
      verifyToken();
    }
  }, [router.query]);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await passwordResetSend(emailSend);
      if (response.status !== 200) {
        setShowToast({
          show: true,
          type: false,
          message: response.data.message,
        });
      } else {
        setShowToast({
          show: true,
          type: true,
          message: "Email de verificação reenviado com sucesso!",
        });
      }
    } catch (error) {
      setShowToast({
        show: true,
        type: false,
        message: "Erro ao reenviar o email de verificação.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailSend(value); // Atualizar o estado emailSend
      setEmailError(
        value.trim() !== "" && !isValidEmail(value)
          ? "Por favor, insira um endereço de email válido."
          : null
      );
    }
  };

  const handleBlurEmail = () => {
    setEmailError(
      emailSend.trim() !== "" && !isValidEmail(emailSend)
        ? "Por favor, insira um endereço de email válido."
        : null
    );
  };

  const isButtonDisabled = !emailSend || !!emailError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastComponent
        show={showToast.show}
        type={showToast.type}
        message={showToast.message}
        onClose={handleCloseToast}
      />
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-2">
          <img src="/img/logo.png" className="w-1/2" alt="Logo" />
        </div>
        <div className="flex items-center justify-center mb-3">
          <p className="text-xl font-bold">Redefinição de senha</p>
        </div>
        <div className="mb-2 block" style={{ position: "relative" }}>
          <Label htmlFor="email" value="Email" />
          <TextInput
            icon={HiMail}
            id="email"
            type="email"
            name="email"
            value={emailSend}
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
        <div className="flex justify-center">
          <Button
            color="success"
            href=""
            disabled={isButtonDisabled}
            type="button"
            className="mt-3 mr-3"
            onClick={handleClick}
          >
            {isLoading ? <Spinner size="sm" className="mr-2" /> : "Enviar"}
          </Button>
          <Button color="success" href="/" className="mt-3">
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
