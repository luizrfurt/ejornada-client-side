import axiosInstance from "@/utils/AxiosInstance";

//  Get all
export const cardData = async () => {
  try {
    const response = await axiosInstance.get("/cards");
    return response.data.cards;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};