module.exports = class UsersGateway {
    constructor({ database }) {
        this._usersSchema = database.UsersSchema;
    }

    findAll() {
        return this._usersSchema.findAll()
    }

    create(name) {
        return this._usersSchema.create({ name })
    }

    findByPk({ id }) {
        return this._usersSchema.findByPk(id)
    }
}