import React, { useEffect, useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useRouter } from "next/router";
import { logoutUser } from "@/services/AuthService";
import { userData } from "@/services/UserService";
import notifyMessage from "@/utils/NotifyMessage";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { emailConfirmSend } from "@/services/EmailConfirmService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavbarComponent: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const router = useRouter();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    handleMe();
  }, []);

  const handleMe = async () => {
    try {
      const response = await userData();
      setUser({
        name: response.name,
        email: response.email,
      });
      const emailVerified = response.emailConfirmed;
      if (!emailVerified) {
        setShowVerificationAlert(true);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();

      if (response.status != 200) {
        notifyMessage(0, response.data.message);
      } else {
        router.push("/");
      }

      router.push("/");
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 5);
      } else {
        setTimeout(() => {
          setShowProgressBar(false);
        }, 10);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [progress]);

  const resendVerificationEmail = async () => {
    try {
      const response = await emailConfirmSend();
      if (response.status != 200) {
        notifyMessage(0, response.data.message);
      } else {
        notifyMessage(1, "Email de verificação reenviado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao reenviar o email de verificação:", error);
      notifyMessage(0, "Erro ao reenviar o email de verificação.");
    }
  };

  return (
    <div className="mb-6">
      <div className="fixed top-0 left-0 right-0 z-50 hover:bg-slate-900 transition duration-700">
        <Navbar fluid className="bg-slate-900 bg-opacity-20">
          <NavbarBrand href="/home">
            <img src="./img/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
          </NavbarBrand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img="./img/default.png" rounded />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem href="/profile">Meu perfil</DropdownItem>
              <DropdownItem>Configurações</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={logout}>Sair</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink
              href="/home"
              className="text-white"
              active={router.pathname === "/home"}
            >
              Home
            </NavbarLink>
            <NavbarLink
              href="/cards"
              className="text-white"
              active={router.pathname === "/cards"}
            >
              Pontos
            </NavbarLink>
            <NavbarLink
              href="/about"
              className="text-white"
              active={router.pathname === "/about"}
            >
              Sobre
            </NavbarLink>
            <NavbarLink
              href="/test"
              className="text-white"
              active={router.pathname === "/test"}
            >
              Testes
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
      <div style={{ height: "56px" }} />
      {showVerificationAlert && (
        <div className="bg-blue-200 text-blue-900 p-2 mb-4 flex items-center">
          <HiOutlineExclamationCircle className="mr-2" />
          <span>Email ainda não verificado</span>
          <button className="underline ml-2" onClick={resendVerificationEmail}>
            Reenviar email
          </button>
        </div>
      )}
      {showProgressBar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-1.5 dark:bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NavbarComponent;
