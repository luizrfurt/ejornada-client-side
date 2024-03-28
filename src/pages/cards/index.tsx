import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import { getCards } from "@/services/CardService";
import { Spinner } from "flowbite-react";
import { userData } from "@/services/UserService";

interface CardData {
  id: string;
  user: {
    id: string;
    name: string;
  };
  event: {
    date: string;
    time: string;
    photo: string;
  };
  location: {
    address: string;
  };
}

const Cards = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    cpf: "",
    phone: "",
    login: "",
    photo: "",
    master: false,
    leader: false,
  });
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    handleMe();
    handleGetCards();
  }, []);

  const handleMe = async () => {
    try {
      const response = await userData();
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        cpf: response.cpf,
        phone: response.phone,
        master: response.master,
        photo: response.photo,
        login: response.login,
        leader: response.leader,
      });
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleGetCards = async () => {
    try {
      const response = await getCards(user.id);
      if (Array.isArray(response)) {
        setCards(response);
      } else {
        console.error("Erro: A resposta não é um array.", response);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="max-w-screen-lg mx-auto overflow-hidden flex justify-center">
        <SidebarComponent />
        <div className="mt-8 ml-auto pl-16">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 rounded-lg mt-8">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 text-center">
                      Nome
                    </th>
                    <th scope="col" className="py-3 text-center">
                      Localização
                    </th>
                    <th scope="col" className="py-3 text-center">
                      Data
                    </th>
                    <th scope="col" className="py-3 text-center">
                      Hora
                    </th>
                    <th scope="col" className="py-3 text-center">
                      Foto
                    </th>
                    <th scope="col" className="py-3 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">
                        Carregando...
                        <Spinner />
                      </td>
                    </tr>
                  ) : cards.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">
                        Nenhum registro encontrado.
                      </td>
                    </tr>
                  ) : (
                    cards.map((card, index) => (
                      <tr
                        key={card.id}
                        className={
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }
                      >
                        <td className="px-6 py-4">{card.user.name}</td>
                        <td className="px-6 py-4">{card.location.address}</td>
                        <td className="px-6 py-4">{card.event.date}</td>
                        <td className="px-6 py-4">{card.event.time}</td>
                        <td className="px-6 py-4 text-red-800">
                          <a
                            href={card.event.photo}
                            className="hover:text-red-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Fotografia
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
