import React, { useEffect, useState } from "react";
import { logoutUser } from "../../services/AuthService";
import { userData } from "../../services/UserService";
import router from "next/router";
import Navbar from "../../components/Navbar"; // Update the path as needed

const Home: React.FC = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    cpf: string;
  } | null>(null);

  const logout = async () => {
    try {
      // Faça a chamada Axios aqui
      const response = await logoutUser();
      alert("Deslogado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const me = async () => {
    try {
      // Faça a chamada Axios aqui
      const response = await userData();
      setUser({
        name: response.user.name,
        email: response.user.email,
        cpf: response.user.cpf,
      });
    } catch (error) {
      console.error("Erro ao fazer carregamento:", error);
    }
  };

  useEffect(() => {
    me(); // Call the 'me' function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <Navbar onLogout={logout} />
      <div className="p-4 sm:p-8">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Info</h1>
            <table className="w-full sm:w-auto table-auto">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Name</td>
                  <td className="border px-4 py-2">{user.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Email</td>
                  <td className="border px-4 py-2">{user.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">CPF</td>
                  <td className="border px-4 py-2">{user.cpf}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="hidden sm:block">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
