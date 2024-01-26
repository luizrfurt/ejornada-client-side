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
import { logoutUser } from "@/services/AuthService";
import router from "next/router";
import { userData } from "@/services/UserService";
import notifyMessage from "@/utils/NotifyMessage";

const NavbarComponent: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    handleMe();
  }, []);

  const handleMe = async () => {
    try {
      // Faça a chamada Axios aqui
      const response = await userData();
      setUser({
        name: response.data.user.name,
        email: response.data.user.email,
      });
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const logout = async () => {
    try {
      // Faça a chamada Axios aqui
      const response = await logoutUser();

      if (response.status != 200) {
        notifyMessage(0, response.data.message);
      } else {
        notifyMessage(1, response.data.message);
        router.push("/");
      }

      router.push("/");
    } catch (error) {
      console.error("Erro: ", error);
    }
  };

  return (
    <Navbar fluid rounded className="bg-slate-200">
      <NavbarBrand href="">
        <img
          src="./img/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </DropdownHeader>
          <DropdownItem>Configurações</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={logout}>Sair</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="#">Sobre</NavbarLink>
        <NavbarLink href="#">Planos</NavbarLink>
        <NavbarLink href="#">Contato</NavbarLink>
        <NavbarLink href="/test">Testes</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarComponent;
