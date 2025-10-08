module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const Intervention = sequelize.define("Intervention", {
        date_intervention: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_utilisateur: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "utilisateur",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
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

    Intervention.associate = (models) => {
        Intervention.belongsTo(models.User, { foreignKey: "id_utilisateur" });
    }

    return Intervention;
}


