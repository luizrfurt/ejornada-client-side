import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { emailConfirmVerifyToken } from "../../../../services/EmailConfirmService";
import { Button, Card, Spinner } from "flowbite-react";

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
        const result = await new Promise<{ status: number }>(
          (resolve, reject) => {
            emailConfirmVerifyToken(token)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          }
        );
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <div className="flex items-center justify-center mb-4">
          <img src="../../../img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        {loading ? (
          <p className="text-center">Verificando...</p>
        ) : confirmedEmail ? (
          <div>
            <p className="text-center">Email confirmado com sucesso!</p>
          </div>
        ) : (
          <div>
            <p className="text-center">Link expirado ou já utilizado!</p>
          </div>
        )}
        <Button color="success" href="/">
          {isLoading ? <Spinner size="sm" /> : "Voltar"}
        </Button>
      </Card>
    </div>
  );
};

export default ConfirmEmailPage;
