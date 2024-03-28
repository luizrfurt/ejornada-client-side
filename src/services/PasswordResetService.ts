import axiosInstance from "@/utils/AxiosInstance";

export const passwordResetSend = async (email: string) => {
  try {
    const response = await axiosInstance.post("password/reset/send", {
      email,
    });
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const passwordResetVerify = async (token: any) => {
  try {
    const response = await axiosInstance.get(`password/reset/verify/${token}`);
    return response;
  } catch (error: any) {
    throw error.response;
  }
};

export const changePassword = async (
  password: string,
  passwordConfirm: string,
  token: any
) => {
  try {
    const response = await axiosInstance.put(`password/reset/change/${token}`, {
      password,
      passwordConfirm,
    });
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
