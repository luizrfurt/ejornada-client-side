import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, Label, TextInput, Spinner, Toast } from "flowbite-react"; // Import Spinner from flowbite-react
import Link from "next/link";

const PasswordReset: React.FC = () => {
  const router = useRouter();
  const [reset, setReset] = useState({
    email: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    try {
      setIsSending(true);
      const response = false;

      if (!response) {
        alert("Erro ao enviar");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro: ", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReset((prevResetData) => ({
      ...prevResetData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-6 max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <img src="../.././img/logo.png" className="w-1/3" alt="Logo" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={reset.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button color="success" type="button" onClick={handleSend}>
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
