const { createServer } = require('http');
const { Server } = require('socket.io');
const database = require('./database')

database.sequelize.authenticate();
database.sequelize.sync();

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}
);

io.on("connection", (socket) => {
    console.log('SOCKET with id ' + socket.id + ' connected');

    socket.on('chat:message', ({ message, chatId }) => {
        io.sockets.in('room-' + chatId).emit('chat:message', { message, user: socket.user });
    });

    socket.on('user:join', ({ chatId, name }) => {
        socket.user = { name, id: socket.id }
        socket.join('room-' + chatId);

        const sockets = io.in('room-' + chatId).sockets.sockets;
        let users = [];
        for (const chatSocket of sockets) {

            const [, sct] = chatSocket;

            if (sct.id !== socket.id) users.push(sct.user)
        }

        users = users.filter(Boolean);
        io.in('room-' + chatId).emit('chat:join', users);

        // io.in('room-' + chatId).sockets.emit('chat:join', users);
    });

    socket.on('disconnect', function () {
        console.log('SOCKET with id ' + socket.id + ' disconnected');
    });
});


httpServer.listen(4000);