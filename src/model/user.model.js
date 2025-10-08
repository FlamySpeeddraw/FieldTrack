module.exports = (sequelize) => {
    const {DataTypes} = require('sequelize');

    const User = sequelize.define("User",{
        id_utilisateur: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        mdp: {
            type: DataTypes.STRING,
            allowNull: false
        }},
        {
        tableName: 'utilisateur',
    })

    User.associate = (models) => {
        User.belongsTo(models.Role, {foreignKey: "role_id"});
        User.hasMany(models.Intervention, {
      foreignKey: "id_utilisateur",
      as: "interventions"
    });
}

    return User;
}