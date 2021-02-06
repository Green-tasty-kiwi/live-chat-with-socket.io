const userLeaveHandler = ({ socket, io, usersGateway }) => {
    return (
        async () => {
            if (!socket.user) return
            const user = await usersGateway.findByPk({ id: socket.user.id });

            console.log('SOCKET with id ' + socket.user.id + ' disconnected');

            const currentUser = socket.id

            const users = []
            io.in(socket.room).sockets.sockets.forEach(function (socket) {
                if (currentUser !== socket.id)
                    users.push(socket.user);
            });
            const filteredUsers = users.filter(Boolean)
            io.in(socket.room).emit('chat:update', filteredUsers);
            delete socket;
        }
    )
}

module.exports = userLeaveHandler;