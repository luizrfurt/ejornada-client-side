import { Sidebar } from "flowbite-react";
import { useRouter } from "next/router";
import { HiHome, HiClock, HiUserGroup, HiCog } from "react-icons/hi";

const SidebarComponent = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 bottom-0 z-50">
      <Sidebar>
        <img src="./img/logo.png" className="w-24 mx-auto" />
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiHome} href="/home">
              Home
            </Sidebar.Item>

            <Sidebar.Collapse icon={HiClock} label="Jornada">
              <Sidebar.Item href="/cards">Pontos</Sidebar.Item>
              <Sidebar.Item href="#">Fechamentos</Sidebar.Item>
              <Sidebar.Item href="#">Banco de horas</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiCog} label="Configurações">
              <Sidebar.Item href="#">Empresas</Sidebar.Item>
              <Sidebar.Item href="#">Setores</Sidebar.Item>
              <Sidebar.Item href="#">Equipes</Sidebar.Item>
              <Sidebar.Item href="#">Centros de custo</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiUserGroup} label="Funcionários">
              <Sidebar.Item href="#">Cadastro</Sidebar.Item>
              <Sidebar.Item href="#">Escala</Sidebar.Item>
              <Sidebar.Item href="#">Cargos</Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item href="/test">Teste</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
