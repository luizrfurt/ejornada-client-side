import axiosInstance from "@/utils/AxiosInstance";

//  Login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    console.log(response);

    if (response.data.status != "success") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro: ", error);
    return false;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", null);

    if (response.data.status != "success") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro: ", error);
    return false;
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

    if (response.data.status != "success") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro: ", error);
    return false;
  }
};
