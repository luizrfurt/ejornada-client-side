import {
  saveUserData,
  userData,
  updateUserPhoto,
} from "@/services/UserService";
import NavbarComponent from "@/components/NavbarComponent";
import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import InputCpfComponent from "@/components/InputCpfComponent";
import InputPhoneComponent from "@/components/InputPhoneComponent";
import ProfileImageComponent from "@/components/ProfileImageComponent";
import notifyMessage from "@/utils/NotifyMessage";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });
  const [isCpfValid, setIsCpfValid] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

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
      });

      setPhotoProfile(response.photo);
      setDefaultPhoto(
        response.photo ===
          "https://frot4.s3.sa-east-1.amazonaws.com/profiles/default-profile-picture.jpeg"
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

  const isButtonDisabled =
    !user.name ||
    !user.email ||
    !user.cpf ||
    !user.phone ||
    !isCpfValid ||
    !isPhoneValid;

  return (
    <div>
      <NavbarComponent />
      <div className="flex justify-center mt-4">
        <Card className="p-6 max-w-md w-full">
          <div className="flex items-center justify-center">
            <ProfileImageComponent
              photo={photoProfile}
              onChange={handleProfileImageChange}
            />
          </div>
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
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <Label htmlFor="cpf">CPF</Label>
                <InputCpfComponent
                  value={user.cpf}
                  onChange={handleCpfChange}
                />
              </div>
              <div className="w-1/2 ml-2">
                <Label htmlFor="phone">Telefone</Label>
                <InputPhoneComponent
                  value={user.phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>
          <Button
            disabled={isButtonDisabled}
            color="success"
            type="button"
            onClick={handleSave}
          >
            {isLoading ? <Spinner size="sm" /> : "Salvar"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
