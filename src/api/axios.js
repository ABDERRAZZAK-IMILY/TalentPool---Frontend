import axios from "axios";

export const axiosClient = axios.create({
    baseURL: "http://localhost:80/api",
    headers: {
        "Content-Type": "application/json",
    },
});
