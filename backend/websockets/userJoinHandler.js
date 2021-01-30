const userJoinHandler = ({ socket, io }) => {
    return (
        ({ name, chatId }) => {
            socket.user = { name, id: socket.id };
            socket.join('room-' + chatId);
            const sockets = io.in('room-' + chatId).sockets.sockets;
            let users = [];
            for (const chatSocket of sockets) {

                const [, sct] = chatSocket;

                if (sct.id !== socket.id) users.push(sct.user)
            }

            users = users.filter(Boolean);
            io.in('room-' + chatId).emit('chat:join', users);
        }
    )
}

module.exports = userJoinHandler;