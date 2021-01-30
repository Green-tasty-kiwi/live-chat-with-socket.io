const { createServer } = require('http');
const { Server } = require('socket.io');
const database = require('./database');
const ioConnectionHandler = require('./websockets')

const UsersGateway = require('./gateways/UsersGateway');
const MessagesGateway = require('./gateways/MessagesGateway');
const ChatsGateway = require('./gateways/ChatsGateway');

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

ioConnectionHandler({
    io,
    usersGateway: new UsersGateway({ database }),
    messagesGateway: new MessagesGateway({ database }),
    hatsGateway: new ChatsGateway({ database }),
});

httpServer.listen(4000);