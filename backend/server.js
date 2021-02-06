const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);

const bodyParser = require('body-parser');
const { createApplicationRouter } = require('./api');

const database = require('./database');
const initializeWebsocketHandler = require('./websockets')

const UsersGateway = require('./gateways/UsersGateway');
const ChatsGateway = require('./gateways/ChatsGateway');
const MessagesGateway = require('./gateways/MessagesGateway');

const chatsGateway = new ChatsGateway({ database });
const usersGateway = new UsersGateway({ database });
const messagesGateway = new MessagesGateway({ database });

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// const whitelist = ['http://localhost:3000']; //white list consumers
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(createApplicationRouter({ chatsGateway }));

(async () => {
    await database.sequelize.authenticate();
    await database.sequelize.sync();

    initializeWebsocketHandler({
        io,
        usersGateway,
        chatsGateway,
        messagesGateway,
    });

    app.listen(4005, () => {
        console.log('listening on *:4005');
    });

    server.listen(4000, () => {
        console.log('listening on *:4000');
    });
})()
