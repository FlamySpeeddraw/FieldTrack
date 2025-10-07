module.exports = (sequelize) => {
    const {DataTypes} = require('sequelize');

    const Intervention = sequelize.define("Intervention", {
        id_intervention: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            unique: true,
            autoIncrement: true,
            primaryKey:true
        },
        date_intervention: {
            type: DataTypes.DATE, 
            allowNull: false, 
        }, 
        id_utilisateur: {
            type: DataTypes.INTEGER, 
            allowNull: true, 
        }, 
        status: {
            type: DataTypes.STRING(50),
            allowNull: false, 
        }, 
        description: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        commentaire: {
            type: DataTypes.TEXT, 
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING(255), 
            allowNull: true
        },
        adresse: {
            type: DataTypes.STRING(255), 
            allowNull: true
        }
    })
    return Intervention;
}


