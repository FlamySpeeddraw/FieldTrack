module.exports = (sequelize) => {
    const {DataTypes} = require('sequelize');

    const User = sequelize.define("User",{
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }},
        {
        tableName: 'utilisateur',
    })

    User.associate = (models) => {
        User.belongsTo(models.Role, {foreignKey: "role"})
    }

    return User;
}