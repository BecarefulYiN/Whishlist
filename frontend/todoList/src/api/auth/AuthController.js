import axios from 'axios';
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const LoginAPI = async (payload) => {
  try {
    const endpoint = "api/v1/auth/login";
    const res = await apiClient.post(endpoint, payload);
    
    if (res.status === 200) {
      const token = res.data.token;


      sessionStorage.setItem("token", token);

      toast.success("Login Successful");

      window.location.replace("/dashboard");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.Message) {
      toast.error(error.response.data.Message);
    } else {
      toast.error("An unexpected error occurred.");
    }

    console.error("Error in LoginAPI:", error.message);
  }
};

export const RegisterAPI = async (payload) => {
  try {
    const endpoint = 'api/v1/auth/signUp';
    const res = await apiClient.post(endpoint, payload);

    if (res.status === 200) {
      window.location.replace('/login');
      console.log(res.data.Message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.Message) {
  
      console.log(error.response.data.Message);
    } else {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  }
};