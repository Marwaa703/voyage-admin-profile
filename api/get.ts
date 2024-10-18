import api from "./axiosconfig";

// Fetch list of users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Fetching users failed";
      console.error("Fetching users failed with server response:", errorMessage, {
        error,
      });
      throw new Error(errorMessage);
    } else {
      console.error("Fetching users failed with error:", error.message, { error });
      throw new Error(error.message || "Fetching users failed");
    }
  }
};

// Fetch list of trips
export const getTrips = async () => {
  try {
    const response = await api.get('/trips');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Fetching trips failed";
      console.error("Fetching trips failed with server response:", errorMessage, { error });
      throw new Error(errorMessage);
    } else {
      console.error("Fetching trips failed with error:", error.message, { error });
      throw new Error(error.message || "Fetching trips failed");
    }
  }
};

// Fetch list of companies
export const getCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Fetching companies failed";
      console.error("Fetching companies failed with server response:", errorMessage, { error });
      throw new Error(errorMessage);
    } else {
      console.error("Fetching companies failed with error:", error.message, { error });
      throw new Error(error.message || "Fetching companies failed");
    }
  }
};

// Fetch list of users from a specific company
export const getCompanyUsers = async (companyId: number) => {
  try {
    const response = await api.get(`/company/users/${companyId}`); 
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Fetching company users failed";
      console.error("Fetching company users failed with server response:", errorMessage, { error });
      if (error.response.status === 404) {
        return [];
      }

      throw new Error(errorMessage);
    } else {
      console.error("Fetching company users failed with error:", error.message, { error });
      throw new Error(error.message || "Fetching company users failed");
    }
  }
};



// Fetch company papers based on companyId
export const getCompanyPapers = async (companyId: string) => {
  try {
    const response = await api.get(`/companyPaper/${companyId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Fetching company papers failed";
      console.error("Fetching company papers failed with server response:", errorMessage, { error });
      throw new Error(errorMessage);
    } else {
      console.error("Fetching company papers failed with error:", error.message, { error });
      throw new Error(error.message || "Fetching company papers failed");
    }
  }
};

// Fetch trips for a specific company
export const getTripsByCompanyId = async (companyId: string) => {
  try {
    const response = await api.get(`/trips/company/${companyId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Fetching trips for the company failed";
      console.error("Fetching trips for the company failed with server response:", errorMessage, { error });
      throw new Error(errorMessage);
    } else {
      console.error("Fetching trips for the company failed with error:", error.message, { error });
      throw new Error(error.message || "Fetching trips for the company failed");
    }
  }
};
