import React, { useEffect, useState } from "react";
import { savePassword, saveUserData, userData } from "@/services/UserService";
import NavbarComponent from "@/components/NavbarComponent";
import SidebarComponent from "@/components/SidebarComponent";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import InputCpfComponent from "@/components/InputCpfComponent";
import InputPhoneComponent from "@/components/InputPhoneComponent";
import ProfileImageComponent from "@/components/ImageProfileComponent";
import ToastComponent from "@/components/ToastComponent";
import { Tabs } from "flowbite-react";
import { HiUserCircle, HiLockClosed } from "react-icons/hi";
import InputPasswordComponent from "@/components/InputPasswordComponent";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const [password, setPassword] = useState<string>("");
  const [isCpfValid, setIsCpfValid] = useState<boolean>(true);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [photoChanged, setPhotoChanged] = useState<boolean>(false);
  const [defaultPhoto, setDefaultPhoto] = useState<boolean>(false);
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [photoProfile, setPhotoProfile] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: boolean;
    message: string;
  }>({ show: false, type: false, message: "" });

  const handleCloseToast = () => {
    setShowToast({ ...showToast, show: false });
  };

  useEffect(() => {
    handleMe();
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

  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
      setPasswordConfirmError(
        password !== value ? "As senhas não coincidem." : ""
      );
    }
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
      console.log(user);
      if (photoChanged) {
        user.photo = photoBase64;
      }
      const response = await saveUserData(user.id, user);

      if (response.status !== 200) {
        setShowToast({
          show: true,
          type: false,
          message: "Falha ao atualizar dados!",
        });
      } else {
        setShowToast({
          show: true,
          type: true,
          message: "Dados salvos com sucesso!",
        });

        console.log(response.data.user[0].photo);
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePassword = async () => {
    try {
      setIsLoading(true);
      const response = await savePassword(password, passwordConfirm, user.id);
      if (response.status !== 200) {
        setShowToast({
          show: true,
          type: false,
          message: "Falha ao atualizar a senha!",
        });
      } else {
        setShowToast({
          show: true,
          type: true,
          message: "Senha alterada com sucesso!",
        });
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

  const isButtonDisabledPassword = !password || !passwordConfirm;

  return (
    <div className="flex">
      <ToastComponent
        show={showToast.show}
        type={showToast.type}
        message={showToast.message}
        onClose={handleCloseToast}
      />
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
            <div
              style={{
                paddingRight: "calc(140vh - 0px)",
                maxHeight: "calc(100vh - 160px)",
                overflowY: "auto",
              }}
            >
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
                  <Label htmlFor="login">Login</Label>
                  <TextInput
                    value={user.login}
                    name="login"
                    id="login"
                    type="text"
                    onChange={handleInputChange}
                    className="mb-4"
                  />
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
            </div>
          </Tabs.Item>

          <Tabs.Item title="Alterar senha" icon={HiLockClosed}>
            <div
              style={{ maxHeight: "calc(100vh - 260px)", overflowY: "auto" }}
            >
              <div>
                <div>
                  <div className="mb-2 block">
                    <div className="mb-4">
                      <InputPasswordComponent
                        id="password"
                        name="password"
                        label="Senha"
                        value={password}
                        handleInputChange={handlePasswordChange}
                      />
                    </div>
                    <div>
                      <InputPasswordComponent
                        id="passwordConfirm"
                        name="passwordConfirm"
                        label="Confirmação de senha"
                        value={passwordConfirm}
                        handleInputChange={handlePasswordChange}
                        error={passwordConfirmError}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "19px",
                  }}
                >
                  <Button
                    disabled={isButtonDisabledPassword}
                    color="success"
                    type="button"
                    onClick={handleSavePassword}
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
