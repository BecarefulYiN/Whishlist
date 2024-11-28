import axios from 'axios';
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const LoginAPI = async (payload) => {
  try {
    const endpoint = 'api/v1/auth/login';
    const res = await apiClient.post(endpoint, payload);

    if (res.status === 200) {
      const token =res.data.token;

      sessionStorage.setItem("token", token);

    } else {
      console.error("Failed to fetch todo lists:", res.data?.Message || "Unknown error");
    }
  } catch (error) {
    console.error("Error in GetTodoListsAPI:", error.message);
  }
};