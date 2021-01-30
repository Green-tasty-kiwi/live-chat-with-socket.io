const chatMessageHandler = ({ io, socket }) => {
    return (
        ({ message, chatId }) => {
            io.sockets.in('room-' + chatId).emit('chat:message', { message, user: socket.user });
        }
    )

};

module.exports = chatMessageHandler;