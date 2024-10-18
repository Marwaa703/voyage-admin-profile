import api from "./axiosconfig";

// Function to update a user
export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Update failed";
      console.error("Update failed with server response:", errorMessage, {
        error,
      });
      throw new Error(errorMessage);
    } else {
      console.error("Update failed with error:", error.message, { error });
      throw new Error(error.message || "Update failed");
    }
  }
};

// Function to delete a user
export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Delete failed";
      console.error("Delete failed with server response:", errorMessage, {
        error,
      });
      throw new Error(errorMessage);
    } else {
      console.error("Delete failed with error:", error.message, { error });
      throw new Error(error.message || "Delete failed");
    }
  }
};

// Function to update a company
export const updateCompany = async (id: string, companyData: any) => {
  try {
    const response = await api.put(`/companies/${id}`, companyData);
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Update failed";
      console.error("Update failed with server response:", errorMessage, {
        error,
      });
      throw new Error(errorMessage);
    } else {
      console.error("Update failed with error:", error.message, { error });
      throw new Error(error.message || "Update failed");
    }
  }
};

