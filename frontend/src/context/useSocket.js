import { io } from 'socket.io-client';
import config from '../config'

const socket = io(`${config.websocketUrl}`, { transports: ['websocket'] });

export default () => {
    return socket;
}