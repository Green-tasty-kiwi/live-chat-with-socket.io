const { Sequelize } = require('sequelize');
const createUsersSchema = require('./users');
const createMessagesSchema = require('./messages');
const createChatsSchema = require('./chats');
const path = require('path')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../storage/chat.db')
});


const models = {
    UsersSchema: createUsersSchema(sequelize),
    MessagesSchema: createMessagesSchema(sequelize),
    ChatsSchema: createChatsSchema(sequelize),
}

for (const key of Object.keys(models)) {
    models[key].associate(models)
}



module.exports = { ...models, sequelize };