import axiosInstance from "@/utils/AxiosInstance";

export const userData = async () => {
  try {
    const response = await axiosInstance.get("/users/me");

    return response.data.user[0];
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};

export async function saveUserData(userData: any) {
  try {
    const response = await axiosInstance.put("/users/me", userData);
    return response;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
}

export async function updateUserPhoto(defaultPhoto: boolean, photo: string) {
  try {
    const response = await axiosInstance.put("/users/me/photo", {
      defaultPhoto,
      photo,
    });
    return response;
  } catch (error: any) {
    console.error("Erro ao atualizar a foto do usuário: ", error);
    return error.response;
  }
}
