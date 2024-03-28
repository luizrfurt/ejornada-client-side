import axiosInstance from "@/utils/AxiosInstance";

export const loginUser = async (login: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      login,
      password,
    });

    return response;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", null);

    return response;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  login: string,
  password: string,
  passwordConfirm: string,
  master: boolean,
  leader: boolean
) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      login,
      password,
      passwordConfirm,
      master,
      leader,
    });

    return response;
  } catch (error: any) {
    console.error("Erro: ", error.response);
    return error.response;
  }
};
