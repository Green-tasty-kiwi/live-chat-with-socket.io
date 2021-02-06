const userJoinHandler = ({ socket, io, chatsGateway, messagesGateway, usersGateway }) => {
    return (
        async ({ name, chatId }) => {
            const user = await usersGateway.create(name);
            socket.user = user;
            socket.emit('user:join', { name: socket.user.name, id: socket.user.id })
            socket.join(chatId);
            socket.room = chatId;

            const users = [];
            const messages = await messagesGateway.findAll({ chatId });

            io.in(chatId).sockets.sockets.forEach(function (socket) {
                users.push(socket.user);
            });

            const filteredUsers = users.filter(Boolean);
            io.in(chatId).emit('chat:join', { users: filteredUsers, messages });
        }
    )
}

module.exports = userJoinHandler;