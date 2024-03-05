import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { emailConfirmVerifyToken } from "../../../../services/EmailConfirmService";
import { Button, Card, Spinner } from "flowbite-react";
import { HiCheck, HiOutlineX } from "react-icons/hi";

const ConfirmEmailPage = () => {
  const router = useRouter();
  const [confirmedEmail, setConfirmedEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      const { token } = router.query;
      try {
        setLoading(true);
        const result = await emailConfirmVerifyToken(token);
        if (result.status === 200) {
          setConfirmedEmail(true);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-6">
          <img src="/img/logo.png" className="w-1/2" alt="Logo" />
        </div>
        {loading ? (
          <div className="text-center">
            <Spinner size="lg" className="text-green-500" />
            <p className="mt-4">Verificando...</p>
          </div>
        ) : confirmedEmail ? (
          <div className="text-center">
            <HiCheck className="text-green-500 text-5xl mx-auto mb-4" />
            <p className="text-green-500">Email confirmado com sucesso!</p>
          </div>
        ) : (
          <div className="text-center">
            <HiOutlineX className="text-red-500 text-5xl mx-auto mb-4" />
            <p className="text-red-600">Link expirado ou já utilizado!</p>
          </div>
        )}
        <div className="mt-6">
          <Button color="success" href="/">
            {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmEmailPage;
