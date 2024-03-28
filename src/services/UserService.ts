import axiosInstance from "@/utils/AxiosInstance";

export const userData = async () => {
  try {
    const response = await axiosInstance.post("/auth/me");

    return response.data.user[0];
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};

export async function saveUserData(userId: string, userData: any) {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
}

export async function savePassword(
  password: string,
  passwordConfirm: string,
  userId: string
) {
  try {
    console.log("Dados enviados para a API:", { password, passwordConfirm });
    const response = await axiosInstance.put(`/users/${userId}/password`, {
      password,
      passwordConfirm,
    });
    console.log("Resposta da API:", response.data);
    return response;
  } catch (error: any) {
    console.error("Erro ao atualizar a senha do usuário: ", error);
    return error.response;
  }
}
