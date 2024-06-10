import { io } from "socket.io-client";

const URL = "http://localhost:3001"; // The URL of your backend server
const socket = io(URL);

export default socket;
