module.exports = class ChatsGateway {
    constructor({ database }) {
        this._chatsSchema = database.ChatsSchema;
    }

    findOne(name) {
        return this._chatsSchema.findOne({
            where: { name }
        })
    }

    findAll() {
        return this._chatsSchema.findAll()
    }

    findByPk(id) {
        return this._chatsSchema.findByPk(id)
    }

    create(name) {
        return this._chatsSchema.create({ name })
    }
}