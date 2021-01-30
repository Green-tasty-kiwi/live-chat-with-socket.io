module.exports = class MessagesGateway {
    constructor({ database }) {
        this._messagesSchema = database.MessagesSchema;
    }

    create(values) {
        return this._messagesSchema.create(values)
    }

}