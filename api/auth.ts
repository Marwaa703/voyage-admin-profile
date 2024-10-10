import api from "./axiosconfig";


// Login for admin
export const login = async (
  email: string,
  password: string,
) => {
  try {
    const response = await api.post('/admin/login', {
      email,
      password,
    });
    console.log(response.data.user);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Login failed";
      console.error("Login failed with server response:", errorMessage, {
        error,
      });
      throw new Error(errorMessage);
    } else {
      console.error("Login failed with error:", error.message, { error });
      throw new Error(error.message || "Login failed");
    }
  }
};
