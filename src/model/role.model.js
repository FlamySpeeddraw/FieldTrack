module.exports = (sequelize) => {
    const {DataTypes} = require('sequelize');

    const Role = sequelize.define("Role",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Role;
}