import io from "socket.io-client";
import { socketUrlForWebRTC } from "../../public/endpoins";

// const socket = io({ path: '/bridge' });
const socket = io.connect(socketUrlForWebRTC);
// const socket = io.connect('http://182.92.79.215:3007');

export default socket;
