module.exports = class MessagesGateway {
    constructor({ database }) {
        this._messagesSchema = database.MessagesSchema;
        this._usersSchema = database.UsersSchema;
    }

    create({ message, chatId, userId }) {
        return this._messagesSchema.create({ text: message, chatId, userId })
    }

    findAll({
        chatId
    }) {
        return this._messagesSchema.findAll({
            where: { chatId }, include: [this._usersSchema]
        })
    }

}