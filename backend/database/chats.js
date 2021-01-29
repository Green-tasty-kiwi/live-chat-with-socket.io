const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ChatsModel = sequelize.define('chats', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    ChatsModel.associate = (models) => {

    }

    return ChatsModel;
};