import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api/tasks";
  
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllTasks = async () => {
  const response = await api.get("/");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post("/", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export default api;
