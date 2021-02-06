const express = require('express');
const createFindOneController = require('./controllers/findOne');
const createFindAllController = require('./controllers/findAll');
const createController = require('./controllers/create');

const createChatsRouter = ({ chatsGateway }) => {
    const router = express.Router();

    router
        .post('/', createController({ chatsGateway }))
        .get('/', createFindAllController({ chatsGateway }))
        .get('/:chatId', createFindOneController({ chatsGateway }));

    return router;
}

module.exports = {
    createChatsRouter
}