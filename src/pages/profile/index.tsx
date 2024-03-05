import React, { useEffect, useState } from "react";
import {
  saveUserData,
  userData,
  updateUserPhoto,
} from "@/services/UserService";
import NavbarComponent from "@/components/NavbarComponent";
import SidebarComponent from "@/components/SideBarComponent";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import InputCpfComponent from "@/components/InputCpfComponent";
import InputPhoneComponent from "@/components/InputPhoneComponent";
import ProfileImageComponent from "@/components/ProfileImageComponent";
import notifyMessage from "@/utils/NotifyMessage";
import { Tabs } from "flowbite-react";
import {
  HiOfficeBuilding,
  HiUserCircle,
  HiBookmarkAlt,
  HiUser,
} from "react-icons/hi";
import InputCNPJComponent from "@/components/InputCNPJComponent";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    fantasyName: "",
    companyName: "",
    cnpj: "",
  });
  const [isCpfValid, setIsCpfValid] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [isCNPJValid, setIsCNPJValid] = useState<boolean>(true);
  const [photoChanged, setPhotoChanged] = useState<boolean>(false);
  const [defaultPhoto, setDefaultPhoto] = useState<boolean>(false);
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [photoProfile, setPhotoProfile] = useState<string>("");

  useEffect(() => {
    handleMe();
  }, []);

  const handleMe = async () => {
    try {
      const response = await userData();
      setUser({
        name: response.name,
        email: response.email,
        cpf: response.cpf,
        phone: response.phone,
        fantasyName: "",
        companyName: "",
        cnpj: "",
      });

      setPhotoProfile(response.photo);
      setDefaultPhoto(
        response.photo ===
          "https://ejornada.s3.sa-east-1.amazonaws.com/profiles/default-profile-picture.jpeg"
      );
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCpfChange = (value: string, isValid: boolean) => {
    setUser({ ...user, cpf: value });
    setIsCpfValid(isValid);
  };

  const handlePhoneChange = (value: string, isValid: boolean) => {
    setUser({ ...user, phone: value });
    setIsPhoneValid(isValid);
  };

  const handleCNPJChange = (value: string, isValid: boolean) => {
    setUser({ ...user, cnpj: value });
    setIsCNPJValid(isValid);
  };

  const handleProfileImageChange = (
    photoChanged: boolean,
    defaultPhoto: boolean,
    photoBase64: string
  ) => {
    setPhotoChanged(photoChanged);
    setDefaultPhoto(defaultPhoto);
    setPhotoBase64(photoBase64);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await saveUserData(user);
      if (photoChanged) {
        const responsePhoto = await updateUserPhoto(defaultPhoto, photoBase64);
      }

      if (response.status !== 200) {
        notifyMessage(0, "Falha ao atualizar dados!");
      } else {
        notifyMessage(1, "Dados salvos com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabledProfile =
    !user.name ||
    !user.email ||
    !user.cpf ||
    !user.phone ||
    !isCpfValid ||
    !isPhoneValid;

  const isButtonDisabledCompany = !isCNPJValid;

  return (
    <div className="flex">
      <div style={{ flex: "0 300px" }}>
        <NavbarComponent />
        <SidebarComponent />
      </div>
      <div>
        <Tabs
          aria-label="Tabs with underline"
          className="place-items-start pt-9"
        >
          <Tabs.Item title="Perfil" icon={HiUserCircle}>
            <div>
              <ProfileImageComponent
                photo={photoProfile}
                onChange={handleProfileImageChange}
              />
              <div>
                <Label htmlFor="name">Nome</Label>
                <TextInput
                  value={user.name}
                  name="name"
                  id="name"
                  type="text"
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Label htmlFor="email">Email</Label>
                <TextInput
                  value={user.email}
                  name="email"
                  id="email"
                  type="email"
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <div className="mb-4">
                  <Label htmlFor="cpf">CPF</Label>
                  <InputCpfComponent
                    value={user.cpf}
                    onChange={handleCpfChange}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="phone">Telefone</Label>
                  <InputPhoneComponent
                    value={user.phone}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    disabled={isButtonDisabledProfile}
                    color="success"
                    type="button"
                    onClick={handleSave}
                    size="md"
                  >
                    {isLoading ? <Spinner size="sm" /> : "Salvar"}
                  </Button>
                </div>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Minha empresa" icon={HiOfficeBuilding}>
            <div
              style={{
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
                paddingRight: "20px",
              }}
            >
              <div>
                <Label htmlFor="fantasyName">Nome fantasia</Label>
                <TextInput
                  icon={HiUser}
                  name="fantasyName"
                  id="fantasyName"
                  type="text"
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Label htmlFor="companyName">Razão social</Label>
                <TextInput
                  icon={HiBookmarkAlt}
                  name="companyName"
                  id="companyName"
                  type="text"
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <div className="mb-6">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <InputCNPJComponent
                    value={user.cnpj}
                    onChange={handleCNPJChange}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    disabled={isButtonDisabledCompany}
                    color="success"
                    type="button"
                    onClick={handleSave}
                    size="md"
                  >
                    {isLoading ? <Spinner size="sm" /> : "Salvar"}
                  </Button>
                </div>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
