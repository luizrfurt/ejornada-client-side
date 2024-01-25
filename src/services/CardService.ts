import axiosInstance from "@/utils/AxiosInstance";

// Cards
export const cardRegister = async (
  date_time: string,
  latitude: string,
  longitude: string
) => {
  try {
    const response = await axiosInstance.post("/cards", {
      date_time,
      latitude,
      longitude,
    });

    return response.data.cards;
  } catch (error) {
    console.error("Erro :", error);
  }
};
