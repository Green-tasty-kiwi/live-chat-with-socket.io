const chatMessageHandler = ({ io, socket, messagesGateway, chatsGateway }) => {
    return (
        async ({ message, chatId }) => {
            const recievedMessage = await messagesGateway.create({ message, chatId, userId: socket.user.id });
            io.in(chatId).emit('chat:message', { ...recievedMessage.dataValues, user: socket.user });
        }
    )
};

module.exports = chatMessageHandler;