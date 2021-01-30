module.exports = class ChatsGateway {
    constructor({ database }) {
        this._chatsSchema = database.ChatsSchema;
    }

    create(values) {
        return this._chatsSchema.create(values)
    }

}