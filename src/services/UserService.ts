import axiosInstance from "@/utils/AxiosInstance";

//  Me
export const userData = async () => {
  try {
    const response = await axiosInstance.get("/users/me");

    return response.data.user[0];
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};
