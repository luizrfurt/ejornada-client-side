import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import { cardData } from "@/services/CardService";
import { Spinner } from "flowbite-react";

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
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await cardData();
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
      <div className="max-w-screen-lg mx-auto overflow-hidden">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Localização
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Hora
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Foto
                </th>
                <th scope="col" className="px-6 py-3"></th>
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
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cards;
