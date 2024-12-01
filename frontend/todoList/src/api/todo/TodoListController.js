import axios from 'axios';
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const GetTodoListsAPI = async (payload, setTodoLists, setTotalRecords) => {
  try {
    const endpoint = 'api/v1/todo/filter';

    const headers = {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    };

    const res = await apiClient.post(endpoint, payload,{headers: headers});

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

export const GetTheTotalCountAPI = async (setTotalCount,setComplete,setIncomplete,setDeleted) => {
  try {
    const endpoint = 'api/v1/todo/total';

    const headers = {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    };

    const res = await apiClient.get(endpoint,{headers: headers});

    if (res.status === 200) {
      setTotalCount(res?.data?.TotalCount || 0)
      setComplete(res?.data?.Complete || 0)
      setIncomplete(res?.data?.Incomplete || 0)
      setDeleted(res?.data?.Deleted || 0)
    }else {
      console.error("Failed to fetch todo lists:", res.data?.Message || "Unknown error");
    }

  } catch (error) {
    console.error("Error in GetTodoListsAPI:", error.message);
  }
}

export const CreateTodoListsAPI = async (payload) => {
  try {
    const endpoint = 'api/v1/todo';
    const headers = {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    };
    const res = await apiClient.post(endpoint, payload, {headers: headers});

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
    const endpoint = `api/v1/todo/${id}`;  
    
    const headers = {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    };

    const res = await apiClient.patch(endpoint, {headers:headers});

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

export const UpdateTodoAPI = async (id,payload) => {
  try {
    const endpoint = `api/v1/todo/${id}`;  
    const res = await apiClient.put(endpoint,payload)
  } catch(error) {
    console.error("Error in UpdateTodoAPI:", error.message);
    toast.error("An error occurred while update the todo");
    return null;
  }
}

export const GetDelectedTodoItemsAPI = async (setDelectedItems) => {
  try {
    const endpoint = 'api/v1/todo/deleted-items'
    const headers = {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    };
    const res = await apiClient.get(endpoint, {headers: headers})

    if (res.status === 200) {
      setDelectedItems(res?.data?.Data || []);
    } else {
      console.error("Failed to fetch todo lists:", res.data?.Message || "Unknown error");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.Message) {
      toast.error(error.response.data.Message); 
    } else {
      console.error(error);
    }
  }
}

export const RestoreDelectedTodoItemsAPI = async (id) => {
  try {
    const endpoint = `api/v1/todo/restore-delected/${id}`;  
    await apiClient.put(endpoint)
    toast.success("Restore Successfully")
  } catch(error) {
    console.error("Error in UpdateTodoAPI:", error.message);
    toast.error("An error occurred while update the todo");
    return null;
  }
}

