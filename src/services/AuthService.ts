import axiosInstance from "@/utils/AxiosInstance";

//  Login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    if (response.data.status != "success") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro de autenticação:", error);
    throw new Error(
      "Ocorreu um erro durante o processo de login. Por favor, tente novamente."
    );
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", null);

    if (response.status != 200) {
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("Erro ao fazer logout:", error);
    alert("Logout inválido: " + error);
    return false;
  }
};
