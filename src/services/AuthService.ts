import axiosInstance from "@/utils/AxiosInstance";

//  Login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", null);

    return response;
  } catch (error: any) {
    console.error("Erro: ", error);
    return error.response;
  }
};

// Register
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
      passwordConfirm,
    });

    return response;
  } catch (error: any) {
    console.error("Erro: ", error.response);
    return error.response;
  }
};
