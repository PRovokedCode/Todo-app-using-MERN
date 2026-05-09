import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/settings`;

export const fetchSettings = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const updateSettings = async (settings) => {
  const res = await axios.put(API, settings);
  return res.data;
};