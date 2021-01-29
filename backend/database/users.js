const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UsersModel = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    UsersModel.associate = (models) => {

    }

    return UsersModel;
};


