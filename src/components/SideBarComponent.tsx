import { Sidebar } from "flowbite-react";
import { useRouter } from "next/router";
import {
  HiHome,
  HiClock,
  HiOfficeBuilding,
  HiChip,
  HiUserGroup,
} from "react-icons/hi";

const SidebarComponent = () => {
  const router = useRouter();

  const sidebarItems = [
    { href: "/home", icon: HiHome, label: "Home" },
    { href: "/cards", icon: HiClock, label: "Pontos" },
    { href: "/about", icon: HiOfficeBuilding, label: "Sobre" },
    { href: "/test", icon: HiChip, label: "Teste" },
    // { href: "", icon: HiUserGroup, label: "Minha equipe" },
  ];

  return (
    <div className="fixed top-0 left-0 bottom-0 z-50">
      <Sidebar>
        <Sidebar.Logo
          href="#"
          img="./img/logo.png"
          imgAlt="logo"
        />
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {sidebarItems.map(({ href, icon: Icon, label }) => (
              <Sidebar.Item
                key={href}
                href={href}
                active={router.pathname === href}
                icon={Icon}
              >
                {label}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
