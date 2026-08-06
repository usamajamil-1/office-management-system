import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://office-management-system-backend-m7u3.onrender.com";

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;