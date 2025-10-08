module.exports = (sequelize) => {
    const {DataTypes} = require('sequelize');

    const Role = sequelize.define("Role",{
        id_role: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom_role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'role',
        timestamps: false
    })

    Role.associate = (models) => {
        Role.hasMany(models.Utilisateur, { foreignKey: 'role_id', as: 'utilisateurs' });
    }

    return Role;
}