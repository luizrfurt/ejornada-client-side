import InputPasswordComponent from "@/components/InputPasswordComponent";
import {
  changePassword,
  passwordResetVerify,
} from "@/services/PasswordResetService";
import ToastComponent from "@/components/ToastComponent";
import { Button, Card, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerifyPassword = () => {
  const router = useRouter();

  const [tokenReset, setTokenReset] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
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
      setTokenReset(token);
      console.log(token);
      try {
        setLoading(true);
        const result = await passwordResetVerify(token);
        if (result.status === 200) {
          setConfirmPassword(true);
        }
      } catch (error) {
        console.error("Erro ao confirmar email:", error);
      } finally {
        setLoading(false);
      }
    }

    if (router.query.token) {
      verifyToken();
    }
  }, [router.query]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
      setPasswordConfirmError(
        password !== value ? "As senhas não coincidem." : ""
      );
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);

      const response = await changePassword(
        password,
        passwordConfirm,
        tokenReset
      );
      if (response.status !== 201) {
        setShowToast({
          show: true,
          type: true,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !password || !passwordConfirm;

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
          <p className="text-xl font-bold">Confirmação de senha</p>
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner size="lg" className="text-green-500" />
            <p className="mt-4">Verificando...</p>
          </div>
        ) : confirmedPassword ? (
          <div>
            <div className="mb-2 block">
              <div className="mb-4">
                <InputPasswordComponent
                  id="password"
                  name="password"
                  label="Senha"
                  value={password}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div>
                <InputPasswordComponent
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirmação de senha"
                  value={passwordConfirm}
                  handleInputChange={handleInputChange}
                  error={passwordConfirmError}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                disabled={isButtonDisabled}
                color="success"
                type="button"
                onClick={handleChangePassword}
                className="mt-6 mr-6"
              >
                {isLoading ? <Spinner size="sm" /> : "Alterar senha"}
              </Button>
              <Button color="success" href="/" className="mt-6">
                Voltar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p>Email não encontrado</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerifyPassword;
