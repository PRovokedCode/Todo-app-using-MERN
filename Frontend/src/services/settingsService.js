import axios from "axios";

const API = "http://localhost:5000/settings";

export const fetchSettings = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const updateSettings = async (settings) => {
  const res = await axios.put(API, settings);
  return res.data;
};