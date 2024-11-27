import axios from 'axios';
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const GetTodoListsAPI = async (payload, setTodoLists, setTotalRecords) => {
  try {
    const endpoint = 'api/v1/todo/filter';
    const res = await apiClient.post(endpoint, payload);

    if (res.status === 200) {
      setTodoLists(res?.data?.Data || []);
      setTotalRecords(res?.data?.PageSetting?.totalItems || 0);
    } else {
      console.error("Failed to fetch todo lists:", res.data?.Message || "Unknown error");
    }
  } catch (error) {
    console.error("Error in GetTodoListsAPI:", error.message);
  }
};

export const CreateTodoListsAPI = async (payload) => {
  try {
    const endpoint = 'api/v1/todo';
    const res = await apiClient.post(endpoint, payload);

    if (res.status === 200) {
      toast.success("Created successfully.");
      return res;
    } else {
      toast.error("Created fail.");
      return res;
    }
  } catch (error) {
    console.error("Error in GetTodoListsAPI:", error.message);
    return null;
  }
} 

export const DeleteTodoAPI = async (id) => {
  try {
    const endpoint = `api/v1/todo/${id}`;  // Assuming your API uses this endpoint for marking todos as deleted
    const res = await apiClient.patch(endpoint, {
      status: 'deleted'  // Assuming the API expects a status change, you can adjust this depending on your backend API
    });

    if (res.status === 200) {
      toast.success("Todo deleted successfully");
      return res;
    } else {
      toast.error("Failed to delete todo");
      return null;
    }
  } catch (error) {
    console.error("Error in DeleteTodoAPI:", error.message);
    toast.error("An error occurred while deleting the todo");
    return null;
  }
};

