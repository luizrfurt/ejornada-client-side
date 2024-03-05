import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { passwordResetVerifyToken, passwordReset } from "../../../../services/PasswordResetService";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import notifyMessage from "@/utils/NotifyMessage";

const ResetPassword = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailFound, setEmailFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      const { token } = router.query;
      try {
        setLoading(true);
        const result = await passwordResetVerifyToken(token);
        if (result.status === 200) {
          setEmailFound(true);
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

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setIsLoading(true);
      const response = await passwordReset();
      if (response.status !== 200) {
        notifyMessage(0, response.data.message);
      } else {
        notifyMessage(1, "Email de verificação reenviado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao reenviar o email de verificação:", error);
      notifyMessage(0, "Erro ao reenviar o email de verificação.");
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
      setEmailError(
        value.trim() !== "" && !isValidEmail(value)
          ? "Por favor, insira um endereço de email válido."
          : null
      );
    }
  };

  const isButtonDisabled = !!emailError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            onChange={handleInputChange}
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
        <div>
          <Button
            color="success"
            href=""
            disabled={isButtonDisabled}
            type="button"
            className="mt-3"
            onClick={handleClick}
          >
            {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
            Enviar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
