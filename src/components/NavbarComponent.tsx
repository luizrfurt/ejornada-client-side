import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { useRouter } from "next/router";
import { logoutUser } from "@/services/AuthService";
import { userData } from "@/services/UserService";
import notifyMessage from "@/utils/NotifyMessage";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { emailConfirmSend } from "@/services/EmailConfirmService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const NavbarComponent: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleMe();
  }, []);

  const handleMe = async () => {
    try {
      const response = await userData();
      setUser(response);
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
      await logoutUser();
      router.push("/");
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

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
    <div>
      <div className="fixed top-0 left-[255px] right-0 z-50">
        <Navbar fluid className="bg-slate-900 bg-opacity-90">
          {showVerificationAlert && (
            <div className="p-1 mb-4 flex items-center justify-center text-white">
              <HiOutlineExclamationCircle className="mr-2" />
              <span>Email ainda não verificado</span>
              <div className="text-orange">
                <button
                  className="underline ml-2 text-orange"
                  onClick={resendVerificationEmail}
                >
                  Reenviar email
                </button>
              </div>
            </div>
          )}
          <div className="ml-auto flex items-center">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar img={user.photo} rounded />}
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
          </div>
        </Navbar>
        <ToastContainer />
      </div>
    </div>
  );
};

export default NavbarComponent;
