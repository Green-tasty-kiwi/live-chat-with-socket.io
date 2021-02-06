const express = require('express');
const { createChatsRouter } = require('./chats/chats.router');

const createApplicationRouter = ({ chatsGateway }) => {
    const router = express.Router();

    router
        .use('/api/chats', createChatsRouter({ chatsGateway }));

    return router;
}

module.exports = {
    createApplicationRouter
}