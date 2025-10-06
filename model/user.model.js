const connection = require('./../index');

const createUser = async (mail, password) => {
    const [results] = await connection.execute(`INSERT INTO utilisateur (mail, mdp, role_id) VALUES (?, ?, 2);`, [mail, password]);
    return results;
};

const findByCredentials = async (mail, password) => {
    const [rows] = await connection.execute('SELECT * FROM utilisateur WHERE mail = ? and mdp = ?',[mail, password]);
    return rows;
};

module.exports = { createUser, findByCredentials };