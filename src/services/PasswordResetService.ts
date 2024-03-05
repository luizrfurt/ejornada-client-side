import axiosInstance from "@/utils/AxiosInstance";

export const passwordReset = async () => {
  try {
    const response = await axiosInstance.post("password/reset/send");
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const passwordResetVerifyToken = async (token: any) => {
  try {
    const response = await axiosInstance.get(`password/reset/verify/${token}`);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
