const {Sequelize} = require("sequelize");
require('dotenv').config();
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "mysql"
})

const connect = async () => {
    try{
        await sequelize.authenticate();
        console.log("Connexion à la bdd réussie");
    }catch(error){
        console.error("Connexion à la bdd échouée : " + error);
    }
}

connect();

const db = {sequelize : sequelize};

let modelList = fs.readdirSync('./src/model');

for(let file of modelList){
    if(file.endsWith('.model.js')){
        const model = require(__dirname + "/../model/"+ file)(db.sequelize);
        db[model.name] = model;
    }
}

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
})

module.exports = db;