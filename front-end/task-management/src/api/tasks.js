import axios from "axios";

// Set the base URL of your backend API
const API_URL = "http://localhost:4000/api"; // change if your backend URL is different

export const fetchTasks = async (userId, isAdmin) => {
  try {
    const url = isAdmin
      ? `${API_URL}/tasks`
      : `${API_URL}/tasks?userId=${userId}`; // backend should handle filtering by userId
    const response = await axios.get(url);
    return response.data; // assuming backend returns JSON array of tasks
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data; // the created task object
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updates);
    return response.data; // the updated task object
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  } catch (error) {
    throw error.response?.data || error;
  }
};
