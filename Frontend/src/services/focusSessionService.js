import axios from "axios";

const API =
  "http://localhost:5000/focus-sessions";

export const fetchSessions = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const createSession = async (
  duration
) => {
  const res = await axios.post(API, {
    duration,
  });

  return res.data;
};

export const deleteSession = async (id) => {
  await axios.delete(`${API}/${id}`);
};