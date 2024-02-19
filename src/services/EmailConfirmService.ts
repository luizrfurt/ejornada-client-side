import axiosInstance from "@/utils/AxiosInstance";

export const emailConfirmSend = async () => {
  try {
    const response = await axiosInstance.post("/email/confirm/send");
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const emailConfirmVerifyToken = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/email/confirm/verify/${token}`);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
