module.exports = (sequelize) => {
    const { DataTypes } = require('sequelize');

    const HistoriqueIntervention = sequelize.define(
        'HistoriqueIntervention',
        {
            id_historique: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            id_intervention: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            commentaire: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
    );

    HistoriqueIntervention.associate = (models) => {
        HistoriqueIntervention.belongsTo(models.Intervention, {
            foreignKey: 'id_intervention',
            as: 'intervention'
        });
    };

    return HistoriqueIntervention;
};
