module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const User = sequelize.define("User", {
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        mdp: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            tableName: 'utilisateur',
        })

    User.associate = (models) => {
        User.hasMany(models.Intervention, { foreignKey: "id_utilisateur", as: "interventions" });
        User.belongsTo(models.Role, { foreignKey: "role_id", as: 'role' });
    }

    return User;
}