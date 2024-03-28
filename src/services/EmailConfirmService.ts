import axiosInstance from "@/utils/AxiosInstance";

export const emailConfirmSend = async (userId: string) => {
  try {
    const response = await axiosInstance.post(`/email/confirm/send/${userId}`);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const emailConfirmVerify = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/email/confirm/verify/${token}`);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
