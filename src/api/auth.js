import axios from "./axios";

export const registerUser = (data) => axios.post("/auth/register", data);
export const loginUser = (data) => axios.post("/auth/login", data);
export const logoutUser = () => axios.post("/auth/logout");
export const verifyToken = () => axios.get("/auth/verify");

