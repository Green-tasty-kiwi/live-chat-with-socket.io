const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const MessagesModel = sequelize.define('messages', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    MessagesModel.associate = (models) => {
        MessagesModel.belongsTo(models.UsersSchema);
        MessagesModel.belongsTo(models.ChatsSchema);
    }

    return MessagesModel;
};