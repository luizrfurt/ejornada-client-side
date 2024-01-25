import React, { useEffect, useState } from "react";
import { userData } from "../../services/UserService";
import NavbarComponent from "../../components/NavbarComponent";

const Home: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleMe = async () => {
    try {
      // Faça a chamada Axios aqui
      const response = await userData();
      setUser({
        name: response.name,
        email: response.email
      });
    } catch (error) {
      console.error("Erro ao fazer carregamento:", error);
    }
  };

  useEffect(() => {
    handleMe(); // Call the 'me' function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <NavbarComponent />
      <div className="p-4 sm:p-8">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Info</h1>
            <table className="w-full sm:w-auto table-auto">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Nome</td>
                  <td className="border px-4 py-2">{user.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Email</td>
                  <td className="border px-4 py-2">{user.email}</td>
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
