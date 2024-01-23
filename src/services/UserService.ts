import axiosInstance from "@/utils/AxiosInstance";

//  Me
export const userData = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data.data;
  } catch (error) {
    console.error("Erro de carregamento:", error);
    throw new Error(
      "Ocorreu um erro ao carregar os dados de usuário. Por favor, tente novamente."
    );
  }
};
