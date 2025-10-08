module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const Role = sequelize.define("Role", {
        nom_role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'role',
        timestamps: false
    })

    Role.associate = (models) => {
        Role.hasMany(models.User, { foreignKey: 'role_id', as: 'utilisateurs' });
    }

    return Role;
}