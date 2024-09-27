import axios from "axios";

export const ApiClint = axios.create({
  baseURL: "https://chat-backen.vercel.app/",
  withCredentials: true,
});
