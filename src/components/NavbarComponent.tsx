import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import { useRouter } from "next/router";
import { logoutUser } from "@/services/AuthService";
import { userData } from "@/services/UserService";
import ToastComponent from "@/components/ToastComponent";
import {
  HiCog,
  HiExclamationCircle,
  HiLogout,
  HiUserCircle,
} from "react-icons/hi";
import { emailConfirmSend } from "@/services/EmailConfirmService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const NavbarComponent: React.FC = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    photo: "",
  });
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: boolean;
    message: string;
  }>({ show: false, type: false, message: "" });
  const router = useRouter();

  const handleCloseToast = () => {
    setShowToast({ ...showToast, show: false });
  };

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
      const response = await emailConfirmSend(user.id);
      if (response.status != 200) {
        setShowToast({
          show: true,
          type: false,
          message: response.data.message,
        });
      } else {
        setShowToast({
          show: true,
          type: true,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Erro ao reenviar o email de verificação:", error);
      setShowToast({
        show: true,
        type: false,
        message: "Erro ao reenviar o email de verificação:",
      });
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-[255px] right-0">
        <ToastComponent
          show={showToast.show}
          type={showToast.type}
          message={showToast.message}
          onClose={handleCloseToast}
        />
        <Navbar fluid className="bg-slate-900 bg-opacity-90">
          {showVerificationAlert && (
            <div className="p-1 mb-4 flex items-center justify-center text-white">
              <HiExclamationCircle className="mr-2" />
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
              <DropdownItem href="/profile" icon={HiUserCircle}>
                Meu perfil
              </DropdownItem>
              <DropdownItem icon={HiCog}>Configurações</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={logout} icon={HiLogout}>
                Sair
              </DropdownItem>
            </Dropdown>
          </div>
        </Navbar>
        <ToastContainer />
      </div>
    </div>
  );
};

export default NavbarComponent;
