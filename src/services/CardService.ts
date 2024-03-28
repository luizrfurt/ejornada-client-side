import axiosInstance from "@/utils/AxiosInstance";

export const getCards = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/cards/${userId}`);
    return response.data.cards;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};
