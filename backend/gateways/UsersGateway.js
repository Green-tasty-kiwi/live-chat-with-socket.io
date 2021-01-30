module.exports = class UsersGateway {
    constructor({ database }) {
        this._usersSchema = database.UsersSchema;
    }

    create(values) {
        return this._usersSchema.create(values)
    }

}