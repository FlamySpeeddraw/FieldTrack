const { DataTypes } = require("sequelize");
const sequelize = require("../database"); 

module.exports = (sequelize) => {
    const {DataTypes} = require('sequelize');

    const Intervention = sequelize.define("Intervention", {
        id_intervention: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            unique: true,
            autoIncrement: true,
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
    }, 
    {
    tableName: "intervention", 
    timestamps: false,        
    }
)}

const getInterventions = async () => {
  return await Intervention.findAll(); 
};

const getInterventionById = async (id) => {
  return await Intervention.findByPk(id); 
};

const postIntervention = async (date_intervention, id_utilisateur, status, description, commentaire, photo, adresse) => {
  const newIntervention = await Intervention.create({
    date_intervention,
    id_utilisateur,
    status,
    description,
    commentaire,
    photo,
    adresse,
  });
  return newIntervention;
};

const updateIntervention = async (id, status, description, commentaire, photo) => {
  const [affectedRows] = await Intervention.update(
    { status, description, commentaire, photo },
    { where: { id_intervention: id } }
  );
  return affectedRows > 0;
};

module.exports = { getInterventions, postIntervention, updateIntervention, getInterventionById};
