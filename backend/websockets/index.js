const chatMessageHandler = require('./chatMessageHandler');
const userLeaveHandler = require('./userLeaveHandler');
const userJoinHandler = require('./userJoinHandler');

const ioConnectionHandler = ({ io, usersGateway, messagesGateway, chatsGateway }) => {
    io.on("connection", (socket) => {

        console.log('SOCKET with id ' + socket.id + ' connected');

        socket.on('chat:message', chatMessageHandler({ socket, io, messagesGateway, chatsGateway }));

        socket.on('user:join', userJoinHandler({ socket, io, chatsGateway, usersGateway, messagesGateway }));

        socket.on('disconnect', userLeaveHandler({ socket, io, usersGateway }));
    })
};


module.exports = ioConnectionHandler;