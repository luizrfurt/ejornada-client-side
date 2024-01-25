import axiosInstance from "@/utils/AxiosInstance";

//  Me
export const userData = async () => {
  try {
    const response = await axiosInstance.get("/users/me");

    return response.data.user;
  } catch (error) {
    console.error("Erro: ", error);
  }
};
