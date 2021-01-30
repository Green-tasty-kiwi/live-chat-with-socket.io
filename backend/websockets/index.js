const chatMessageHandler = require('./chatMessageHandler');
const userJoinHandler = require('./userJoinHandler');

const ioConnectionHandler = ({ io, usersGateway, messagesGateway, chatsGateway }) => {
    return (
        io.on("connection", (socket) => {

            console.log('SOCKET with id ' + socket.id + ' connected');

            socket.on('chat:message', chatMessageHandler({ socket, io }));

            socket.on('user:join', userJoinHandler({ socket, io }));

            socket.on('disconnect', function () {
                console.log('SOCKET with id ' + socket.id + ' disconnected');
            });
        }
        ))
};


module.exports = ioConnectionHandler;